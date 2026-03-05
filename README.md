# 📚 Book Library API

## 📌 Project Overview

The **Book Library API** is a backend-focused project that allows users to add, browse, and search books using REST APIs. The system supports **pagination, filtering, authentication, and role-based access control**.

A minimal frontend built with **HTML and JavaScript** is included for basic interaction and API testing.

---

# 🚀 Features

### 📖 Book Management

* Add new books
* Get all books with pagination
* Filter books by genre
* Filter books by rating
* Get details of a specific book by ID

### 🔐 Authentication

* User signup
* User login
* JWT token-based authentication

### 👑 Role-Based Access

* Admin users can add books
* Regular users can only browse books

### 🔍 Filtering

* Filter books by genre
* Filter books by minimum rating

### 📄 Pagination

* Fetch books page by page

---

# 🛠 Tech Stack

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)

**Frontend**

* HTML
* JavaScript (Fetch API)

**Tools**

* Postman for API testing
* GitHub for version control

---

# 📂 Project Structure

```
Book_Library
│
├── models
│   ├── User.js
│   └── Book.js
│
├── routes
│   ├── authRoutes.js
│   └── bookRoutes.js
│
├── middleware
│   ├── authMiddleware.js
│   └── adminMiddleware.js
│
├── index.html
├── server.js
├── package.json
└── README.md
```

---

# 📡 API Endpoints

## Authentication

### Signup

```
POST /auth/signup
```

Body

```
{
 "username": "user1",
 "password": "123456"
}
```

---

### Login

```
POST /auth/login
```

Response

```
{
 "token": "JWT_TOKEN"
}
```

---

# 📚 Book APIs

### Add Book (Admin Only)

```
POST /books
```

Headers

```
Authorization: Bearer TOKEN
```

Body

```
{
 "title": "Wings of Fire",
 "author": "APJ Abdul Kalam",
 "genre": "Biography",
 "rating": 4.8
}
```

---

### Get All Books (Pagination)

```
GET /books?page=1&limit=5
```

---

### Filter by Genre

```
GET /books?genre=fiction
```

---

### Filter by Rating

```
GET /books?rating=4.5
```

---

### Get Book by ID

```
GET /books/:id
```

---

# ⚠️ Error Handling

The API returns appropriate status codes:

| Status | Meaning         |
| ------ | --------------- |
| 200    | Success         |
| 201    | Book created    |
| 400    | Invalid request |
| 401    | Unauthorized    |
| 403    | Admin only      |
| 404    | Book not found  |
| 500    | Server error    |

---

# ▶️ How to Run the Project Locally

### 1️⃣ Clone the repository

```
git clone https://github.com/YOUR_USERNAME/Book_Library.git
```

### 2️⃣ Install dependencies

```
npm install bcrypt jsonwebtoken 
```

### 3️⃣ Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4️⃣ Start the server

```
node server.js
```

Server will run at:

```
http://localhost:5000
```

---

# 🧪 API Testing

All APIs can be tested using **Postman**.

Example tests include:

* Signup
* Login
* Add book
* Get books
* Filter books
* Get book by ID

---

# 🌐 Deployment

The API can be deployed to cloud platforms such as:

* Render
* Railway
* Heroku

After deployment, the API will be accessible via a public URL.
