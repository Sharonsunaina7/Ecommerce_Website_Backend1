## 📦 Backend Deliverables

The backend for this project is built with **Node.js, Express, and MongoDB**, following a modular structure for scalability and clarity.  
Below are the backend-specific deliverables:

### 🔑 Authentication
- JWT-based user registration & login APIs  
- Role-based access (User / Admin)  

### 🛍️ Product Management APIs
- Add, edit, delete products (Admin only)  
- Fetch product catalog & single product details  
- Dynamic pricing endpoint based on selected specs  

### 📦 Order Management APIs
- Place new order (with product specs, quantity, uploaded files)  
- Update order status (`new`, `in_production`, `shipped`, `delivered`, `cancelled`)  
- Fetch user’s past orders  

### 📂 File Upload Handling
- Local storage upload route (using Multer)  
- AWS S3 upload route (stub implemented, configurable with credentials)  

### 💳 Payment Integration (Stubbed)
- Mock payment flow integrated with order placement  
- Endpoint for marking payment as successful  
- Ready for integration with **Stripe** or **Razorpay**  

### ⚙️ Admin APIs
- Manage products and orders  
- Download customer order files (via stored file paths or S3 URLs)  

### 📖 Documentation
- **API Documentation** – Endpoints, request/response samples, authentication flow  
- **Developer Documentation** – Setup instructions, folder structure, environment variables, run commands  
- Notes on extending **payment integration** & **S3 uploads**  

---
