# Plano de Negócios Detalhado — VoluntariApp

> Versão: 1.0 | Data: Maio 2026 | Baseado no Business Model Canvas do VoluntariApp

---

## Sumário Executivo

O **VoluntariApp** é uma plataforma digital multi-sided que conecta três grupos interdependentes: voluntários individuais, ONGs e empresas privadas com agenda ESG. Ao atuar como intermediária, a plataforma resolve um problema estrutural: **a fragmentação do ecossistema de impacto social no Brasil**, onde voluntários não encontram oportunidades, ONGs perdem semanas captando pessoas e empresas não têm canal confiável para direcionar verba.

O modelo de receita é sustentado pela **comissão sobre editais** (transação financeira empresa → ONG), complementado por um **plano premium para ONGs**. Voluntários têm acesso gratuito, garantindo volume de usuários e efeito de rede.

A plataforma está ancorada na **ODS 17 — Parcerias para a Implementação dos Objetivos** (Agenda 2030 da ONU), o que confere credibilidade institucional e diferencial de posicionamento frente a iniciativas similares.

---

## Fluxo Geral da Plataforma

```mermaid
graph TD
    V[👤 Voluntário] -->|Cadastro + Perfil| P(VoluntariApp)
    O[🏢 ONG] -->|Publica vagas / Submete propostas| P
    E[🏦 Empresa ESG] -->|Publica editais com verba| P

    P -->|Matching geolocalizado| V
    P -->|Candidatos qualificados| O
    P -->|Propostas de ONGs selecionadas| E

    E -->|Aprovação + Repasse| P
    P -->|Comissão 5-8%| RECEITA1[💰 Receita Principal]
    O -->|Plano Premium| RECEITA2[💰 Receita Secundária]

    P -->|Push Notifications| V
    P -->|Dashboard de gestão| O
    P -->|Rastreabilidade de impacto| E
```

---

## 1. Segmentos de Clientes

> *Quem você ajuda?*

O VoluntariApp opera em um modelo de **plataforma multi-sided** (mercado multilateral), onde o valor gerado para cada segmento depende da massa crítica dos demais. O crescimento de um segmento impulsiona os outros em efeito cascata.

---

### 1.1 Voluntários Individuais

**Perfil demográfico**

| Característica | Dado |
|---|---|
| Faixa etária principal | 18–35 anos (geração Z e Millennials) |
| Escolaridade | Ensino superior completo ou em curso |
| Renda | Classe B/C |
| Localização | Grandes centros urbanos (inicial); expansão para médias cidades |
| Dispositivo | Mobile-first (smartphones Android e iOS) |

**Persona primária — "A Estudante Engajada"**
> **Mariana, 22 anos, estudante de Pedagogia em São Paulo.** Quer fazer diferença, já fez 2 ações voluntárias, mas encontrou as oportunidades apenas por Instagram de amigos. Não sabe quais ONGs atuam perto de casa. Tem disponibilidade nos fins de semana e prefere causas de Educação e Infância. Usa o celular para tudo.

**Persona secundária — "O Profissional com Propósito"**
> **Rafael, 31 anos, analista de TI em Belo Horizonte.** Quer colocar suas habilidades técnicas a serviço de uma causa. Já tentou contatar ONGs diretamente, mas não teve retorno. Valoriza experiências organizadas, com impacto mensurável e que possam compor seu portfólio LinkedIn.

**Dores identificadas**
- Falta de centralização: oportunidades espalhadas em grupos, redes sociais e sites desatualizados
- Incompatibilidade de localização e horário: vagas distantes ou em horários inacessíveis
- Falta de feedback: candidaturas sem retorno, processo pouco transparente
- Baixa confiança: dificuldade em verificar a seriedade das organizações

**Ganhos esperados**
- Encontrar vagas próximas em menos de 5 minutos
- Receber alertas automáticos de novas oportunidades compatíveis
- Ter histórico pessoal consolidado de horas e causas apoiadas

---

### 1.2 ONGs (Organizações Não Governamentais)

**Perfil organizacional**

| Característica | Dado |
|---|---|
| Porte | Pequeno e médio (2–50 colaboradores) |
| Receita anual | R$ 50 mil – R$ 5 milhões |
| Área de atuação | Educação, Saúde, Social, Meio Ambiente, Cultura |
| Estrutura digital | Limitada — WhatsApp, Instagram e planilhas |
| Principal desafio | Captação de voluntários e financiamento |

**Persona primária — "A Coordenadora Sobrecarregada"**
> **Cláudia, 38 anos, coordenadora de projetos na ONG "Mãos que Transformam" em Campinas.** Gerencia 12 voluntários fixos e precisa recrutar 20 novos por ação. O processo atual envolve posts no Instagram, formulários do Google e triagem manual por WhatsApp. Cada processo consome 2 semanas de trabalho. Tem interesse em editais corporativos mas não sabe como acessar empresas.

