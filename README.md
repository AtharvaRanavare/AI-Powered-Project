# Electronic Appliances Store

> A clean, beginner-friendly, and production-structured Mini E-Commerce Full-Stack Web Application built with Python (Flask, SQLite, SQLAlchemy) and React.js (Vite, Tailwind CSS).

---

## 📖 Project Overview

**Electronic Appliances Store** is an educational yet complete full-stack e-commerce application designed specifically for electronic home and kitchen appliances. It demonstrates end-to-end full-stack web development principles without unnecessary architectural complexity, microservices, or external paid services.

The application features:
- **Customer Role**: Register, login, browse categories, search products, filter by category, view product details, manage cart items in real time, place Cash on Delivery (COD) orders, and view order history.
- **Admin Role**: Secure admin authentication, dashboard metrics, category management (CRUD), product catalog management (CRUD), customer order tracking, and status transitions (Pending → Confirmed → Shipped → Delivered / Cancelled).
- **Security-First Architecture**: Bcrypt password hashing, JWT stateless authentication, role-based access control (RBAC), and strictly server-side order price calculation (frontend product prices are never trusted).

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
|---|---|---|
| **Frontend** | React 18 / 19 | Component-driven UI library |
| | Vite | Blazing fast modern frontend build tool |
| | Tailwind CSS | Utility-first responsive CSS framework |
| | React Router DOM (v6) | Declarative client-side routing |
| | Axios | Promise-based HTTP client with interceptors |
| **Backend** | Python 3.10+ | Core programming language |
| | Flask | Lightweight, robust WSGI web microframework |
| | Flask-SQLAlchemy | SQLAlchemy ORM integration for Flask |
| | Flask-JWT-Extended | JWT token creation, verification, and decorators |
| | Flask-Bcrypt | Secure bcrypt password hashing |
| | Flask-CORS | Cross-Origin Resource Sharing handling |
| **Database** | SQLite3 | Embedded file-based relational database (`store.db`) |
| **Styling & Assets** | Lucide React / SVG | Crisp, modern icons |
| | Unsplash CDN | Realistic appliance images via URLs |

---

## 📁 Project Structure

```text
electronic-appliances-store/
│
├── client/                               # Frontend React Application
│   ├── public/                           # Static assets & favicon
│   ├── src/
│   │   ├── assets/                       # Images and static media
│   │   ├── components/                   # Reusable UI components
│   │   │   ├── Navbar.jsx                # Responsive navigation with badge & auth
│   │   │   ├── Footer.jsx                # Simple footer with links & branding
│   │   │   ├── ProductCard.jsx           # Grid product card with stock status
│   │   │   ├── Loading.jsx               # Loading spinner and placeholder
│   │   │   └── ProtectedRoute.jsx        # Route guards for Auth & Admin roles
│   │   ├── context/                      # React Context providers
│   │   │   ├── AuthContext.jsx           # User state, JWT token, login/logout
│   │   │   └── CartContext.jsx           # Cart items, qty update, localStorage
│   │   ├── pages/                        # Page-level components
│   │   │   ├── Home.jsx                  # Hero section, categories, featured items
│   │   │   ├── Products.jsx              # Search, filter, and responsive grid
│   │   │   ├── ProductDetails.jsx        # Product view with stock limit selector
│   │   │   ├── Cart.jsx                  # Cart item list, subtotal, checkout CTA
│   │   │   ├── Checkout.jsx              # Shipping form with Cash on Delivery
│   │   │   ├── Login.jsx                 # User/Admin login form
│   │   │   ├── Register.jsx              # User registration with validations
│   │   │   ├── MyOrders.jsx              # Customer order history
│   │   │   └── admin/                    # Admin panel views
│   │   │       ├── Dashboard.jsx         # Summary metrics (Categories, Products, Orders)
│   │   │       ├── Categories.jsx        # Add, edit, list, and delete categories
│   │   │       ├── Products.jsx          # Add, edit, list, and delete products
│   │   │       └── Orders.jsx            # All orders list with status updates
│   │   ├── services/                     # Centralized API service layer
│   │   │   ├── api.js                    # Axios instance with Bearer JWT interceptor
│   │   │   ├── authService.js            # Register & login API calls
│   │   │   ├── categoryService.js         # Category CRUD API calls
│   │   │   ├── productService.js          # Product CRUD & filter API calls
│   │   │   └── orderService.js           # Order placement & admin update calls
│   │   ├── App.jsx                       # Main routing configuration
│   │   ├── main.jsx                      # React DOM entry point
│   │   └── index.css                     # Tailwind CSS imports & global styles
│   ├── .env.example                      # Client environment sample
│   ├── index.html                        # HTML template
│   ├── package.json                      # Frontend dependencies & scripts
│   ├── postcss.config.js                 # PostCSS Tailwind config
│   ├── tailwind.config.js                # Tailwind theme customization
│   └── vite.config.js                    # Vite bundler configuration
│
├── server/                               # Backend Flask API
│   ├── middleware/
│   │   └── auth.py                       # JWT validation & Admin-role decorator
│   ├── routes/
│   │   ├── auth_routes.py                # POST /register, POST /login
│   │   ├── category_routes.py            # Category CRUD endpoints
│   │   ├── product_routes.py             # Product CRUD, search & filter endpoints
│   │   └── order_routes.py               # Order creation, my-orders, admin routes
│   ├── utils/
│   │   └── validators.py                 # Request payload validation helpers
│   ├── app.py                            # Flask application factory & blueprint registration
│   ├── config.py                         # Environment configuration (JWT, DB URI)
│   ├── database.py                       # SQLAlchemy database instance
│   ├── models.py                         # User, Category, Product, Order models
│   ├── requirements.txt                  # Python dependencies
│   ├── seed.py                           # Database initialization & sample data seeder
│   ├── store.db                          # SQLite database file (created on runtime)
│   ├── .env.example                      # Server environment sample
│   └── .env                              # Server environment secrets (git-ignored)
│
├── .gitignore                            # Root gitignore for Python, Node, & DB
├── API_DOCUMENTATION.md                  # Comprehensive REST API specifications
├── ARCHITECTURE_AND_DATABASE.md          # Architecture, ERD, and Data flow
├── IMPLEMENTATION_PLAN.md                # 16-phase build & testing execution plan
├── PROJECT_SPECIFICATION.md              # Detailed project specifications & rules
└── README.md                             # Main project guide
```

