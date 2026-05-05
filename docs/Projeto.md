# VoluntariApp — Documentação do Projeto

## 1. Contexto e Motivação

### 1.1 O Problema

A sociedade civil organizada enfrenta hoje um problema estrutural: **a falta de informação centralizada sobre causas sociais gera invisibilidade e desconfiança em projetos que dependem de voluntários**. ONGs e projetos sociais existem em grande número, mas a dificuldade em comunicar necessidades de forma ágil e confiável impede que pessoas dispostas a ajudar encontrem onde e como contribuir.

Este projeto tem como base conceitual a **ODS 17 — Parcerias para a Implementação dos Objetivos**, da Agenda 2030 da ONU, que reconhece que o alcance dos demais objetivos de desenvolvimento sustentável depende de parcerias efetivas entre setores público, privado e sociedade civil.

### 1.2 Evidências do Problema — Pesquisa com ONGs

Para validar o problema, foram realizadas entrevistas com representantes de ONGs. Os principais achados:

| Tema | Dor Identificada |
|------|-----------------|
| **Captação de voluntários** | Processo manual, levando 1 a 2 semanas por ação; encontrar pessoas dispostas a trabalhar sem remuneração é o maior desafio |
| **Divulgação** | Dependência de Instagram e boca a boca; eficaz para alcance geral, mas sem garantia para urgências |
| **Gestão do tempo** | Parcela significativa do tempo da equipe gasta com recrutamento em detrimento da missão principal |
| **Registro de necessidades** | Utilização de planilhas e documentos Word/Docs, sem ferramenta adequada |

### 1.3 Oportunidade

A identificação dessas dores aponta para uma oportunidade clara: criar uma plataforma digital que **centralize, organize e torne visíveis** as oportunidades de voluntariado, reduzindo o custo operacional das ONGs na captação e possibilitando que voluntários encontrem causas alinhadas ao seu perfil e disponibilidade.

---

## 2. Objetivo do Projeto

O **VoluntariApp** é uma plataforma web progressiva (PWA) que conecta voluntários a organizações da sociedade civil (ONGs), atuando como intermediária no processo de recrutamento voluntário.

### Objetivos específicos

- Oferecer um catálogo centralizado de vagas de voluntariado com filtros por categoria, modalidade e geolocalização
- Permitir que ONGs publiquem e gerenciem suas oportunidades de trabalho voluntário
- Facilitar o processo de candidatura por parte dos voluntários
- Enviar notificações em tempo real sobre novas vagas e atualizações via push notifications
- Funcionar offline como PWA, garantindo acesso mesmo em condições de conectividade limitada

### Perfis de usuário

| Perfil | Capacidades |
|--------|------------|
| **Voluntário** (`volunteer`) | Cadastrar perfil, buscar vagas por localização/categoria, candidatar-se, acompanhar histórico |
| **ONG** (`ong`) | Cadastrar organização, publicar vagas, visualizar candidatos inscritos, gerenciar oportunidades |

---

## 3. Arquitetura Geral do Sistema

