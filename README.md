# CondoHub

CondoHub é um SaaS de gestão condominial multi-tenant, com um único sistema e um único banco de dados para todos os condomínios.

## Decisões de arquitetura

1. Multi-tenant com contexto por condomínio
   - Cada entidade relevante deve receber um `condominio_id` quando aplicável.
   - O acesso é sempre filtrado pelo condomínio ativo do usuário.

2. Separação entre domínio, aplicação e infraestrutura
   - O domínio concentra tipos, contratos e regras centrais.
   - A camada de aplicação organiza os casos de uso.
   - A infraestrutura encapsula Supabase, Storage e Mercado Pago.

3. App Router com layouts por contexto
   - Rotas públicas para marketing e autenticação.
   - Rotas privadas para dashboard e módulos operacionais.

4. Server Components e Server Actions
   - As páginas principais devem priorizar Server Components.
   - As operações de formulário serão implementadas com Server Actions.

## Estrutura

- src/app: rotas, layouts e páginas.
- src/core/domain: tipos e contratos do domínio.
- src/core/application: casos de uso e orquestração.
- src/core/infrastructure: integrações externas.
- src/core/providers: providers globais.
- src/modules: módulos de negócio.
