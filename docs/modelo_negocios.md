# Modelo de Negócios — VoluntariApp

O VoluntariApp é uma plataforma digital que atua como intermediária entre três grupos: voluntários que querem contribuir com causas sociais, ONGs que precisam captar voluntários e financiamento, e empresas privadas que desejam direcionar verba para projetos sociais de forma estruturada. O modelo é sustentado pelo princípio da **ODS 17 — Parcerias para a Implementação dos Objetivos** (Agenda 2030 da ONU), que reconhece que o impacto social depende da colaboração entre setores.

A principal fonte de receita é a **comissão sobre editais intermediados** entre empresas e ONGs. Voluntários e ONGs têm acesso gratuito às funcionalidades essenciais (modelo Freemium), enquanto funcionalidades avançadas para ONGs são disponibilizadas em plano pago. Isso garante tração e volume de usuários sem fricção, ao mesmo tempo em que monetiza as transações financeiras de maior valor.

O documento a seguir descreve cada bloco do Business Model Canvas do VoluntariApp.

---

## Business Model Canvas

---

### 1. Segmentos de Clientes
> *Quem você ajuda?*

O VoluntariApp serve três segmentos distintos e interdependentes — o crescimento de um impulsiona diretamente os outros:

**Voluntários individuais**
Pessoas que desejam contribuir com causas sociais, mas têm dificuldade em encontrar oportunidades alinhadas ao seu perfil, disponibilidade de tempo e localização. Buscam facilidade, confiança e propósito. Representam o maior volume de usuários na plataforma e são a base do efeito de rede.

**ONGs (Organizações Não Governamentais)**
Organizações da sociedade civil que dependem de voluntários para executar sua missão e de financiamento externo para sustentar projetos. Segundo entrevistas realizadas na fase de pesquisa, o processo de captação de voluntários pode levar de 1 a 2 semanas por ação e consome parcela significativa do tempo das equipes. São o segmento central da proposta de valor operacional da plataforma.

**Empresas privadas**
Organizações com agenda de responsabilidade social corporativa (ESG) que desejam direcionar verba para projetos sociais de forma confiável, seletiva e mensurável. Buscam um canal que ofereça rigor no processo de seleção de ONGs e visibilidade sobre o impacto dos recursos investidos. São o segmento que gera a principal receita da plataforma.

---

### 2. Propostas de Valor
> *Como você contribui?*

**Para voluntários:**
- Catálogo centralizado de vagas filtrado por geolocalização (raio configurável via PostGIS), categoria (Educação, Saúde, Social, Meio Ambiente), disponibilidade e modalidade de trabalho
- Notificações push em tempo real sobre novas oportunidades alinhadas ao perfil cadastrado
- Histórico de horas voluntárias e candidaturas consolidado em um único perfil
- Experiência mobile-first via PWA — funciona offline e pode ser instalado como app

**Para ONGs:**
- Redução do tempo de captação de voluntários de semanas para horas, eliminando processos manuais e dependência de redes sociais próprias
- Alcance de voluntários qualificados fora das redes de contato existentes, com filtro por área de interesse compatível com as necessidades da organização
- Acesso a editais de financiamento publicados por empresas privadas, com processo estruturado de submissão de propostas
- Centralização da gestão de inscrições — visualização dos candidatos inscritos em cada vaga em um só painel

**Para empresas:**
- Canal estruturado e auditável para publicar editais com verba disponível para projetos sociais
- Processo formalizado de avaliação e aprovação de propostas submetidas por ONGs
- Rastreabilidade do impacto: histórico de editais publicados, ONGs selecionadas e recursos distribuídos
- Reputação e visibilidade associadas ao apoio a causas sociais relevantes

---

### 3. Canais
> *Como te encontram?*

**Redes sociais (Instagram, LinkedIn)**
Canal principal de aquisição orgânica. Conteúdo sobre voluntariado, impacto social, causas apoiadas por ONGs parceiras e histórias de voluntários. O LinkedIn é especialmente relevante para alcançar empresas com interesse em ESG e profissionais que buscam experiências voluntárias.

**Indicação e boca a boca**
ONGs satisfeitas indicam voluntários; voluntários indicam outros voluntários e ONGs de sua rede. Mecanismo de crescimento viral de baixo custo e alta confiança, especialmente em comunidades locais.