**Dores identificadas**
- Processo manual e demorado de captação (1–2 semanas por ação)
- Alta rotatividade de voluntários sem processo de engajamento contínuo
- Falta de acesso a financiamento corporativo estruturado
- Ausência de dados sobre perfil dos voluntários para planejamento
- Dependência de redes de contato pessoal para divulgação

**Ganhos esperados**
- Reduzir captação de semanas para horas
- Ter visibilidade sobre candidatos e suas competências
- Acessar editais de empresas diretamente na plataforma
- Relatórios automáticos de candidaturas para prestação de contas

---

### 1.3 Empresas Privadas (Segmento ESG)

**Perfil organizacional**

| Característica | Dado |
|---|---|
| Porte | Médio e grande porte |
| Receita anual | R$ 10 milhões+ |
| Setor | Diversificado (financeiro, tecnologia, varejo, indústria) |
| Driver | ESG, compliance, relatórios GRI, Pacto Global ONU |
| Decision maker | Gerência/Diretoria de Sustentabilidade, Comunicação ou RH |

**Persona primária — "O Gestor de Sustentabilidade"**
> **Fernando, 44 anos, Gerente de Sustentabilidade em uma fintech de São Paulo com 800 funcionários.** Precisa comprovar investimento social para relatório ESG anual. Já doou para ONGs ad hoc, mas sem processo formal ou rastreabilidade. Quer canal que selecione ONGs idôneas, formalize o repasse e gere evidências de impacto para o board.

**Dores identificadas**
- Dificuldade em identificar ONGs confiáveis e com projetos alinhados ao setor da empresa
- Ausência de processo formal para seleção e avaliação de propostas
- Falta de rastreabilidade sobre uso dos recursos e impacto gerado
- Risco reputacional de associar a marca a organizações não verificadas
- Pressão crescente de reguladores, investidores e consumidores por práticas ESG documentadas

**Ganhos esperados**
- Canal auditável para publicar editais com critérios claros
- Processo estruturado de recebimento e avaliação de propostas
- Dashboard de impacto para relatórios ESG
- Visibilidade de marca associada a causas sociais relevantes

---

### 1.4 Mapa de Interdependência dos Segmentos

```mermaid
graph LR
    V[Voluntários]
    O[ONGs]
    E[Empresas]

    V -- "Geram comunidade ativa" --> O
    O -- "Geram vagas e conteúdo" --> V
    O -- "Submetem propostas" --> E
    E -- "Financiam projetos das ONGs" --> O
    E -- "Atraem ONGs ao ecossistema" --> V
    V -- "Provam impacto social" --> E
```

> O modelo só funciona com massa crítica nos três lados. A estratégia de entrada prioriza voluntários e ONGs para validar o efeito de rede antes de abordar empresas.

---

## 2. Propostas de Valor

> *Como você contribui?*

### 2.1 Para Voluntários

| Proposta | Benefício Concreto | Diferencial |
|---|---|---|
| Catálogo geolocalizado | Vagas dentro do raio que o voluntário define | Outros canais não filtram por proximidade real |
| Filtro por categoria e modalidade | Encontrar causas alinhadas a valores pessoais | Busca semântica além de listas genéricas |
| Push notifications | Alertas automáticos de novas vagas | Voluntário não precisa buscar ativamente |
| Histórico consolidado | Horas voluntárias e organizações apoiadas em um perfil | Serve como portfólio e certificação informal |
| PWA offline | Funciona como app, sem instalação na loja | Acessível em qualquer dispositivo e conexão |

### 2.2 Para ONGs

| Proposta | Benefício Concreto | Diferencial |
|---|---|---|
| Captação acelerada | De semanas para horas | Elimina dependência de redes sociais pessoais |
| Voluntários qualificados | Filtragem por interesse, localização e disponibilidade | Fila de candidatos pré-filtrados |
| Acesso a editais | Canal direto para financiamento corporativo | Antes acessível apenas por relacionamento |
| Painel centralizado | Gestão de vagas e candidatos em um lugar | Substitui planilha + WhatsApp + e-mail |
| Relatórios (Premium) | Dados para prestação de contas e planejamento | Exigido por financiadores e redes de ONGs |

### 2.3 Para Empresas

| Proposta | Benefício Concreto | Diferencial |
|---|---|---|
| Edital estruturado | Processo formal com critérios, prazo e submissão organizada | Substitui o caos de receber propostas por e-mail |
| ONGs verificadas | Base de organizações com perfil e histórico validado | Reduz risco reputacional |
| Rastreabilidade | Dashboard de impacto para relatórios ESG e GRI | Evidência auditável de investimento social |
| Visibilidade de marca | Nome da empresa associado a causas aprovadas | Comunicação ESG orgânica |

