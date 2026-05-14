# MeuSiteJá

Bem-vindo ao repositório do **MeuSiteJá**!

Esse projeto foi desenvolvido com o objetivo de facilitar a criação de sites de maneira simples, rápida e acessível para qualquer pessoa.

A ideia surgiu da necessidade de pequenos negócios, profissionais autônomos e estudantes conseguirem ter presença online sem precisar entender de programação ou gastar muito dinheiro.

Nosso foco foi criar uma plataforma intuitiva, moderna e fácil de usar, permitindo que o usuário personalize seu próprio site em poucos passos.

Esperamos que esse projeto possa ajudar muitas pessoas e também servir como aprendizado para futuros desenvolvimentos.

## Sobre o Projeto

O **MeuSiteJá** é uma plataforma web criada para tornar a criação de sites algo simples e acessível.

Muitas pessoas possuem negócios, serviços ou portfólios incríveis, mas acabam não tendo um site por acharem complicado desenvolver um. Pensando nisso, criamos uma solução prática onde o usuário consegue montar sua página de forma intuitiva e personalizada.

O sistema foi desenvolvido buscando unir:

* Facilidade de uso
* Design moderno
* Personalização
* Rapidez
* Organização

Tudo isso sem exigir conhecimentos avançados em programação.

O sistema permite que usuários criem páginas personalizadas para:

* Portfólios profissionais
* Negócios locais
* Prestadores de serviços

A proposta do projeto é permitir que qualquer pessoa consiga montar sua presença online sem precisar programar.

---

# Funcionalidades

## Sistema de autenticação

* Cadastro de usuários
* Login com e-mail e senha
* Integração com Firebase Authentication

## Escolha de templates

O usuário pode escolher entre:

* Template Portfólio
* Template Negócio
* Template Prestador de Serviço

## Personalização

* Escolha de paletas de cores
* Upload de imagens
* Informações personalizadas
* Redes sociais
* Horários
* Serviços
* Experiências profissionais

## Criação de subdomínio

O usuário pode definir um link único para seu site.

Exemplo:

```txt
meusiteja.com/seunome
```

## Integração com IA

O sistema possui integração com IA utilizando a API da Groq.

## Banco de dados

Todos os dados são armazenados no Firebase Firestore.

---

# Tecnologias Utilizadas

## Frontend

* React
* Vite
* CSS3
* Firebase

## Backend

* Node.js
* Express
* Firebase Admin SDK
* Groq SDK

## Banco de Dados

* Firebase Firestore

---

# Estrutura do Projeto

```txt
Main/
│
├── frontend/          # Interface do usuário
├── backend/           # API e serviços
├── assets/            # Logos e imagens
├── public/            # Arquivos públicos
│
├── package.json
└── README.md
```

---

# Como Instalar o Projeto

## Pré-requisitos

Antes de começar, você precisa ter instalado:

* Node.js
* npm
* Git

### Links úteis

