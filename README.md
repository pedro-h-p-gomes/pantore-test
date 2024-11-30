
# User Management System

This is a simple user management system developed with **Node.js**, **Express**, **Sequelize**, **PostgreSQL**, and **Swagger** for API documentation. It includes JWT authentication, user CRUD operations, and logging with Winston.

---

## 🚀 Features

- **Create users:** Endpoint to register new users.
- **Authentication:** User login with JWT token generation.
- **Update:** Partial or full update of user data.
- **Listing:** Dynamic search and listing of users with filters.
- **Deletion:** Removal of users by ID.
- **Logs:** Recording operations using Winston.
- **Documentation:** Swagger for automatic documentation of the endpoints.

---

## 🛠️ Technologies

- **Node.js** (back-end)
- **Express** (API framework)
- **Sequelize** (ORM for PostgreSQL integration)
- **PostgreSQL** (database)
- **JWT** (authentication)
- **Winston** (logging)
- **Swagger** (API documentation)

---

## 📦 Installation and Setup

### Prerequisites

1. **Node.js** installed (LTS version recommended).
2. **PostgreSQL** configured and running.
3. `.env` file configured with the necessary environment variables.

### Step 1: Clone the repository

```bash
git clone https://github.com/pedro-h-p-gomes/pantore-test.git
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure the `.env` file

Create a `.env` file in the root of the project and configure the variables:

```
DB_NAME=database_name
DB_USER=user
DB_PASSWORD=password
DB_HOST=localhost
DB_DIALECT=postgres
JWT_SECRET=your_secret_key
PORT=3000
```

### Step 4: Initialize the database

Make sure the database is running and perform the Sequelize synchronization:

```bash
npm run start
```

---

## 🏃 Usage

### Start the server

```bash
npm start
```

The server will be available at: `http://localhost:3000`

### Endpoints

Access the full documentation of the endpoints at:  
`http://localhost:3000/api-docs`

---

## 📜 Available Scripts

- `npm start` - Starts the server in production mode.
- `npm run dev` - Starts the server with nodemon for development.
- `npm run lint` - Lints the code with ESLint.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributions

Contributions are welcome! Please follow the steps below to contribute:

1. Fork the repository.
2. Create a branch for your feature: `git checkout -b my-feature`.
3. Commit your changes: `git commit -m 'Added my feature'`.
4. Push to the branch: `git push origin my-feature`.
5. Open a Pull Request.

---

## 📧 Contact

Created by **Pedro Gomes**  
Contact: [pedrogomespsa@gmail.com](mailto:pedrogomespsa@gmail.com)