```mermaid
graph TB
    subgraph Browser["Navegador / PWA"]
        Pages["Páginas Next.js\nhome · profile · login\nregister · vaga · form · ong"]
        AppCtx["AppContext\ncurrentUser · selectedVaga\nuserType · roles"]
        SW["Service Worker\noffline · push events"]
    end

    subgraph Middleware["Camada de Proteção"]
        EdgeMW["Edge Middleware\nmiddleware.ts\nverifica cookie JWT\nredireciona /login"]
        APIMw["API Middleware\ninfra/middleware.ts\nwithAuth · withRole"]
    end

    subgraph API["Rotas de API — /api/v1/"]
        Auth["auth/\nlogin · register\nlogout · me"]
        Trabalho["trabalho/\nCRUD · apply · quit\ntrabalho-closest"]
        OngAPI["ong/\nCRUD"]
        Notif["notifications/\nsave · send · unsubscribe"]
    end

    subgraph Logic["Camada de Negócio"]
        CtrlAuth["controllers/auth.ts"]
        CtrlTrab["controllers/trabalho.ts"]
        CtrlOng["controllers/ong.ts"]
        CtrlUsr["controllers/usuario.ts"]
    end

    subgraph Data["Camada de Dados"]
        ModelUsr["models/usuario.ts"]
        ModelOng["models/ong.ts"]
        ModelTrab["models/trabalho.ts"]
    end

    subgraph Infra["Infraestrutura"]
        DB["infra/database.ts\npg.Client por query"]
        JWT["infra/jwt.ts\njose HS256 · 7d"]
        Pwd["infra/password.ts\nbcrypt salt=10"]
        Push["infra/pushService.ts\nweb-push"]
    end

    subgraph Postgres["PostgreSQL (PostGIS)"]
        TUsers["usuarios"]
        TOngs["ongs"]
        TTrab["trabalhos"]
        TInsc["inscricoes"]
        TPush["push_subscriptions"]
    end

    Pages <-->|useContext| AppCtx
    Pages -->|HTTP| EdgeMW
    EdgeMW -->|válido| API
    API -->|HOF| APIMw
    APIMw -->|req.user| Logic
    Logic --> Data
    Logic --> Infra
    Data --> DB
    DB <--> Postgres
    Push <--> TPush
    SW <-->|push events| Push
    SW -.->|offline cache| Pages
```

### Stack tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 13 (Pages Router) + TypeScript + Ant Design |
| Backend | Next.js API Routes (serverless) |
| Banco de dados | PostgreSQL + PostGIS (geolocalização) |
| Autenticação | JWT via `jose` — armazenado em cookie HttpOnly |
| Criptografia | bcrypt (senhas) |
| PWA / Push | `next-pwa` + Web Push API (`web-push`) |
| Migrations | `node-pg-migrate` |
| Deploy | Vercel (frontend + API) + Docker (banco local) |

---

## 4. Fluxo de Autenticação

```mermaid
sequenceDiagram
    actor U as Usuário
    participant F as Frontend
    participant EMW as Edge Middleware
    participant API as /api/v1/auth
    participant C as controllers/auth.ts
    participant M as models/usuario.ts
    participant DB as PostgreSQL
    participant JWT as infra/jwt.ts

    Note over U,JWT: Registro
    U->>F: Preenche nome, email, senha, cidade, role
    F->>API: POST /register {nome, email, password, role}
    API->>C: register()
    C->>M: findByEmail(email)
    M->>DB: SELECT * FROM usuarios WHERE email=$1
    DB-->>C: null (email livre)
    C->>C: hashPassword(password) via bcrypt
    C->>M: create({...dados, password: hash})
    M->>DB: INSERT INTO usuarios
    DB-->>C: {id, nome, email, role}
    C->>JWT: generateToken({id, email, role})
    JWT-->>C: token JWT (HS256, 7d)
    C-->>F: 201 + Set-Cookie: token=... (HttpOnly)
    F->>F: setCurrentUser(user) via AppContext
    F-->>U: Redireciona /home

    Note over U,JWT: Login
    U->>F: Preenche email + senha
    F->>API: POST /login {email, password}
    API->>C: login()
    C->>M: findByEmail(email)
    M->>DB: SELECT * FROM usuarios WHERE email=$1
    DB-->>C: {id, nome, email, password, role}
    C->>C: comparePassword(input, hash) via bcrypt
    C->>JWT: generateToken({id, email, role})
    JWT-->>C: token JWT
    C-->>F: 200 + Set-Cookie: token=... (HttpOnly)
    F-->>U: Redireciona /home

    Note over U,EMW: Acesso a rota protegida
    U->>F: Navega para /home
    F->>EMW: GET /home (cookie token incluso)
    EMW->>JWT: verifyToken(token)
    alt Token inválido/expirado
        JWT-->>EMW: erro
        EMW-->>U: Redireciona /login
    else Token válido
        JWT-->>EMW: payload decodificado
        EMW-->>F: Acesso permitido
        F-->>U: Renderiza /home
    end
```