---

## 3. Canais

> *Como te encontram?*

### 3.1 Funil de Aquisição por Segmento

```mermaid
flowchart TD
    subgraph Voluntários
        V1[Redes Sociais Instagram/TikTok] --> V2[SEO - buscas por voluntariado]
        V2 --> V3[Indicação de outros voluntários]
        V3 --> V4[Cadastro na Plataforma]
    end

    subgraph ONGs
        O1[Prospecção direta outbound] --> O2[Parcerias com redes de ONGs]
        O2 --> O3[Indicação de voluntários satisfeitos]
        O3 --> O4[Onboarding ONG]
    end

    subgraph Empresas
        E1[LinkedIn - conteúdo ESG] --> E2[Indicação de ONGs parceiras]
        E2 --> E3[Eventos de sustentabilidade]
        E3 --> E4[Contato comercial direto]
        E4 --> E5[Contrato de edital]
    end
```

### 3.2 Canais Detalhados

**Redes sociais (Instagram, LinkedIn, TikTok)**
- Instagram: histórias de voluntários, impacto de ONGs, calls-to-action para cadastro
- LinkedIn: conteúdo ESG para alcançar gestores de sustentabilidade e profissionais que buscam voluntariado
- TikTok: vídeos curtos mostrando ações voluntárias (alto potencial viral com custo zero)
- Frequência mínima: 3 posts/semana por canal

**SEO orgânico**
- Páginas de vagas indexadas: `/vagas/sao-paulo/educacao`, `/vagas/belo-horizonte/saude`
- Blog com conteúdo sobre voluntariado, ESG, ODS e terceiro setor
- Escala automaticamente com o crescimento do volume de vagas

**Parcerias institucionais**
- ABONG (Associação Brasileira de ONGs): acesso a rede nacional
- Prefeituras: voluntariado cívico e cidadania
- Universidades: programas de extensão e horas complementares via voluntariado

**Indicação e viralização**
- Programa de convite: voluntário indica ONG/amigo e ambos recebem benefício
- Depoimentos de ONGs e voluntários para prova social nas redes

**Eventos e feiras**
- Eventos de sustentabilidade corporativa (feitos por associações como CEBDS, Instituto Ethos)
- Feiras de voluntariado e terceiro setor

---

## 4. Relacionamento com Clientes

> *Como você interage?*

### 4.1 Jornada do Voluntário

```mermaid
journey
    title Jornada do Voluntário no VoluntariApp
    section Descoberta
      Busca no Google por voluntariado: 3: Voluntário
      Vê post no Instagram: 4: Voluntário
      Recebe indicação de amigo: 5: Voluntário
    section Ativação
      Cadastro na plataforma: 4: Voluntário
      Configura perfil e interesses: 3: Voluntário
      Ativa notificações push: 4: Voluntário
    section Engajamento
      Recebe alerta de nova vaga: 5: Voluntário
      Filtra vagas por localização: 5: Voluntário
      Candidata-se a uma vaga: 4: Voluntário
    section Retenção
      Participa da ação voluntária: 5: Voluntário
      Histórico atualizado no perfil: 4: Voluntário
      Indica amigo para a plataforma: 5: Voluntário
```

### 4.2 Jornada da ONG

```mermaid
journey
    title Jornada da ONG no VoluntariApp
    section Onboarding
      Cadastro e perfil da organização: 3: ONG
      Validação dos dados institucionais: 3: ONG, Plataforma
      Publicação da primeira vaga: 4: ONG
    section Operação
      Recebe candidaturas de voluntários: 5: ONG
      Gerencia inscrições no painel: 4: ONG
      Seleciona e contata candidatos: 4: ONG
    section Crescimento
      Assina plano Premium: 4: ONG
      Submete proposta a edital: 5: ONG
      Recebe financiamento aprovado: 5: ONG
    section Fidelização
      Renova assinatura Premium: 4: ONG
      Indica outras ONGs: 5: ONG
```

### 4.3 Jornada da Empresa

```mermaid
journey
    title Jornada da Empresa no VoluntariApp
    section Prospecção
      Identifica o VoluntariApp como canal ESG: 3: Empresa
      Reunião comercial com time da plataforma: 4: Empresa, Plataforma
      Assina contrato de intermediação: 4: Empresa
    section Publicação
      Cadastra conta empresarial: 3: Empresa
      Publica edital com verba e critérios: 4: Empresa
      Recebe propostas de ONGs: 5: Empresa
    section Seleção
      Avalia propostas no painel: 4: Empresa
      Aprova proposta da ONG selecionada: 5: Empresa
      Plataforma retém comissão e repassa: 4: Empresa, Plataforma
    section Rastreabilidade
      Acompanha execução do projeto: 4: Empresa
      Exporta relatório de impacto ESG: 5: Empresa
      Publica novo edital: 5: Empresa
```