**Parcerias institucionais**
Empresas parceiras e redes de ONGs (regionais ou nacionais) divulgam a plataforma para suas bases de contato. Um único acordo com uma rede de ONGs pode trazer dezenas de organizações ao mesmo tempo.

**SEO e busca orgânica**
Páginas de vagas indexadas no Google permitem que voluntários que buscam oportunidades específicas ("voluntariado educação São Paulo") cheguem à plataforma sem custo de aquisição. Escala conforme o volume de vagas publicadas cresce.

---

### 4. Relacionamento com Clientes
> *Como você interage?*

**Self-service digital**
Toda a jornada do usuário — cadastro, busca, candidatura, publicação de vagas, submissão de propostas a editais — é realizada de forma autônoma dentro da plataforma. Sem necessidade de intermediação humana para as operações do dia a dia.

**Notificações push em tempo real**
Voluntários são notificados automaticamente quando novas vagas compatíveis com seu perfil são publicadas. ONGs recebem alertas sobre candidaturas recebidas. O relacionamento é mantido ativo sem que o usuário precise retornar à plataforma proativamente.

**Matching por geolocalização**
O algoritmo de proximidade (PostGIS + função `search_close_ongs`) entrega vagas geograficamente relevantes para cada voluntário de forma automática, personalizando a experiência sem configuração manual.

**Experiência offline (PWA)**
A plataforma funciona como Progressive Web App — pode ser instalada no celular e opera com funcionalidades básicas mesmo sem conexão à internet, garantindo acesso em contextos de conectividade limitada.

---

### 5. Fontes de Receita e Benefícios
> *O que você recebe?*

**Modelo combinado: Freemium + Comissão em editais**

**[Principal] Comissão sobre editais intermediados**
Porcentagem retida sobre o valor dos editais quando uma empresa aprova a proposta de uma ONG e os recursos são desembolsados. É a principal fonte de receita. Incide apenas quando há transação financeira efetiva — alinhando o interesse da plataforma com o sucesso da intermediação.

**[Secundário] Plano premium para ONGs**
Funcionalidades avançadas disponíveis mediante assinatura:
- Destaque de vagas no topo da listagem por geolocalização
- Relatórios detalhados de candidaturas e perfil dos voluntários inscritos
- Múltiplos usuários gestores por organização
- Acesso antecipado a editais recém-publicados

**[Base] Gratuito para voluntários**
Sem custo para o segmento de maior volume. A gratuidade garante tração, comunidade ativa e o efeito de rede necessário para que ONGs e empresas encontrem valor na plataforma.

---

### 6. Recursos Principais
> *Quem é você? O que você tem?*

**Tecnológicos**
- Plataforma web PWA desenvolvida em Next.js 13 + TypeScript, com suporte offline via Service Worker
- Banco de dados PostgreSQL com extensão PostGIS para buscas de proximidade geoespacial (`search_close_ongs`)
- Sistema de autenticação JWT (HS256, 7 dias) com controle de roles — `volunteer`, `ong`, `empresa`
- Infraestrutura de notificações push (Web Push API + VAPID) integrada ao ciclo de publicação de vagas
- Deploy serverless na Vercel com escala automática e zero infraestrutura gerenciada

**Humanos**
- Equipe de desenvolvimento full-stack responsável pelo produto, manutenção e evolução da plataforma
- Capacidade de onboarding e suporte a novos parceiros (ONGs e empresas)

**Intangíveis**
- Dados de geolocalização de ONGs e perfis de voluntários — ativo que melhora o matching com o tempo
- Base de vagas e histórico de candidaturas como prova de tração para atrair novas empresas
- Posicionamento de impacto social com ancoragem na ODS 17 da ONU — diferencial de credibilidade institucional

---

### 7. Atividades-Chave
> *O que você faz?*

**Matching inteligente voluntário–vaga**
Algoritmo central da plataforma: conecta voluntários a vagas por proximidade geográfica (raio configurável), categoria de interesse, disponibilidade e modalidade. Quanto mais dados de perfil, mais preciso o matching.

**Gestão do ciclo completo de vagas**
ONGs publicam, editam e encerram vagas; voluntários se candidatam, acompanham status e podem desistir. Toda a operação é gerenciada na plataforma sem intervenção manual.

