# Project Specification: Electronic Appliances Store

## 1. Executive Summary

The **Electronic Appliances Store** is a specialized, beginner-friendly mini full-stack e-commerce application. The goal is to provide a fully functional, lightweight, and robust online shopping portal for household and kitchen electronic appliances.

The system is architected around two primary roles:
1. **Customer**: An end user who can discover, search, filter, examine appliances, manage a shopping cart, place Cash on Delivery orders, and track order histories.
2. **Admin**: A store operator who manages categories, edits product inventory and pricing, tracks customer orders, and updates delivery fulfillment status.

---

## 2. Core Functional Requirements

### 2.1 Role-Based Permissions Matrix

| Feature / Action | Guest (Unauthenticated) | Customer | Admin |
|---|:---:|:---:|:---:|
| View Landing Page & Hero Section | ✅ | ✅ | ✅ |
| Browse & Search Products | ✅ | ✅ | ✅ |
| Filter Products by Category | ✅ | ✅ | ✅ |
| View Product Details & Stock Status | ✅ | ✅ | ✅ |
| Add Items to Cart & Update Quantity | ✅ (Local) | ✅ | ✅ |
| User Registration & Login | ✅ | N/A | N/A |
| Checkout & Place COD Order | ❌ (Redirects to Login) | ✅ | ❌ |
| View Own Order History (`/my-orders`) | ❌ | ✅ | ❌ |
| Access Admin Dashboard (`/admin`) | ❌ | ❌ (403 Forbidden) | ✅ |
| Add / Edit / Delete Categories | ❌ | ❌ | ✅ |
| Add / Edit / Delete Products | ❌ | ❌ | ✅ |
| View All Customer Orders | ❌ | ❌ | ✅ |
| Update Order Fulfillment Status | ❌ | ❌ | ✅ |

---

## 3. Detailed User Experience & Page Specifications

### 3.1 Public & Customer Pages

#### 1. Home Page (`/`)
- **Hero Section**:
  - Main Heading: *"Smart Appliances for Modern Living"*
  - Subtitle: *"Discover reliable electronic appliances at great prices."*
  - Call-to-Action button: *"Shop Now"* (navigates to `/products`).
- **Popular Categories Section**:
  - Visual cards representing main categories (Refrigerators, Washing Machines, Televisions, Kitchen Appliances, Air Conditioners).
  - Clicking a category navigates to `/products?category=<CategoryName>`.
- **Featured Products Section**:
  - Highlights a curated subset of 4-6 appliances with product image, title, price, category badge, and "View Details" button.
- **Footer**:
  - Clean brand statement, quick navigation links, customer service hours, and copyright notice.

#### 2. Products Catalog Page (`/products`)
- **Filter & Search Controls**:
  - **Live Search Bar**: Searches appliance title and description in real-time.
  - **Category Filter Tabs / Dropdown**: Displays "All" alongside dynamically fetched categories.
  - **Stock Status Filter / Indicator**: Displays in-stock vs out-of-stock items.
- **Product Grid Layout**:
  - Desktop: 4 columns.
  - Tablet: 2 to 3 columns.
  - Mobile: 1 column.
- **Product Card Elements**:
  - Product image (responsive, with aspect-ratio preservation).
  - Category pill badge.
  - Product title (clamped to 2 lines for visual consistency).
  - Indian Rupee formatted price (e.g., `₹28,990`).
  - Stock badge: "In Stock (X remaining)" or red badge "Out of Stock".
  - Quick action: "Add to Cart" button (disabled if stock is 0) and "View Details" link.

#### 3. Product Details Page (`/products/:id`)
- **Image Showcase**: High-resolution image view with fallback image support.
- **Product Information**:
  - Full title, category tag, and comprehensive description.
  - Bold price in Indian Rupees (`₹`).
  - Real-time stock status indicator.
- **Quantity Selector**:
  - Minimum: 1.
  - Maximum: Available stock count in SQLite database.
  - Prevents increments beyond available inventory.
- **Call-to-Action**:
  - "Add to Cart" button with success toast or visual confirmation.

#### 4. Shopping Cart (`/cart`)
- **Itemized Table / Card List**:
  - Product thumbnail, title, unit price, quantity modifier (`-` / `+`), item subtotal, and "Remove" trash icon.
- **Cart Summary Card**:
  - Items count, Subtotal calculation, Shipping Fee ("FREE for all COD orders"), and Grand Total.
- **Actions**:
  - "Continue Shopping" button.
  - "Proceed to Checkout" button (redirects to `/login` if unauthenticated).
- **Empty State**:
  - Clean illustration or icon indicating an empty cart, with an intuitive "Explore Appliances" button.

#### 5. Checkout Page (`/checkout`)
- **Order Summary Sidebar**:
  - Concise list of items, quantities, and calculated total amount.