### 4.4 Modelos de Relacionamento

| Segmento | Modelo | Detalhe |
|---|---|---|
| Voluntário | Self-service + Push | Cadastro autônomo; plataforma mantém engajamento via notificações |
| ONG (Free) | Self-service + Suporte básico | Operação autônoma; suporte por chat/e-mail para dúvidas |
| ONG (Premium) | Self-service + Suporte prioritário | Acesso a canais dedicados e onboarding assistido |
| Empresa | Relação comercial | Contato direto com time da plataforma; SLA de atendimento |

---

## 5. Fontes de Receita e Planejamento Financeiro

> *O que você recebe?*

### 5.1 Modelo de Receita

```mermaid
graph TD
    R[Receita VoluntariApp]
    R --> R1[Comissão sobre Editais\n5-8% do valor intermediado]
    R --> R2[Plano Premium ONG\nR$ 149/mês por organização]
    R --> R3[Voluntário\nGratuito - efeito de rede]

    R1 -->|Empresa aprova ONG| T[Transação financeira\nempresa → ONG]
    T --> C[Plataforma retém comissão]
    T --> O[ONG recebe valor líquido]

    R2 -->|Assinatura recorrente| F[Funcionalidades avançadas\nliberadas para a ONG]
```

### 5.2 Estrutura de Preços

**Voluntários — Gratuito**
- Todas as funcionalidades essenciais sem custo
- Justificativa: volume de usuários é o ativo que atrai ONGs e empresas

**ONGs — Freemium**

| Plano | Preço | Funcionalidades |
|---|---|---|
| **Free** | R$ 0 | Publicar vagas, receber candidaturas, painel básico |
| **Premium** | R$ 149/mês | + Destaque de vagas, relatórios avançados, múltiplos gestores, acesso antecipado a editais |

**Empresas — Modelo de comissão**

| Faixa do Edital | Comissão |
|---|---|
| Até R$ 50.000 | 8% |
| R$ 50.001 – R$ 200.000 | 6% |
| Acima de R$ 200.000 | 5% (negociável) |

> A estrutura regressiva de comissão incentiva editais de maior valor, que são mais interessantes para todas as partes.

---

### 5.3 Projeções Financeiras

#### Premissas

| Premissa | Valor |
|---|---|
| Valor médio de edital | R$ 120.000 |
| Comissão média aplicada | 6,5% |
| Receita média por edital | R$ 7.800 |
| Preço do plano Premium ONG | R$ 149/mês |
| Churn mensal Premium | 5% |
| Custo de aquisição de ONG (CAC) | R$ 200 |
| Custo de aquisição de empresa (CAC) | R$ 2.500 |

#### Projeção de Usuários (Meses 1–24)

```mermaid
xychart-beta
    title "Crescimento de usuários cadastrados"
    x-axis [M3, M6, M9, M12, M18, M24]
    y-axis "Usuários" 0 --> 5000
    bar [150, 500, 1200, 2500, 3800, 5000]
    line [20, 60, 140, 280, 420, 600]
```

> Barras = Voluntários | Linha = ONGs cadastradas

#### Projeção de Receita — Cenário Base

| Período | Editais/período | Receita Editais | ONGs Premium (média) | Receita Premium | **Total** |
|---|---|---|---|---|---|
| Ano 1 — Q1-Q2 | 1 | R$ 7.800 | 5 | R$ 4.470 | R$ 12.270 |
| Ano 1 — Q3-Q4 | 3 | R$ 23.400 | 12 | R$ 10.728 | R$ 34.128 |
| **Ano 1 Total** | **4** | **R$ 31.200** | **—** | **R$ 15.198** | **R$ 46.398** |
| Ano 2 — Q1-Q2 | 6 | R$ 46.800 | 25 | R$ 22.350 | R$ 69.150 |
| Ano 2 — Q3-Q4 | 10 | R$ 78.000 | 45 | R$ 40.230 | R$ 118.230 |
| **Ano 2 Total** | **16** | **R$ 124.800** | **—** | **R$ 62.580** | **R$ 187.380** |
| **Ano 3 Total** | **40** | **R$ 312.000** | **120 ONGs** | **R$ 214.560** | **R$ 526.560** |

#### Projeção de Custos