* Node.js: [https://nodejs.org/](https://nodejs.org/)
* Git: [https://git-scm.com/](https://git-scm.com/)

---

# Clonando o Projeto

```bash
git clone https://github.com/seu-repositorio/meusiteja.git
```

Entre na pasta:

```bash
cd Main
```

---

# Instalando Dependências

## Instalar dependências da raiz

```bash
npm install
```

## Instalar dependências do frontend

```bash
cd frontend
npm install
```

## Instalar dependências do backend

```bash
cd ../backend
npm install
```

---

# Configuração do Firebase

## 1. Criar projeto no Firebase

Acesse:

[https://console.firebase.google.com/](https://console.firebase.google.com/)

Crie um novo projeto.

---

## 2. Ativar serviços

Ative:

* Firebase Authentication
* Firestore Database

---

## 3. Configurar autenticação

No Firebase:

```txt
Authentication → Sign-in method → Email/Password
```

Ative o login por e-mail e senha.

---

## 4. Configurar arquivo do frontend

Crie o arquivo:

```txt
frontend/.env
```

Adicione:

```env
VITE_FIREBASE_API_KEY=SUA_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=SEU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=SEU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=SEU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=SEU_SENDER_ID
VITE_FIREBASE_APP_ID=SEU_APP_ID
```

---

## 5. Configurar backend

Crie:

```txt
backend/.env
```

Adicione:

```env
PORT=3000

FIREBASE_PROJECT_ID=SEU_PROJECT_ID
FIREBASE_CLIENT_EMAIL=SEU_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY="SUA_PRIVATE_KEY"

GROQ_API_KEY=SUA_API_KEY_GROQ
```

---

# Como Rodar o Projeto

## Rodar frontend

Abra um terminal:

```bash
cd frontend
npm run dev
```

O frontend abrirá normalmente em:

```txt
http://localhost:5173
```

---

## Rodar backend

Abra outro terminal:

```bash
cd backend
npm run dev
```

Servidor backend:

```txt
http://localhost:3000
```

---

# Como Usar o Site

O fluxo do sistema foi pensado para ser simples e direto, permitindo que qualquer usuário consiga criar seu site sem dificuldades.

Abaixo está um passo a passo completo de utilização da plataforma.

## 1. Abrir o sistema

Acesse:

```txt
http://localhost:5173
```

---

## 2. Tela inicial

Na página principal o usuário encontra:

* Explicação da plataforma
* Templates disponíveis
* Benefícios
* Botão “Comece a Criar”

---

## 3. Criar conta

O usuário deve:

* Inserir e-mail
* Criar senha
* Fazer login

---

## 4. Escolher template

Existem 3 opções:

### Portfólio

Ideal para:

* Desenvolvedores
* Designers
* Estudantes
* Profissionais

### Negócio

Ideal para:

* Restaurantes
* Lojas
* Cafeterias
* Clínicas

### Prestador de Serviço

Ideal para:

* Eletricistas
* Mecânicos
* Encanadores
* Técnicos

---

# Passo a Passo de Criação

## Portfólio

O usuário preenche:

* Informações pessoais
* Sobre mim
* Experiências
* Formação
* Habilidades
* Contato
* Foto profissional
* Paleta de cores
* Subdomínio

---

## Negócio

O usuário preenche:

* Nome do negócio
* História da empresa
* Serviços
* Fotos
* Localização
* Horários
* Contato
* Redes sociais
* Paleta de cores
* Subdomínio

---

## Prestador de Serviço

O usuário preenche:

* Informações profissionais
* Serviços oferecidos
* Regiões atendidas
* Horários
* Fotos de trabalhos
* Contato
* Paleta de cores
* Subdomínio

---

# Sistema de Paletas

Cada template possui paletas específicas.

Exemplos:

* Moderno
* Tech
* Minimalista
* Vibrante
* Elegante
* Corporativo

---

# API Backend

## Rotas principais

### Auth

```txt
/auth
```

### IA

```txt
/ai
```

### Sites

```txt
/sites
```

---

# Integração com IA

O projeto utiliza a API da Groq para auxiliar em funcionalidades inteligentes.

Biblioteca utilizada:

```txt
groq-sdk
```

---

# Firestore

O Firestore é utilizado para armazenar:

* Usuários
* Sites criados
* Informações personalizadas
* Configurações

---

# Segurança

O projeto utiliza:

* Middleware de autenticação
* Firebase Admin SDK
* Regras do Firestore
* Validação de rotas

---

# Scripts Disponíveis

## Frontend

### Rodar ambiente de desenvolvimento

```bash
npm run dev
```

---

## Backend

### Rodar servidor com nodemon

```bash
npm run dev
```

### Rodar servidor normal

```bash
npm start
```

---

# Futuras Melhorias

* Sistema de deploy automático
* Upload de imagens em nuvem
* Editor visual drag-and-drop
* Mais templates
* Painel administrativo
* Sistema de analytics
* SEO automático
* Responsividade avançada

---

# Equipe

Projeto desenvolvido para fins acadêmicos.

Integrantes:

* Kauan B.
* Gabriel V.
* Miguel G.
* Lorenzo F.
* Breno F.

---

# Licença

Este projeto é destinado para fins educacionais.

---

# Observações

Caso ocorra erro ao iniciar:

## Limpar node_modules

```bash
rm -rf node_modules
npm install
```

---

## Verificar versão do Node

```bash
node -v
```

Recomendado:

```txt
Node 18+
```

---

# Contato

Caso queira melhorar o projeto ou contribuir:

* Faça um fork
* Crie uma branch
* Envie um pull request

---

# Obrigado por utilizar o MeuSiteJá

Obrigado por visitar nosso projeto!

Esse sistema foi desenvolvido com muito esforço, aprendizado e dedicação da equipe. Durante o desenvolvimento buscamos não apenas criar um site funcional, mas também melhorar nossas habilidades em frontend, backend, banco de dados e integração com APIs.

Esperamos que o projeto seja útil, fácil de utilizar e possa evoluir ainda mais no futuro.

Toda sugestão, melhoria ou contribuição é muito bem-vinda

Esperamos que o projeto facilite a criação de sites e ajude pessoas a terem presença online de forma simples e rápida.