- **Shipping Address Form**:
  - Full Name (required)
  - 10-digit Phone Number (required, validated format)
  - Street Address / House No. (required)
  - City / Town (required)
  - 6-digit Pincode (required)
- **Payment Method**:
  - Strictly **Cash on Delivery (COD)**.
  - Highlighted badge explaining: *"Pay cash directly to the delivery partner upon arrival."*
- **Submission**:
  - Single-click "Place Order" button with loading state preventing double submission.

#### 6. Customer Orders History (`/my-orders`)
- Displays all historical orders placed by the currently authenticated user.
- **Order Card Attributes**:
  - Order reference ID (`#ORD-XXXX`).
  - Date and time of placement.
  - Order status badge with distinct color coding:
    - `Pending` (Amber/Yellow)
    - `Confirmed` (Blue)
    - `Shipped` (Indigo)
    - `Delivered` (Green)
    - `Cancelled` (Red)
  - Itemized list of products (name, quantity, purchase price).
  - Total order amount in INR.
  - Delivery destination address.

---

### 3.2 Authentication Pages

#### 1. Customer Registration (`/register`)
- Input fields: Full Name, Email Address, Password, Confirm Password.
- Client-side validation:
  - Email regex format check.
  - Password minimum 6 characters.
  - Password and confirm password exact match.
- Redirects to `/login` with success banner upon completion.

#### 2. User & Admin Login (`/login`)
- Single unified login form accepting Email and Password.
- Automatically handles routing upon token receipt:
  - If `role === 'admin'`: Redirects to `/admin`.
  - If `role === 'customer'`: Redirects to `/products` or previously intended route.

---

### 3.3 Admin Panel Pages

#### 1. Admin Dashboard (`/admin`)
- Accessible only to users with `role === "admin"`.
- Responsive layout featuring a fixed/collapsible left sidebar:
  - Dashboard
  - Categories
  - Products
  - Orders
  - Storefront Return Link
  - Logout
- Metric Cards:
  - Total Registered Categories
  - Total Products in Catalog
  - Total Customer Orders Received

#### 2. Category Management (`/admin/categories`)
- Add Category modal or inline form: Category Name, Description.
- Categories list table: ID, Name, Description, Actions (Edit, Delete).
- **Safety check**: Deletion is blocked or warns if active products reference the category.

#### 3. Product Catalog Management (`/admin/products`)
- Add / Edit Product modal or form:
  - Name
  - Description
  - Category (select dropdown populated from categories)
  - Price (numeric, > 0)
  - Stock (integer, ≥ 0)
  - Image URL (direct HTTPS link with preview)
- Products table with thumbnail, name, category, price, stock level, and Edit/Delete buttons.
- Delete requires explicit user confirmation.

#### 4. Order Management (`/admin/orders`)
- Table displaying all customer orders placed across the system.
- Columns: Order ID, Customer Name & Phone, Items Breakdown, Total Amount, Order Date, Status, Status Action.
- Status update dropdown allows switching between:
  - `Pending` → `Confirmed` → `Shipped` → `Delivered`
  - `Pending` → `Cancelled`

---

## 4. Business Logic & Integrity Constraints

### 4.1 Server-Side Price Verification (Zero Trust Policy)
1. The frontend never sends authoritative pricing for order creation.
2. The payload for `POST /api/orders` contains only:
   ```json
   {
     "items": [
       { "product_id": 1, "quantity": 2 },
       { "product_id": 4, "quantity": 1 }
     ],
     "shipping_name": "Jane Doe",
     "phone": "9876543210",
     "address": "42 MG Road",
     "city": "Bengaluru",
     "pincode": "560001"
   }
   ```
3. The Flask backend queries each `product_id` directly from `store.db`.
4. The backend computes:
   $$\text{Total Amount} = \sum (\text{db\_product.price} \times \text{item.quantity})$$
5. If any product is out of stock or does not exist, the entire transaction is rolled back with an informative HTTP 400 error.

### 4.2 Atomic Inventory Decrement
- Product stock is decremented within a database transaction when the order is successfully saved.
- If an order is marked `Cancelled` by the admin, inventory can safely be restored if configured.

---

## 5. Explicit Technology & Architectural Restrictions

To ensure simplicity, clean maintainability, and zero configuration friction:
- **NO Docker / Containers**: Standard virtual environment execution.
- **NO Microservices**: Single monolithic Flask REST API.
- **NO Payment Gateways**: Strictly Cash on Delivery.
- **NO Third-party Cloud Storage (S3 / Cloudinary)**: Products reference direct HTTPS image URLs.
- **NO Redis / Celery / Message Queues**: Direct synchronous processing.
- **NO Complex State Managers (Redux / MobX)**: Native React Context (`AuthContext` and `CartContext`).
- **NO GraphQL / WebSockets**: Clean REST API endpoints.