| Item | Ano 1 | Ano 2 | Ano 3 |
|---|---|---|---|
| Hosting / Vercel | R$ 3.600 | R$ 7.200 | R$ 14.400 |
| PostgreSQL + PostGIS (gerenciado) | R$ 2.400 | R$ 6.000 | R$ 12.000 |
| Push Notifications | R$ 600 | R$ 1.800 | R$ 4.800 |
| Desenvolvimento (horas/equipe) | R$ 72.000 | R$ 108.000 | R$ 144.000 |
| Marketing digital | R$ 12.000 | R$ 30.000 | R$ 60.000 |
| Jurídico / contratos / LGPD | R$ 8.000 | R$ 10.000 | R$ 12.000 |
| Operacional (ferramentas, misc) | R$ 3.600 | R$ 6.000 | R$ 9.600 |
| **Total Custos** | **R$ 102.200** | **R$ 169.000** | **R$ 256.800** |

#### Resultado Projetado

| Período | Receita | Custos | **Resultado** | **Margem** |
|---|---|---|---|---|
| Ano 1 | R$ 46.398 | R$ 102.200 | **-R$ 55.802** | -120% |
| Ano 2 | R$ 187.380 | R$ 169.000 | **+R$ 18.380** | +10,8% |
| Ano 3 | R$ 526.560 | R$ 256.800 | **+R$ 269.760** | +51,2% |

> **Break-even estimado: mês 20–22** (Q2 do Ano 2), considerando o cenário base.

#### Fluxo de Caixa Simplificado — Ano 1

```mermaid
xychart-beta
    title "Fluxo de Caixa Mensal - Ano 1"
    x-axis [Jan, Fev, Mar, Abr, Mai, Jun, Jul, Ago, Set, Out, Nov, Dez]
    y-axis 0 --> 14000
    bar [0, 0, 300, 700, 1300, 2000, 4300, 6400, 9300, 10700, 12300, 13600]
```

> Valores deslocados em +R$ 8.500 para visualização (base real: -R$ 8.500 em Janeiro). Caixa positivo real a partir de Setembro.

---

### 5.4 Indicadores-Chave de Desempenho (KPIs)

| KPI | Meta Ano 1 | Meta Ano 2 | Meta Ano 3 |
|---|---|---|---|
| Voluntários cadastrados | 2.500 | 8.000 | 20.000 |
| ONGs ativas | 120 | 400 | 1.000 |
| ONGs Premium | 15 | 60 | 150 |
| Editais intermediados | 4 | 16 | 40 |
| Volume intermediado (R$) | R$ 480.000 | R$ 1,92M | R$ 4,8M |
| Taxa de conversão voluntário→candidatura | 15% | 22% | 30% |
| NPS médio da plataforma | >40 | >55 | >65 |
| CAC Voluntário | R$ 15 | R$ 10 | R$ 7 |
| CAC ONG | R$ 200 | R$ 150 | R$ 100 |
| LTV ONG Premium (24 meses) | R$ 2.682 | R$ 3.576 | R$ 4.470 |

---

## 6. Recursos Principais

> *Quem é você? O que você tem?*

### 6.1 Recursos Tecnológicos

```mermaid
graph TB
    subgraph Frontend
        F1[Next.js 13 + TypeScript]
        F2[Ant Design - UI Components]
        F3[PWA - Service Worker offline]
        F4[Push Notifications - Web Push API + VAPID]
    end

    subgraph backendApi["Backend / API"]
        B1[Next.js API Routes /api/v1/]
        B2[JWT - jose - 7 dias - HttpOnly cookie]
        B3[Bcrypt - hashing de senhas]
        B4[Middleware withAuth / withRole]
    end

    subgraph bancoDados["Banco de Dados"]
        D1[PostgreSQL + PostGIS]
        D2[node-pg-migrate - migrations]
        D3[search_close_ongs - busca geoespacial]
    end

    subgraph Infraestrutura
        I1[Vercel - serverless deploy]
        I2[Docker - desenvolvimento local]
    end

    F1 --> B1
    B1 --> D1
    B1 --> I1
    D1 --> D3
```

### 6.2 Recursos Humanos

**Equipe mínima atual (fase MVP)**

| Papel | Responsabilidade |
|---|---|
| Full-stack developer | Desenvolvimento, manutenção, novas features, migrations |
| Fundador / Gestor | Estratégia, comercial com empresas, parcerias com ONGs |

**Equipe necessária para escala (Ano 2)**

| Papel | Responsabilidade |
|---|---|
| 2× Full-stack developers | Velocidade de desenvolvimento e cobertura |
| Product Manager | Roadmap, priorização, métricas |
| Growth / Marketing | Aquisição de usuários, conteúdo, SEO |
| Customer Success | Onboarding de ONGs e empresas, suporte premium |
| Jurídico (PJ) | Contratos de intermediação, LGPD, termos de uso |

### 6.3 Recursos Intangíveis

