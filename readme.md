# Backend 2 -> Entrega 1

An API built with **Node.js** and **Express**, featuring secure user authentication and database integration. This project implements industry-standard security practices including password hashing and token-based authorization.

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

---

## ✨ Special Thanks

- John Node for inventing Node.
- I don't know who else, my Mom?

---

## Checkbox

[x] - Install dependencies.
[ ] - Configure Server.
    [x] - Configure .env
    [x] - Make connection to MongoDb.
    [x] - Make models.
        [x] - Users
        [x] - Carts
        [ ] - extras (Opcional)
    [x] - Make auth/passport.
    [x] - Make middlewares.
        [x] - Logger
        [x] - Auth
        [x] - Policies
    [ ] - Make routing.
        [x] - Make "home" GET that explains possible Endpoints.
        [ ] - Make "Register" POST
        [ ] - Make "login" POST
        [ ] - Make "current" GET that gives information about the logged user
        [ ] - Make "logout" POST that erases the cookie

[ ] - Test API.