---

## 5. Fluxo da ONG — Publicar e Gerenciar Vagas

```mermaid
sequenceDiagram
    actor O as Usuário ONG
    participant F as Frontend (form/)
    participant API as /api/v1/trabalho
    participant AMW as withRole('ong')
    participant C as controllers/trabalho.ts
    participant DB as PostgreSQL
    participant PS as infra/pushService.ts

    Note over O,PS: Criar nova vaga
    O->>F: Preenche título, descrição, categoria, vagas, carga horária
    F->>API: POST /trabalho {titulo, descricao, ong_id, ...} + cookie
    API->>AMW: Verifica token + role === 'ong'
    AMW-->>API: req.user {id, role: 'ong'}
    API->>C: create()
    C->>DB: INSERT INTO trabalhos (ong_id, titulo, descricao, ...)
    DB-->>C: {id, titulo, ...}
    C->>PS: sendPushNotification("Nova vaga disponível!")
    PS->>DB: SELECT * FROM push_subscriptions
    PS-->>PS: webPush.sendNotification() para cada assinante
    C-->>F: 201 {id, ...}
    F-->>O: Vaga publicada com sucesso

    Note over O,PS: Visualizar inscrições
    O->>F: Acessa detalhes da vaga
    F->>API: GET /trabalho?id={trabalho_id}
    API->>C: findById()
    C->>DB: SELECT trabalhos + inscricoes JOIN usuarios WHERE trabalho_id=$1
    DB-->>C: [{vaga, voluntarios_inscritos[]}]
    C-->>F: 200 {vaga, inscritos}
    F-->>O: Lista de voluntários candidatos

    Note over O,PS: Remover vaga
    O->>F: Clica "Excluir vaga"
    F->>API: DELETE /trabalho?id={trabalho_id}
    API->>AMW: Verifica role === 'ong'
    API->>C: remove()
    C->>DB: DELETE FROM trabalhos WHERE id=$1
    DB-->>C: (cascade deleta inscricoes)
    C-->>F: 200 OK
    F-->>O: Vaga removida
```

---

## 6. Fluxo do Voluntário — Buscar e Candidatar-se

```mermaid
sequenceDiagram
    actor V as Voluntário
    participant F as Frontend (home/)
    participant API as /api/v1
    participant C as controllers/trabalho.ts
    participant DB as PostgreSQL (PostGIS)

    Note over V,DB: Busca por geolocalização
    V->>F: Abre /home, navegador solicita localização
    F->>F: navigator.geolocation.getCurrentPosition()
    F->>API: GET /trabalho-closest?longitude=X&latitude=Y&raio=5000&categoria=Educação
    API->>C: listByProximity()
    C->>DB: SELECT search_close_ongs(lon, lat, raio)\nJOIN trabalhos WHERE ong_id IN (...)
    DB-->>C: [{vaga, ong, distance_meters}] ordenado por proximidade
    C-->>F: 200 [{vagas próximas}]
    F-->>V: Cards de vagas exibidos por proximidade

    Note over V,DB: Candidatar-se
    V->>F: Clica no card → vaga.tsx selecionada via AppContext
    F->>F: setSelectedVaga(vaga) no AppContext
    V->>F: Clica "Candidatar-se"
    F->>API: POST /trabalho/apply {trabalho_id} + cookie
    API->>C: apply()
    C->>C: Verifica req.user.role !== 'ong'
    C->>DB: INSERT INTO inscricoes (voluntario_id, trabalho_id, 'pendente')
    alt Já inscrito (unique constraint)
        DB-->>C: Erro de constraint
        C-->>F: 409 Já está inscrito
        F-->>V: Aviso "Você já se candidatou"
    else Sucesso
        DB-->>C: {id, status: 'pendente'}
        C-->>F: 201 Inscrição realizada
        F-->>V: Confirmação de candidatura
    end

    Note over V,DB: Desistir de uma vaga
    V->>F: Acessa histórico em /profile, clica "Desistir"
    F->>API: POST /trabalho/quit {trabalho_id} + cookie
    API->>C: quit()
    C->>DB: DELETE FROM inscricoes WHERE voluntario_id=$1 AND trabalho_id=$2
    DB-->>C: OK
    C-->>F: 200 Desistência registrada
    F-->>V: Vaga removida do histórico
```