| Ativo | Descrição | Valor estratégico |
|---|---|---|
| Dados de geolocalização | Perfis georeferenciados de ONGs e voluntários | Melhora matching continuamente — difícil de replicar |
| Base de vagas e candidaturas | Prova de tração para atrair empresas | Reduz o risco percebido de novos editais |
| Posicionamento ODS 17 | Ancoragem em agenda global da ONU | Diferencial de credibilidade institucional |
| Reputação com ONGs early adopters | Prova social para captação de novas organizações | Reduz CAC e acelera crescimento B2B |

---

## 7. Atividades-Chave

> *O que você faz?*

### 7.1 Fluxo de Matching Voluntário–Vaga

```mermaid
sequenceDiagram
    participant V as Voluntário
    participant P as Plataforma
    participant DB as PostgreSQL + PostGIS
    participant O as ONG

    O->>P: Publica nova vaga (localização, categoria, modalidade)
    P->>DB: Armazena vaga com coordenadas geográficas
    P->>DB: search_close_ongs(raio, lat, lng, categoria)
    DB-->>P: Lista de voluntários compatíveis
    P->>V: Push notification — "Nova vaga perto de você!"
    V->>P: Acessa vaga e se candidata
    P->>O: Notifica ONG sobre nova candidatura
    O->>P: Visualiza candidatos no painel
    O->>V: Confirma participação
```

### 7.2 Fluxo de Edital Empresa → ONG

```mermaid
sequenceDiagram
    participant E as Empresa
    participant P as Plataforma
    participant O as ONG
    participant F as Financeiro

    E->>P: Publica edital (verba, critérios, prazo)
    P->>O: Notifica ONGs qualificadas
    O->>P: Submete proposta de projeto
    P->>E: Consolida propostas no painel
    E->>P: Avalia e aprova proposta da ONG
    P->>F: Registra aprovação e emite instrução de pagamento
    E->>F: Transfere valor total do edital
    F->>P: Plataforma retém comissão (5-8%)
    F->>O: Repassa valor líquido para a ONG
    P->>E: Disponibiliza dashboard de acompanhamento
    O->>P: Registra execução e resultados
    P->>E: Relatório de impacto ESG exportável
```

### 7.3 Ciclo de Desenvolvimento do Produto

```mermaid
graph LR
    A[Discovery\nPesquisa com usuários] --> B[Priorização\nProduct Backlog]
    B --> C[Sprint\n2 semanas]
    C --> D[Deploy\nVercel automático]
    D --> E[Monitoramento\nMétricas + Erros]
    E --> F[Feedback\nNPS + Suporte]
    F --> A
```

---

## 8. Parcerias Principais

> *Quem o ajuda?*

### 8.1 Mapa de Parcerias

```mermaid
graph TD
    P[VoluntariApp]

    P <-->|Volume de ONGs, validação| R[Redes de ONGs\nABONG, regionais]
    P <-->|Editais, receita| E[Empresas ESG\nFintech, Varejo, Indústria]
    P <-->|Voluntários universitários,\nhoras complementares| U[Universidades\nExtensão universitária]
    P <-->|Legitimidade, divulgação| G[Governos Municipais\nSecretarias de Cidadania]
    P <-->|Infraestrutura| I[Vercel / Supabase\nHosting + DB]
    P <-->|ONGs pioneiras,\nprova social| EA[ONGs Early Adopters\n10-20 iniciais]
```

### 8.2 Critérios de Seleção e Estratégia por Tipo de Parceiro

**ONGs Early Adopters (prioridade máxima — fase atual)**
- Critério: ONGs com processo ativo de captação de voluntários, abertas a feedback
- Abordagem: prospecção direta, onboarding gratuito permanente, co-criação de features
- Meta: 10 ONGs ativas nos primeiros 3 meses

**Empresas privadas (prioridade alta — meses 4–9)**
- Critério: empresas com orçamento ESG definido, estrutura de sustentabilidade ou RSC
- Abordagem: LinkedIn outbound + indicação de ONGs parceiras + eventos do setor
- Meta: 1 empresa com edital publicado até o mês 6

**Redes de ONGs (prioridade média — meses 6–12)**
- Critério: redes com 20+ organizações membros, interesse em digitalização
- Abordagem: proposta de parceria com benefícios para membros (plano premium com desconto)
- Meta: 1 parceria de rede assinada até o mês 12

**Universidades (prioridade secundária — ano 2)**
- Critério: cursos com programa de extensão ou horas complementares
- Abordagem: proposta de integração — voluntariado validado como horas complementares via VoluntariApp
- Benefício: fluxo constante de voluntários jovens e engajados

---

## 9. Estrutura de Custos

> *O que você oferece e o que custa?*