**Intermediação de editais empresa → ONG**
Empresas publicam editais com verba disponível e prazo; ONGs submetem propostas com descrição do projeto; a plataforma gerencia o fluxo de avaliação, aprovação e histórico das candidaturas.

**Notificações em tempo real**
Disparo automático de push notifications a cada nova vaga publicada, mantendo voluntários engajados passivamente e aumentando a taxa de candidaturas.

**Desenvolvimento contínuo da plataforma**
Manutenção e evolução técnica: correção de bugs, implementação de novas funcionalidades (especialmente o módulo completo de empresa/editais, ainda em desenvolvimento), migrations de banco de dados e monitoramento de performance.

**Crescimento e onboarding de parceiros**
Captação ativa de ONGs (especialmente early adopters), voluntários e empresas interessadas em publicar editais. É a atividade crítica de curto prazo para atingir massa crítica.

---

### 8. Parcerias Principais
> *Quem o ajuda?*

*Fase atual: nenhuma parceria formalizada. As parcerias abaixo representam o modelo a ser construído.*

**ONGs early adopters**
Primeiras organizações a usar a plataforma ativamente. Validam o produto em condições reais, geram dados de uso e criam prova social que facilita a captação de novas ONGs. São parceiras estratégicas para o lançamento.

**Empresas privadas (fontes de editais)**
Parceiros de receita. Empresas com agenda ESG que se comprometem a publicar editais na plataforma, gerando a principal monetização e tornando o produto valioso para as ONGs. A captação dessas empresas é prioridade estratégica.

**Redes de ONGs**
Organizações que agregam dezenas ou centenas de ONGs (redes regionais, ABONG ou similares). Um único acordo de parceria pode trazer volume expressivo de organizações, acelerando o crescimento do lado da oferta de vagas.

**Governos municipais e estaduais**
Prefeituras e secretarias que incentivam voluntariado local podem indicar, recomendar ou até integrar a plataforma às suas iniciativas de cidadania. Parceria de baixo custo e alto alcance institucional.

**Parceiros de infraestrutura**
- **Vercel:** hosting e deploy das funções serverless em produção
- **Web Push (VAPID):** infraestrutura de notificações push para os assinantes da plataforma
- **Docker + PostgreSQL:** ambiente de desenvolvimento local e banco de dados em produção

---

### 9. Estrutura de Custos
> *O que você oferece e o que custa?*

**O que é entregue**
- Plataforma de conexão voluntário ↔ ONG disponível 24/7 como PWA com suporte offline
- Sistema de editais para intermediação financeira empresa → ONG
- Infraestrutura de dados com busca geoespacial e notificações em tempo real

**Principais custos**

| Item | Descrição |
|------|-----------|
| **Hosting / Vercel** | Serverless functions + frontend estático; escala com uso |
| **Banco de dados PostgreSQL + PostGIS** | Instância gerenciada em produção com extensão geoespacial |
| **Push notifications (Web Push)** | Custo cresce com o volume de assinantes ativos |
| **Desenvolvimento** | Horas de engenharia para novas funcionalidades, manutenção, migrations e segurança |
| **Marketing digital** | Produção de conteúdo para redes sociais, SEO técnico e eventual tráfego pago |
| **Operacional / jurídico** | Estruturação de contratos para intermediação de editais, termos de uso, LGPD |

---

## Síntese Estratégica

| Bloco | Resumo |
|-------|--------|
| **Segmentos** | Voluntários (volume), ONGs (proposta central), Empresas (receita) |
| **Proposta de Valor** | Conecta voluntários a causas por geolocalização; reduz custo de captação das ONGs; canaliza verba ESG via editais |
| **Canais** | Redes sociais, SEO, indicação, parcerias institucionais |
| **Relacionamento** | Self-service digital + notificações push + PWA offline |
| **Receita** | Comissão sobre editais (principal) + Plano premium para ONGs (secundário) + Gratuito para voluntários |
| **Recursos** | Next.js PWA + PostgreSQL/PostGIS + Web Push + Deploy Vercel |
| **Atividades** | Matching geolocalizado, gestão de vagas, intermediação de editais, notificações, desenvolvimento |
| **Parcerias** | ONGs early adopters, empresas com ESG, redes de ONGs, prefeituras, Vercel/infraestrutura |
| **Custos** | Hosting, banco de dados, push notifications, desenvolvimento, marketing |