---

## ⚡ Quick Start & Installation (Windows 11)

### 1. Prerequisites
Ensure you have the following installed on Windows 11:
- **Python 3.10+** (Ensure *"Add Python to PATH"* was selected during installation)
- **Node.js (v18 or v20 LTS)** and **npm**
- **Git**

---

### 2. Backend Setup (Flask + SQLite)

Open a terminal (PowerShell or Command Prompt) and navigate to the `server/` directory:

```powershell
cd server
```

#### Step A: Create and Activate a Virtual Environment
```powershell
python -m venv venv
venv\Scripts\activate
```

#### Step B: Install Python Dependencies
```powershell
pip install -r requirements.txt
```

#### Step C: Configure Environment Variables
Create a `.env` file inside the `server/` folder by copying `.env.example`:
```powershell
copy .env.example .env
```

Default content of `server/.env`:
```env
FLASK_APP=app.py
FLASK_ENV=development
FLASK_DEBUG=1
SECRET_KEY=super-secret-flask-key-change-in-production
JWT_SECRET_KEY=jwt-secret-electronic-store-secure-key
DATABASE_URL=sqlite:///store.db
PORT=5000
```

#### Step D: Seed the Database
Run the seed script to create all database tables, seed the default Admin user, and populate 5 realistic appliance categories with 10 sample products:
```powershell
python seed.py
```

#### Step E: Start the Flask Backend Server
```powershell
python app.py
```
> The backend server will start at: **`http://localhost:5000`**  
> REST API base URL: **`http://localhost:5000/api`**

---

### 3. Frontend Setup (React + Vite + Tailwind CSS)

Open a **second** terminal window and navigate to the `client/` directory:

```powershell
cd client
```

#### Step A: Install NPM Dependencies
```powershell
npm install
```

#### Step B: Configure Frontend Environment Variables
Create a `.env` file inside the `client/` folder by copying `.env.example`:
```powershell
copy .env.example .env
```

Content of `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

#### Step C: Start the Frontend Development Server
```powershell
npm run dev
```
> The client development server will run at: **`http://localhost:5173`**

Open your browser and navigate to: **`http://localhost:5173`**

---

## 🔐 Default Admin Credentials

The seed script automatically populates a default administrative account for grading and demonstration:

| Field | Value |
|---|---|
| **Email** | `admin@example.com` |
| **Password** | `Admin@123` |
| **Role** | `admin` |

> *Note*: Passwords are encrypted using salted bcrypt hashing and never stored in plain text.

---

## 📦 Sample Categories & Products (INR ₹ Pricing)

### Categories:
1. **Refrigerators**
2. **Washing Machines**
3. **Televisions**
4. **Kitchen Appliances**
5. **Air Conditioners**

### Sample Seed Products:
| Product Name | Category | Price (INR) | Initial Stock |
|---|---|---|---|
| Samsung 253L 3-Star Double Door Refrigerator | Refrigerators | ₹28,990 | 12 |
| LG 185L 5-Star Direct-Cool Single Door Refrigerator | Refrigerators | ₹17,490 | 8 |
| LG 7.0 Kg 5-Star Smart Inverter Washing Machine | Washing Machines | ₹18,990 | 15 |
| Bosch 8.0 Kg Inverter Front Load Washing Machine | Washing Machines | ₹34,990 | 6 |
| Sony Bravia 55-Inch 4K Ultra HD Smart LED TV | Televisions | ₹59,990 | 10 |
| Mi 43-Inch Full HD Smart Android LED TV | Televisions | ₹21,990 | 20 |
| Philips 750W Mixer Grinder with 3 Jars | Kitchen Appliances | ₹3,499 | 25 |
| Prestige 2000W Induction Cooktop | Kitchen Appliances | ₹2,899 | 30 |
| Voltas 1.5 Ton 3-Star Inverter Split AC | Air Conditioners | ₹32,990 | 14 |
| Daikin 1.5 Ton 5-Star Inverter Split AC | Air Conditioners | ₹45,490 | 5 |