### 9.1 Detalhamento de Custos por Categoria

**Infraestrutura tecnológica**

| Item | Plano atual | Escala (Ano 2) | Escala (Ano 3) |
|---|---|---|---|
| Vercel (hosting + functions) | ~R$ 50/mês | ~R$ 300/mês | ~R$ 600/mês |
| PostgreSQL + PostGIS (gerenciado) | ~R$ 150/mês | ~R$ 350/mês | ~R$ 700/mês |
| Web Push (Notifications) | ~R$ 50/mês | ~R$ 150/mês | ~R$ 400/mês |
| Domínio + SSL | ~R$ 50/ano | ~R$ 50/ano | ~R$ 50/ano |
| Monitoramento (Sentry/Datadog) | R$ 0 (free) | ~R$ 100/mês | ~R$ 200/mês |

**Desenvolvimento**

| Item | Descrição |
|---|---|
| Custo dominante | Horas de engenharia — funcionalidades novas, manutenção, segurança, migrations |
| Fase MVP | 1 dev full-stack dedicado |
| Fase de crescimento | 2-3 devs + PM |
| Prioridades atuais | Módulo completo de empresa/editais, testes automatizados, performance de busca geoespacial |

**Marketing e Crescimento**

| Canal | Custo estimado | ROI esperado |
|---|---|---|
| Produção de conteúdo (redes sociais) | R$ 800–1.500/mês | CAC voluntário < R$ 15 |
| SEO técnico (otimização de páginas de vagas) | R$ 500/mês (1× setup) | Tráfego orgânico crescente |
| Tráfego pago (Google/Meta) | R$ 500–2.000/mês (eventual) | Testar canais, escalar o que funciona |
| Eventos e feiras ESG | R$ 500–1.500/evento | Pipeline de empresas |

**Jurídico e Operacional**

| Item | Descrição |
|---|---|
| Contratos de intermediação | Modelo jurídico para relação empresa–plataforma–ONG (responsabilidades, repasse, comissão) |
| Termos de uso e privacidade | LGPD compliance para dados de usuários (nome, localização, dados da ONG) |
| Constituição da empresa | CNPJ, enquadramento tributário (Simples Nacional ou Lucro Presumido) |
| Tributação sobre comissões | Análise do regime adequado para receita de intermediação |

---

## 10. Planejamento Estratégico e Roadmap

### 10.1 Fases de Desenvolvimento

```mermaid
gantt
    title Roadmap VoluntariApp — 24 meses
    dateFormat  YYYY-MM
    section Fase 1 - Validação
    MVP Voluntários + ONGs          :done, 2025-01, 2025-06
    10 ONGs early adopters          :done, 2025-04, 2025-08
    Feedback e iteração de produto  :done, 2025-06, 2025-10

    section Fase 2 - Monetização
    Módulo Empresas + Editais       :active, 2025-09, 2026-02
    1ª empresa com edital publicado :milestone, 2026-02, 1d
    Lançamento plano Premium ONG    :2025-11, 2026-02

    section Fase 3 - Crescimento
    Parceria com rede de ONGs       :2026-02, 2026-06
    Campanha de marketing digital   :2026-03, 2026-09
    Break-even operacional          :milestone, 2026-06, 1d

    section Fase 4 - Escala
    Expansão para 5 cidades         :2026-07, 2026-12
    Contratação de equipe           :2026-06, 2026-12
    40 editais intermediados/ano    :milestone, 2026-12, 1d
```

### 10.2 Prioridades por Fase

**Fase 1 — Validação (concluída/em curso)**
- [x] Plataforma funcional para voluntários e ONGs
- [x] Matching geolocalizado com PostGIS
- [x] Sistema de candidaturas e gestão de vagas
- [ ] 10 ONGs ativas com vagas publicadas
- [ ] 500 voluntários cadastrados

**Fase 2 — Monetização (prioridade atual)**
- [ ] Módulo completo de empresas e editais (publicação, submissão, aprovação)
- [ ] Fluxo financeiro de repasse e retenção de comissão
- [ ] Plano Premium para ONGs com cobrança recorrente
- [ ] Primeiro edital publicado e intermediado

**Fase 3 — Crescimento (meses 9–18)**
- [ ] 1 parceria com rede de ONGs (20+ organizações)
- [ ] Dashboard de impacto ESG para empresas
- [ ] Programa de indicação ativo
- [ ] SEO com 100+ páginas de vagas indexadas

**Fase 4 — Escala (meses 18–24)**
- [ ] Cobertura de 5 grandes cidades
- [ ] Equipe dedicada (dev, growth, CS)
- [ ] Integração com sistemas de gestão de ONGs (SINED, etc.)
- [ ] 40+ editais/ano intermediados

---

