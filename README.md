# História Intelectual UFMG

Site oficial do Grupo de História Intelectual da UFMG. Este projeto tem como objetivo divulgar as atividades do grupo, disponibilizar materiais, publicações, e-books e informações institucionais.

---

## 🌐 Acesso

- 🔗 **Site Público:** [https://www.historiaintelectualufmg.com.br](https://www.historiaintelectualufmg.com.br)
- 🔐 **Admin:** [https://www.historiaintelectualufmg.com.br/admin](https://www.historiaintelectualufmg.com.br/admin)

---

## 🏗️ Arquitetura do Projeto

| Camada        | Tecnologia                                        |
|----------------|---------------------------------------------------|
| **Frontend**   | Next.js (React) + Tailwind CSS                   |
| **Backend**    | Next.js API Routes (Serverless Functions)        |
| **Banco de Dados** | Supabase (PostgreSQL + Storage)              |
| **Armazenamento** | Supabase Storage (Arquivos, PDFs, imagens)    |
| **Hospedagem** | Vercel (com integração contínua via GitHub)      |
| **Design**     | Figma                                            |
| **Documentação** | Google Docs + Markdown no repositório          |

---

## 🗄️ Modelagem de Dados

### 🔐 Configuração Administrativa (`config`)
- id (UUID, PK)
- email (string)
- password_hash (string)
- created_at (timestamp)
- updated_at (timestamp)

### 👥 Membros da Equipe (`team`)
- id (UUID, PK)
- name (string)
- function_group (UUID, FK → functions.id)
- function_imprint (UUID, FK → functions.id)
- function_association (UUID, FK → functions.id)
- institution (string, opcional)
- degree (string, opcional)
- picture (UUID, FK → media_files.id, opcional)
- lattes (string, opcional)
- is_team_group (boolean)
- is_team_imprint (boolean)
- is_team_association (boolean)
- is_active (boolean)
- created_at (timestamp)
- updated_at (timestamp)

### 📚 Ebooks (`ebooks`)
- id (UUID, PK)
- title (string)
- subtitle (string, opcional)
- authors (string)
- authorship (string) — resumo dos autores
- summary (string) — sumário
- details (string) — ficha técnica
- year (int, 4 dígitos)
- description (text)
- file_id (UUID, FK → media_files.id)
- cover_id (UUID, FK → media_files.id)
- link (string, opcional)
- collection_id (UUID, FK → collections.id)
- keywords (string)
- created_at (timestamp)

### 📁 Arquivos e Mídias (`media_files`)
- id (UUID, PK)
- name (string)
- url (string)
- type (enum: image, pdf, doc, video)
- size (int, bytes)
- uploaded_at (timestamp)

### 🗂️ Coleções (`collections`)
- id (UUID, PK)
- id_pai (UUID, FK → collections.id, opcional)
- name (string)
- description (string)
- created_at (timestamp)
- uploaded_at (timestamp)

### 🏷️ Cargos (`functions`)
- id (UUID, PK)
- description (string)
- group (int) → (1 = Grupo | 2 = Selo | 3 = Associação)

---

## 🔐 Regras de Acesso

- Autenticação do painel `/admin` feita via Supabase Auth (login com e-mail e senha).
- Apenas membros com `is_active = true` aparecem no site público.
- Arquivos (PDFs, imagens, etc.) são gerenciados via Supabase Storage e mapeados na tabela `media_files`.

---

## 🎨 Design System

### 🎨 Paleta de Cores

| Nome            | HEX     |
|-----------------|---------|
| **Primária**    | `#E2A249` |
| **Secundária**  | `#E5848D` |
| **Seleção leve**| `#F6CFC7` |
| **Sucesso**     | `#9EC5AE` |
| **Fundo**       | `#FFFFFF` |
| **Fundo extra** | `#E1D5BF` |
| **Texto**       | `#222222` |

---

### ✍️ Tipografia

| Uso              | Fonte          | Peso      | Tamanho | Line-height |
|------------------|----------------|-----------|---------|-------------|
| **H1**           | Merriweather   | Bold      | 36px    | 47px        |
| **H2**           | Merriweather   | Semibold  | 28px    | 39px        |
| **H3**           | Merriweather   | Semibold  | 20px    | 28px        |
| **Corpo**        | Roboto         | Regular   | 20px    | 30px        |
| **Texto Menor**  | Roboto         | Regular   | 12px    | 17px        |
| **Botões/Links** | Roboto         | Semibold  | 14px    | 18px        |

---

## 🚀 Instruções para Desenvolvimento Local

### 🛠️ Requisitos
- Node.js (versão LTS recomendada)
- Acesso a conta no Supabase
- Acesso a conta na Vercel

### 🔧 Setup do Projeto

```bash
# Clone o repositório
git clone git@github.com:selocronopios/site.git

# Acesse a pasta do projeto
cd site

# Instale as dependências
npm install
# ou
yarn install
```

## 🔑 Configuração das Variáveis de Ambiente 
Crie um arquivo .env.local na raiz com as chaves do Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=https://<seu-projeto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=chave_anonima

SUPABASE_SERVICE_ROLE_KEY=chave_service_role (opcional se usar backend privado)
```

## ▶️ Rodando o projeto
```
npm run dev
# ou
yarn dev

```
Acesse em `http://localhost:3000`

## 📦 Deploy

Deploy automático via Vercel:
Push no main ou branch configurada → deploy automático.

## 🧠 Convenções
 - Pasta /app para rotas Next.js (App Router).
 - Pasta /app/admin para painel administrativo.
 - API routes em /app/api.
 - Biblioteca Supabase configurada em /lib/supabaseClient.ts.

## 🛡️ Licença
Este projeto está licenciado sob a MIT License.

APAGAR:
Gmail
Login: infoselocronopios@gmail.com
Senha: selocronopios25