---

## 7. Modelo de Dados

```mermaid
erDiagram
    usuarios {
        VARCHAR21 id PK "nanoid()"
        VARCHAR255 nome
        VARCHAR16 initials
        VARCHAR255 email UK
        VARCHAR255 password "bcrypt hash"
        VARCHAR255 city
        VARCHAR255 state
        VARCHAR255 interestArea
        DATE memberSince
        VARCHAR255 availability
        VARCHAR255 modality
        INTEGER totalHours
        TIMESTAMP createdAt
        TIMESTAMP updatedAt
        VARCHAR64 role "volunteer | ong"
    }

    ongs {
        VARCHAR21 id PK "nanoid()"
        VARCHAR255 nome
        GEOGRAPHY geoLocation "Point SRID 4326"
        VARCHAR255 localidade
        VARCHAR255 email UK
        VARCHAR50 telefone
        TIMESTAMP criado_em
    }

    trabalhos {
        VARCHAR21 id PK "nanoid()"
        VARCHAR21 ong_id FK
        VARCHAR255 titulo
        TEXT descricao
        INTEGER n_vagas
        VARCHAR100 categoria "Educação|Saúde|Social|Meio Ambiente"
        VARCHAR100 disponibilidade
        INTEGER carga_horaria "em horas"
        TIMESTAMP criado_em
    }

    inscricoes {
        VARCHAR21 id PK "nanoid()"
        VARCHAR21 voluntario_id FK
        VARCHAR21 trabalho_id FK
        VARCHAR50 status "pendente"
        TIMESTAMP dt_inscricao
    }

    push_subscriptions {
        VARCHAR21 id PK "nanoid()"
        VARCHAR21 usuario_id FK
        TEXT endpoint UK
        VARCHAR255 p256dh
        VARCHAR255 auth
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    ongs ||--o{ trabalhos : "publica"
    usuarios ||--o{ inscricoes : "candidata-se"
    trabalhos ||--o{ inscricoes : "recebe candidaturas"
    usuarios ||--o{ push_subscriptions : "assina notificações"
```

---

## 8. Distribuição de Responsabilidades por Camada

```mermaid
graph LR
    subgraph UI["Interface (pages/)"]
        P1[home/]
        P2[profile.tsx]
        P3[vaga.tsx]
        P4[form/]
        P5[login/ · register/]
    end

    subgraph State["Estado Global (context/)"]
        AC["AppContext\ncurrentUser\nselectedVaga\nuserType"]
    end

    subgraph APILayer["API Routes (pages/api/v1/)"]
        A1[auth/]
        A2[trabalho/]
        A3[ong/]
        A4[notifications/]
    end

    subgraph Guard["Proteção (infra/middleware.ts)"]
        G1["withAuth()\nExtrai + valida JWT"]
        G2["withRole(...roles)\nVerifica permissão"]
    end

    subgraph Business["Negócio (controllers/)"]
        B1[auth.ts\nregister · login · logout]
        B2[trabalho.ts\nCRUD · apply · quit]
        B3[ong.ts\nCRUD]
        B4[usuario.ts\nme · update · list]
    end

    subgraph Models["Consultas SQL (models/)"]
        M1[usuario.ts]
        M2[ong.ts]
        M3[trabalho.ts]
    end

    subgraph DB["PostgreSQL"]
        D1[(usuarios)]
        D2[(ongs)]
        D3[(trabalhos)]
        D4[(inscricoes)]
        D5[(push_subscriptions)]
    end

    UI <-->|useContext| State
    UI -->|fetch| APILayer
    APILayer --> Guard
    Guard --> Business
    Business --> Models
    Business -->|bcrypt · JWT · push| B1
    Models -->|pg.Client| DB
```

