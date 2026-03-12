# Backend 2 -> Entrega 1

An API inspired by the videogame Armored Core 6 built with **Node.js** and **Express**, featuring secure user authentication and database integration. This project implements industry-standard security practices including password hashing and token-based authorization.


---

## 🚀 Key Features

* **Authentication:** Secure login and registration using `Bcrypt` for password hashing and `JWT` for session management.
* **Database:** Structured data modeling with `Mongoose` (MongoDB).
* **Environment Management:** Protection of sensitive credentials via `Dotenv`.
* **RESTful API:** Clean and scalable routing structure.

---

## 🛠️ Tech Stack & Documentation

| Technology | Purpose | Documentation |
| --- | --- | --- |
| **Node.js** | JavaScript Runtime | [Link](https://nodejs.org/en/docs/) |
| **Express** | Web Framework | [Link](https://expressjs.com/) |
| **Mongoose** | MongoDB Object Modeling | [Link](https://mongoosejs.com/docs/) |
| **JWT** | JSON Web Tokens for Auth | [Link](https://jwt.io/introduction/) |
| **Dotenv** | Environment Variable Loader | [Link](https://www.npmjs.com/package/dotenv) |
| **Bcrypt** | Password Hashing | [Link](https://www.npmjs.com/package/bcrypt) |

---

## ⚙️ Prerequisites

* **Node.js** (v14 or higher)
* **MongoDB** (Local instance or Atlas Cluster)

---

## 📥 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Sadri199/backend2-entrega1.git
cd backend2-entrega1

```


2. **Install dependencies:**
```bash
npm install

```


3. **Set up environment variables:**
Create a `.env` file in the root directory and add the following:
```env
PORT=8080


```


4. **Start the server:**
```bash
# Development mode
npm run dev

# Production mode
npm start

```



---

## 🔐 API Endpoints (Example)

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Register a new user | No | //Actualizar
| POST | `/api/auth/login` | Login and get token | No | //Actualizar
| GET | `/api/users/profile` | Get current user data | **Yes** | //Actualizar

---

## 🛡️ Security Implementation

> This project follows best practices by never storing plain-text passwords. The `Bcrypt` library salts and hashes passwords before they hit the database, while `JWT` ensures that protected routes remain inaccessible without a valid signature.

---

## 📄 License

This project is open-source and available under the **MIT License**.

```text
MIT License

Copyright (c) 2026 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

---


## 🧾 Credits

- Google Gemini for making this readme.md (I'm sorry, I will never have the patience to fully learn Markdown ╰（‵□′）╯ ).
- Character "ALLMIND" featured in this project belongs to Armored Core VI: Fires of Rubicon. All rights belong to FromSoftware and Bandai Namco Entertainment. This is a non-commercial fan project created out of appreciation for the series.

---

## ✨ Special Thanks

- John Node for inventing Node.
- I don't know who else, my Mom?

---

## Checkbox Entrega Final Día D => 13/3 (Quedan 2 días)

[x] - Agregar Correciones Entrega 1

    [x] - campo email tenga un formato válido y asegurarte de que la propiedad email sea única
    [x] - más de detalle en el manejo de roles y permisos. Permitir una mejor diferenciación de acceso entre los diferentes roles (user, admin, etc.). 
    [x] - validación de expiración del token y validación de su renovación (jwt.verify(token, secret)) (podría ser un middleware)
    [x] - manejar de manera clara las respuestas ante diferentes tipos de errores, como la expiración del token 

[ ] - Agregar consigna entrega 2

    [x] - Repository Pattern Arquitectura
        [x] - Controllers
            [x] - User
            [x] - Products
            [x] - Order
        [x] - Services
            [x] - User
            [x] - Cart
            [x] - Mailer
            [x] - Products
            [x] - Order
        [x] - Templates de mail
                [x] - Welcome
                [x] - Reset Password
                [x] - Reset Confirm
                [x] - Order Created
        [x] - DAO
                [x] - DAO base   
                [x] - DAO Users   
                [x] - DAO Carts
                [x] - DAO Products
                [x] - DAO Orders / Tickets
        [x] - DTO
                [x] - DTO Users   
                [x] - DTO Carts
                [x] - DTO Products
                [x] - DTO Orders / Tickets
    [x] - Ruta Current, Middleware de Auth por policies
        [x] - Users Cambio de Router a Controller / Service para cada Endpoint
            [x] - Register
            [x] - Enviar email al registrarse
            [x] - Login
            [x] - Current
            [x] - Logout
            [x] - DTO con información simple (algo había armado ya)
        [x] - Password recovery
            [x] - Instalar y Configurar Nodemailer
            [x] - Enviar Mail para cambiar. https://blog.logrocket.com/implementing-secure-password-reset-node-js/
            [x] - Link con una hora de vigencia 
            [x] - No permitir poner la misma contraseña
            [x] - editar el hash guardado en la db
    [x] - Modelo Ticket, Middleware de Auth por policies
        [x] - Admin, CRUD de catálogo, User Read Catálogo
            [x] - Modelo Products
            [x] - Router Products
                [x] - Create (Admin)
                [x] - GetAll (User) (Admin)
                [x] - Update (Admin)
                [x] - Delete (Admin)
        [x] - Modelo Order
        [x] - Router Order
            [x] - Create Order, en estado pending (User) (Admin) enviar un mail para confirmar pedido
            [x] - Update products de la order
            [x] - Valida el stock de los productos, descuenta y modifica el campo active
            [x] - Confirm order (put), completarlas o dejarlas incompletas dependiendo del stock de los productos (User) (Admin) tiene que mandar un mail con detalles de compra
            [x] - Ver Order especifica (User validación de que ordenes puede ver findbyid) (Admin sería un getAll / find)
            [ ] - Ver todas las order (Admin) (opcional)
            [ ] - borrar order (Admin) (opcional)
    [ ] - Incluir .env

[ ] - Test API.