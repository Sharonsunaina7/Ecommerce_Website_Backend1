Got it 🚀 — let’s make your repository **clean, professional, and self-explanatory**. Below is a complete **README.md draft** you can paste into your repo. It includes:

* Project overview
* Tech stack
* Folder structure (with explanation of each file)
* Installation & setup instructions
* Backend deliverables
* API usage with the **curl test examples you gave** (plus sample outputs so others know what to expect)
* Future improvements

---
# 🛒 E-Commerce Printing Platform (Backend)

This is the **backend service** for a custom e-commerce printing platform, built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
The backend provides authentication, product management, order handling, file uploads, and payment stubs — forming the core of the printing platform.

---

## 🚀 Tech Stack

- **Node.js** + **Express.js** – REST API  
- **MongoDB** + **Mongoose** – Database & models  
- **JWT** – Authentication & authorization  
- **Multer** – File upload handling  
- **AWS S3 (stub)** – Cloud file storage (ready to enable)  
- **Stripe / Razorpay (stub)** – Payment gateway integration (extendable)  

---

## 📂 Folder Structure

ecommerce-backend/
│
├── server.js                # Entry point, starts the server
├── package.json              # Dependencies & scripts
├── .env                      # Environment variables (JWT secret, DB URI, etc.)
├── uploads/                  # Stores local uploaded files
│
├── models/                   # Mongoose schemas
│   ├── User.js               # User schema (with isAdmin flag)
│   ├── Product.js            # Product schema with pricing options
│   └── Order.js              # Order schema with items, total, status
│
├── routes/                   # Express routes
│   ├── auth.js               # Register / login
│   ├── product.js            # Product CRUD & pricing
│   ├── order.js              # Order creation & status updates
│   └── upload.js             # File uploads (local & S3)
│
├── middleware/
│   └── auth.js               # JWT auth & admin middleware
│
├── utils/
│   └── s3.js                 # AWS S3 upload helper
│
└── config/                   # Optional configs
    └── db.js                 # MongoDB connection (if separated)


![Pathway:](https://github.com/Sharonsunaina7/Ecommerce_Website_Backend1/blob/main/pathway.png)

---

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/ecommerce-backend.git
   cd ecommerce-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create a `.env` file in the root:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/print_ecom
   JWT_SECRET=your_secret
   JWT_EXPIRES_IN=7d

   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_key
   AWS_SECRET_ACCESS_KEY=your_secret
   S3_BUCKET=your-bucket-name
   ```

4. **Run the server**

   ```bash
   npm run dev
   ```

   Server will start at: `http://localhost:5000`

---

## 📦 Backend Deliverables

* **Authentication** – JWT-based login & register
* **Products API** – CRUD for products, dynamic pricing
* **Orders API** – Create orders, update status, view past orders
* **File Uploads** – Local storage + S3 upload stub
* **Payment Stub** – Mock payment flow ready for Stripe/Razorpay integration
* **Admin APIs** – Manage products, orders, files
* **API Documentation** – Curl examples & JSON responses
* **Developer Docs** – Setup & extension notes

---

## 🧪 API Usage & Examples

### 🔑 Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
 -H "Content-Type: application/json" \
 -d '{"name":"Sharon","email":"sharon@example.com","password":"password123"}'
```

**Output:**

```json
{
  "user": {
    "id": "651234abcd...",
    "email": "sharon@example.com",
    "name": "Sharon"
  },
  "token": "eyJhbGciOiJI..."
}
```

---

### 🔑 Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email":"sharon@example.com","password":"password123"}'
```

**Output:**

```json
{
  "token": "eyJhbGciOiJI...",
  "user": {
    "id": "651234abcd...",
    "email": "sharon@example.com",
    "name": "Sharon",
    "isAdmin": false
  }
}
```

---

### 🛍️ Create Product (Admin only)

```bash
curl -X POST http://localhost:5000/api/products \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer <TOKEN>" \
 -d '{"title":"Business Card","basePrice":10,"options":{"glossy":1.2,"matte":1.0}}'
```

**Output:**

```json
{
  "_id": "65123product...",
  "title": "Business Card",
  "basePrice": 10,
  "options": { "glossy": 1.2, "matte": 1.0 },
  "createdBy": "651234abcd...",
  "createdAt": "2025-09-30T12:00:00.000Z"
}
```

---

### 💰 Price Calculation

```bash
curl -X POST http://localhost:5000/api/products/<productId>/price \
 -H "Content-Type: application/json" \
 -d '{"quantity":250,"selectedOptions":{"glossy":1.2}}'
```

**Output:**

```json
{
  "price": 2400
}
```

---

### 📦 Create Order (Mock Payment)

```bash
curl -X POST http://localhost:5000/api/orders \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer <TOKEN>" \
 -d '{"items":[{"productId":"<productId>","quantity":50,"specs":{"glossy":1.2}}]}'
```

**Output:**

```json
{
  "order": {
    "_id": "65123order...",
    "user": "651234abcd...",
    "items": [
      {
        "product": "65123product...",
        "quantity": 50,
        "specs": { "glossy": 1.2 },
        "price": 600
      }
    ],
    "total": 600,
    "paymentStatus": "pending",
    "status": "new"
  },
  "payment": {
    "mode": "mock",
    "clientSecret": "mock_client_secret_for_demo"
  }
}
```

---

### 📂 Upload File (Local Storage)

```bash
curl -X POST http://localhost:5000/api/upload/file \
 -H "Authorization: Bearer <TOKEN>" \
 -F "file=@/path/to/your/design.pdf"
```

**Output:**

```json
{
  "path": "/uploads/1696064856-design.pdf",
  "filename": "1696064856-design.pdf"
}
```

---

## 🔮 Future Improvements

* Integrate real **Stripe / Razorpay** payments
* Enable **AWS S3** for production file uploads
* Add **validation & rate-limiting** for better security
* Build **comprehensive test suite** (Jest/Supertest)
* Expand **Admin dashboard** with reporting & analytics