---

## 🔑 REST API Reference Summary

All API endpoints follow standard REST conventions and return consistent JSON structures:

### Success Response Format:
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": { ... }
}
```

### Error Response Format:
```json
{
  "success": false,
  "message": "Invalid email or password",
  "errors": null
}
```

### Endpoints Table:
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new customer account |
| `POST` | `/api/auth/login` | Public | Login & receive JWT token |
| `GET` | `/api/categories` | Public | List all categories |
| `POST` | `/api/categories` | Admin | Create category |
| `PUT` | `/api/categories/:id` | Admin | Update category name/description |
| `DELETE` | `/api/categories/:id` | Admin | Delete category (checks for child products) |
| `GET` | `/api/products` | Public | List products (supports `?category=` & `?search=`) |
| `GET` | `/api/products/:id` | Public | Fetch product details by ID |
| `POST` | `/api/products` | Admin | Create product |
| `PUT` | `/api/products/:id` | Admin | Update product details/stock |
| `DELETE` | `/api/products/:id` | Admin | Delete product |
| `POST` | `/api/orders` | Customer | Place COD order (backend calculates total & deducts stock) |
| `GET` | `/api/orders/my-orders` | Customer | Fetch logged-in customer's orders |
| `GET` | `/api/admin/orders` | Admin | Fetch all customer orders |
| `PATCH` | `/api/admin/orders/:id/status` | Admin | Update order status (Confirmed, Shipped, etc.) |
| `GET` | `/api/admin/dashboard` | Admin | Summary counts (Categories, Products, Orders) |

---

## 🛡️ Critical Security & Business Rules

1. **Never Trust Frontend Pricing**:
   - Order totals sent from the browser are completely ignored by the backend.
   - When `/api/orders` receives a list of `{ product_id, quantity }`, the backend queries SQLite for the authoritative price of each item.
   - Total amount is recalculated strictly on the server: `Total = SUM(product.price * quantity)`.
2. **Stock Verification & Atomic Reduction**:
   - The backend checks `requested_qty <= product.stock`.
   - If stock is insufficient, the transaction is aborted with HTTP 400.
   - On valid orders, product stock is decremented immediately within a database transaction.
3. **Role-Based Authorization Decorator**:
   - Standard customers cannot access any `/api/admin/*` endpoints.
   - Trying to access admin endpoints returns HTTP 403 Forbidden.
4. **Data Isolation**:
   - Customers can only see their own order history (`/api/orders/my-orders`). They cannot view or modify other users' orders.

---

## 🧪 Comprehensive Verification Checklist

- [x] Admin Login with seeded credentials
- [x] Customer Registration with form validations (email format, matching passwords, min 6 chars)
- [x] Customer Login & JWT persistence in `localStorage`
- [x] Invalid login error messaging (HTTP 401)
- [x] Category creation, editing, and safe deletion
- [x] Product creation with URL image preview
- [x] Product editing and stock adjustment
- [x] Live search by product name
- [x] Instant category filtering buttons/dropdown
- [x] Add to Cart & real-time badge count update
- [x] Cart quantity increase/decrease within available stock
- [x] Item removal from cart & automatic subtotal recalculation
- [x] "Out of Stock" badge when product stock reaches 0
- [x] Cash on Delivery checkout with shipping form validation
- [x] Atomic order placement and server-side price calculation
- [x] Database stock decrement verification
- [x] Automatic cart clearing upon successful order placement
- [x] Customer order history view (`/my-orders`)
- [x] Admin orders view (`/admin/orders`)
- [x] Admin status update transitions (`Pending` → `Confirmed` → `Shipped` → `Delivered`)
- [x] Admin order cancellation (`Pending` → `Cancelled`)
- [x] Protected route enforcement (redirects unauthorized users to `/login`)
- [x] Proper logout clearing auth state & redirecting to `/`

---

## 🚫 Out of Scope (Architectural Constraints)

To keep this project focused, clean, lightweight, and easy to explain in academic or technical interviews, the following are intentionally **excluded**:
- No payment gateway integrations (Razorpay, Stripe, PayPal) — Cash on Delivery only.
- No microservices or distributed systems — Single monolithic Flask API.
- No Docker, Kubernetes, Celery, or Redis.
- No GraphQL or WebSockets.
- No multi-vendor / marketplace functionality.
- No file upload storage engines — Uses reliable direct image URLs (e.g., Unsplash).

---

## 📄 License

This project is open-source and free to use for educational and learning purposes.