---

## 9. Fluxo de Notificações Push (PWA)

```mermaid
sequenceDiagram
    actor U as Usuário
    participant SW as Service Worker\n(worker/index.ts)
    participant Hook as usePushNotifications
    participant API as /api/v1/notifications
    participant PS as infra/pushService.ts
    participant DB as push_subscriptions

    Note over U,DB: Ativar notificações
    U->>Hook: Clica "Ativar notificações"
    Hook->>SW: navigator.serviceWorker.ready
    SW-->>Hook: ServiceWorkerRegistration
    Hook->>SW: pushManager.subscribe({applicationServerKey})
    SW-->>Hook: PushSubscription {endpoint, p256dh, auth}
    Hook->>API: POST /save-subscription {subscription}
    API->>DB: INSERT INTO push_subscriptions (usuario_id, endpoint, p256dh, auth)
    DB-->>API: OK
    API-->>Hook: 201 Subscription salva
    Hook-->>U: Notificações ativadas

    Note over U,DB: Enviar notificação (ex: nova vaga)
    PS->>DB: SELECT * FROM push_subscriptions WHERE usuario_id=$1 (ou todos)
    DB-->>PS: [{endpoint, p256dh, auth}]
    loop Para cada assinante
        PS->>SW: webPush.sendNotification(subscription, payload)
        alt Subscription expirada (410/404)
            SW-->>PS: Erro HTTP
            PS->>DB: DELETE FROM push_subscriptions WHERE endpoint=$1
        else Sucesso
            SW-->>U: Notificação exibida no sistema
        end
    end

    Note over U,SW: Usuário interage com a notificação
    U->>SW: Clica na notificação
    SW->>SW: notificationclick event
    SW-->>U: Abre/foca a URL da vaga (clients.openWindow)
```

---

## 10. Mapa de Rotas da API

```mermaid
mindmap
  root((API /api/v1))
    auth
      POST /login
      POST /register
      POST /logout
      GET /me
      PUT /me/update
    trabalho
      GET /trabalho
        todos
        por id
        por ong_id
      POST /trabalho
        criar vaga
      PUT /trabalho
        editar vaga
      DELETE /trabalho
        remover vaga
      POST /apply
        candidatar voluntário
      POST /quit
        desistir de vaga
      GET /trabalho-closest
        busca por geolocalização
    ong
      GET /ong
        listar ONGs
      POST /ong
        criar ONG
      PUT /ong
        editar ONG
      DELETE /ong
        remover ONG
    usuario
      GET /usuario
        listar usuários
    notifications
      POST /save-subscription
        salvar push subscription
      POST /send-notification
        enviar push
      POST /unsubscribe
        remover subscription
    infra
      GET /status
        health check
      GET /migrations
        status das migrations
```

---

## 11. Decisões Técnicas Relevantes

| Decisão | Escolha | Justificativa |
|---------|---------|--------------|
| ORM | Nenhum — SQL direto via `pg` | Controle total sobre queries, sem overhead de abstração |
| Conexão DB | Novo `pg.Client` por query | Simplicidade em ambiente serverless/Vercel |
| Auth storage | Cookie HttpOnly | Proteção contra XSS; não acessível via JavaScript |
| IDs | `nanoid()` (21 chars) | Mais curto que UUID, colision-safe, URL-safe |
| Geolocalização | PostGIS + função SQL `search_close_ongs` | Queries de proximidade nativas no banco, sem lib externa |
| Offline | PWA Service Worker | Funcionalidade básica sem conexão, cache de assets |
| Roles | Apenas `volunteer` e `ong` no JWT | Simples e suficiente para o escopo atual |