## 11. Análise de Riscos

### 11.1 Matriz de Riscos

```mermaid
quadrantChart
    title Matriz de Riscos — Probabilidade vs Impacto
    x-axis Baixa Probabilidade --> Alta Probabilidade
    y-axis Baixo Impacto --> Alto Impacto
    quadrant-1 Monitorar de perto
    quadrant-2 Mitigar ativamente
    quadrant-3 Aceitar
    quadrant-4 Preparar contingência
    Concorrente bem financiado entra no mercado: [0.35, 0.75]
    ONGs não engajam com a plataforma: [0.40, 0.85]
    Empresa parceira não cumpre repasse: [0.25, 0.90]
    Vazamento de dados LGPD: [0.20, 0.80]
    Custo de infra escala acima do previsto: [0.45, 0.40]
    Baixa conversão voluntário para candidatura: [0.50, 0.55]
    Churn alto no plano Premium ONG: [0.55, 0.60]
```

### 11.2 Riscos e Mitigações Detalhados

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| ONGs não engajam na plataforma | Alta | Alto | Onboarding assistido + co-criação de features com early adopters |
| Empresa não honra compromisso financeiro | Baixa | Crítico | Contrato com cláusula de garantia + escrow do valor antes do repasse |
| Concorrente com recursos superiores | Média | Alto | Foco em nichos locais, relacionamento próximo e dados proprietários |
| Violação de dados / LGPD | Baixa | Alto | Auditoria de segurança, criptografia de dados sensíveis, política de privacidade robusta |
| Baixa conversão voluntário → candidatura | Alta | Médio | Testes A/B no funil, melhoria de UX, personalização de notificações |
| Churn alto no Premium | Média | Médio | Onboarding de sucesso, reports de valor mensal, suporte proativo |
| Dependência de infraestrutura Vercel | Média | Médio | Plano de contingência com AWS/Fly.io; arquitetura agnóstica |

---

## 12. Análise Competitiva

### 12.1 Posicionamento de Mercado

```mermaid
quadrantChart
    title Posicionamento Competitivo
    x-axis Foco em Voluntários --> Foco em Empresas/ESG
    y-axis Plataforma Simples --> Plataforma Completa
    quadrant-1 Especialistas ESG
    quadrant-2 Plataformas Completas
    quadrant-3 Diretórios Básicos
    quadrant-4 Ferramentas Corporativas
    VoluntariApp: [0.55, 0.70]
    AtlasVoluntários: [0.30, 0.40]
    Benfeitoria: [0.60, 0.55]
    Vakinha: [0.40, 0.30]
    Plataformas ESG corporativas: [0.85, 0.60]
```

### 12.2 Diferenciais Competitivos

| Diferencial | VoluntariApp | Concorrentes típicos |
|---|---|---|
| Matching geolocalizado (PostGIS) | ✅ Raio configurável em tempo real | ❌ Filtro manual por cidade |
| PWA offline | ✅ Funciona sem internet | ❌ Web only com conexão |
| Intermediação de editais financeiros | ✅ Modelo estruturado empresa→ONG | ❌ Apenas doações diretas |
| Push notifications | ✅ Alertas em tempo real | ❌ E-mail ou sem notificação |
| ODS 17 como posicionamento | ✅ Ancoragem institucional | ❌ Posicionamento genérico |
| Gratuidade para voluntários | ✅ Zero fricção | Variável |

---

## 13. Síntese Estratégica

| Bloco | Resumo | Status |
|---|---|---|
| **Segmentos** | Voluntários (volume/rede), ONGs (proposta central), Empresas (receita) | Definido |
| **Público-Alvo** | Voluntários 18–35 anos mobile-first; ONGs pequeno/médio porte; empresas com agenda ESG | Validado |
| **Proposta de Valor** | Geolocalização, redução de fricção, canal ESG estruturado | Implementado |
| **Canais** | Redes sociais, SEO, parcerias, indicação | Em construção |
| **Relacionamento** | Self-service + push + comercial direto para empresas | Ativo |
| **Receita** | Comissão editais (principal) + Premium ONG (recorrente) | Em desenvolvimento |
| **Financeiro** | Break-even no mês 20–22; Ano 3 com margem 51% | Projetado |
| **Recursos** | Next.js + PostgreSQL/PostGIS + Vercel + Web Push | Operacional |
| **Atividades** | Matching, gestão de vagas, intermediação de editais, notificações | Ativas |
| **Parcerias** | Early adopters sendo captados; empresas ESG = próximo passo | Em andamento |
| **Custos** | Dominados por desenvolvimento; infra escalável com Vercel | Controlado |
| **Riscos** | Engajamento de ONGs e conversão de empresas como riscos críticos | Monitorados |

---
