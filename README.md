
# Sistema de Gerenciamento de Usuários

Este é um sistema simples de gerenciamento de usuários desenvolvido com **Node.js**, **Express**, **Sequelize**, **PostgreSQL**, e **Swagger** para documentação de API. Ele inclui funcionalidades de autenticação JWT, CRUD de usuários, e logs com Winston.

---

## 🚀 Funcionalidades

- **Criar usuários:** Endpoint para cadastro de novos usuários.
- **Autenticação:** Login de usuários com geração de token JWT.
- **Atualização:** Atualização parcial ou completa dos dados de um usuário.
- **Listagem:** Busca dinâmica e listagem de usuários com filtros.
- **Exclusão:** Remoção de usuários por ID.
- **Logs:** Registro de operações usando Winston.
- **Documentação:** Swagger para documentação automática dos endpoints.

---

## 🛠️ Tecnologias

- **Node.js** (back-end)
- **Express** (framework para APIs)
- **Sequelize** (ORM para integração com PostgreSQL)
- **PostgreSQL** (banco de dados)
- **JWT** (autenticação)
- **Winston** (logs)
- **Swagger** (documentação de API)

---

## 📦 Instalação e Configuração

### Pré-requisitos

1. **Node.js** instalado (versão LTS recomendada).
2. **PostgreSQL** configurado e rodando.
3. Arquivo `.env` configurado com as variáveis de ambiente necessárias.

### Passo 1: Clone o repositório

```bash
git clone https://github.com/pedro-h-p-gomes/pantore-test.git
cd seu-repositorio
```

### Passo 2: Instale as dependências

```bash
npm install
```

### Passo 3: Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto e configure as variáveis:

```
DB_NAME=nome_do_banco
DB_USER=usuario
DB_PASSWORD=senha
DB_HOST=localhost
DB_DIALECT=postgres
JWT_SECRET=sua_chave_secreta
PORT=3000
```

### Passo 4: Inicialize o banco de dados

Certifique-se de que o banco de dados está rodando e execute a sincronização com Sequelize:

```bash
npm run start
```

---

## 🏃 Uso

### Iniciar o servidor

```bash
npm start
```

O servidor estará disponível em: `http://localhost:3000`

### Endpoints

Acesse a documentação completa dos endpoints em:  
`http://localhost:3000/api-docs`

---

## 📜 Scripts Disponíveis

- `npm start` - Inicia o servidor em produção.
- `npm run dev` - Inicia o servidor com nodemon para desenvolvimento.
- `npm run lint` - Verifica o código com ESLint.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 🤝 Contribuições

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do projeto.
2. Crie um branch para sua feature: `git checkout -b minha-feature`.
3. Commit suas mudanças: `git commit -m 'Adicionei minha feature'`.
4. Faça um push para o branch: `git push origin minha-feature`.
5. Abra um Pull Request.

---

## 📧 Contato

Criado por **[Seu Nome]**  
Entre em contato: [pedrogomespsa@gmail.com](mailto:pedrogomespsa@gmail.com)
