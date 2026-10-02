# REST API Documentation

## 1. Overview & General Conventions

- **Base URL**: `http://localhost:5000/api`
- **Default Headers**:
  - `Content-Type: application/json`
  - `Accept: application/json`
- **Authentication**: JWT Bearer token passed in the `Authorization` header:
  ```http
  Authorization: Bearer <jwt_token>
  ```

---

## 2. Standardized Response Envelope

Every endpoint returns a consistent JSON envelope.

### 2.1 Success Response Schema
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

### 2.2 Error Response Schema
```json
{
  "success": false,
  "message": "Detailed error explanation",
  "errors": null
}
```

### 2.3 HTTP Status Codes Reference
| Status Code | Meaning | Usage Scenario |
|---|---|---|
| `200 OK` | Success | Successful GET, PUT, PATCH, or DELETE operation |
| `201 Created` | Resource Created | Successful POST registration, category, product, or order |
| `400 Bad Request` | Client Error | Missing required fields, invalid quantity, or insufficient stock |
| `401 Unauthorized` | Auth Required | Missing, expired, or invalid JWT token |
| `403 Forbidden` | Access Denied | Customer attempting to access Admin-only endpoints |
| `404 Not Found` | Resource Missing | Product, Category, or Order ID does not exist |
| `409 Conflict` | Unique Constraint | Duplicate email registration or existing category name |
| `500 Server Error` | Internal Failure | Unexpected exception handled safely by backend |

---

## 3. Authentication Endpoints

### 3.1 Register Customer
Create a new customer user account.

- **Method**: `POST`
- **Path**: `/api/auth/register`
- **Access**: Public

#### Request Body:
```json
{
  "name": "Rohan Sharma",
  "email": "rohan@example.com",
  "password": "Password123",
  "confirmPassword": "Password123"
}
```

#### Validation Rules:
- All fields are required.
- `email` must match a valid email format and be unique in the system.
- `password` must be at least 6 characters long.
- `password` and `confirmPassword` must be identical.

#### Response (`201 Created`):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 2,
      "name": "Rohan Sharma",
      "email": "rohan@example.com",
      "role": "customer"
    }
  }
}
```

---

### 3.2 Login
Authenticate an existing customer or administrator.

- **Method**: `POST`
- **Path**: `/api/auth/login`
- **Access**: Public

#### Request Body:
```json
{
  "email": "rohan@example.com",
  "password": "Password123"
}
```

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 2,
      "name": "Rohan Sharma",
      "email": "rohan@example.com",
      "role": "customer"
    }
  }
}
```

#### Error Response (`401 Unauthorized`):
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## 4. Category Endpoints

### 4.1 Get All Categories
List all available appliance categories.

- **Method**: `GET`
- **Path**: `/api/categories`
- **Access**: Public

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Refrigerators",
      "description": "Double door, single door, and smart inverter refrigerators."
    },
    {
      "id": 2,
      "name": "Washing Machines",
      "description": "Front-load, top-load, and semi-automatic washers."
    }
  ]
}
```

---

### 4.2 Create Category
Add a new appliance category.

- **Method**: `POST`
- **Path**: `/api/categories`
- **Access**: Admin only (`Authorization: Bearer <admin_token>`)

#### Request Body:
```json
{
  "name": "Air Purifiers",
  "description": "HEPA filter room air purifiers for clean indoor air."
}
```

#### Response (`201 Created`):
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "id": 6,
    "name": "Air Purifiers",
    "description": "HEPA filter room air purifiers for clean indoor air."
  }
}
```

---

### 4.3 Update Category
Edit an existing category.

- **Method**: `PUT`
- **Path**: `/api/categories/:id`
- **Access**: Admin only

#### Request Body:
```json
{
  "name": "Air Purifiers & Humidifiers",
  "description": "Air filtration and humidity control systems."
}
```

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": {
    "id": 6,
    "name": "Air Purifiers & Humidifiers",
    "description": "Air filtration and humidity control systems."
  }
}
```

---

### 4.4 Delete Category
Remove an appliance category. Deletion is blocked if active products reference the category.

- **Method**: `DELETE`
- **Path**: `/api/categories/:id`
- **Access**: Admin only

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

#### Error Response (`400 Bad Request`):
```json
{
  "success": false,
  "message": "Cannot delete category: 4 products are still assigned to this category."
}
```

---

## 5. Product Endpoints

### 5.1 Get Products (With Search & Filter)
Retrieve products list with optional category filter and name search query.

- **Method**: `GET`
- **Path**: `/api/products`
- **Query Parameters**:
  - `category` *(optional)*: Category name or Category ID.
  - `search` *(optional)*: Search term matching product name or description.
- **Access**: Public

#### Example Request:
```http
GET /api/products?category=Refrigerators&search=samsung
```

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Samsung 253L 3-Star Double Door Refrigerator",
      "description": "Digital Inverter Technology with Frost Free cooling.",
      "price": 28990.0,
      "image": "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&q=80",
      "category_id": 1,
      "category_name": "Refrigerators",
      "stock": 12,
      "created_at": "2026-10-01T10:00:00"
    }
  ]
}
```

---

### 5.2 Get Product by ID
Fetch full details for an individual product.

- **Method**: `GET`
- **Path**: `/api/products/:id`
- **Access**: Public

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": 1,
    "name": "Samsung 253L 3-Star Double Door Refrigerator",
    "description": "Digital Inverter Technology with Frost Free cooling.",
    "price": 28990.0,
    "image": "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&q=80",
    "category_id": 1,
    "category_name": "Refrigerators",
    "stock": 12,
    "created_at": "2026-10-01T10:00:00"
  }
}
```

---

### 5.3 Create Product
Add a new appliance to the store inventory.

- **Method**: `POST`
- **Path**: `/api/products`
- **Access**: Admin only

#### Request Body:
```json
{
  "name": "LG 32-Inch Smart HD Ready LED TV",
  "description": "Dynamic Color Enhancer with Active HDR.",
  "price": 14999.0,
  "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80",
  "category_id": 3,
  "stock": 10
}
```

#### Response (`201 Created`):
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 11,
    "name": "LG 32-Inch Smart HD Ready LED TV",
    "price": 14999.0,
    "stock": 10,
    "category_id": 3
  }
}
```

---

### 5.4 Update Product
Update details, price, or inventory count for an appliance.

- **Method**: `PUT`
- **Path**: `/api/products/:id`
- **Access**: Admin only

#### Request Body:
```json
{
  "name": "LG 32-Inch Smart HD Ready LED TV",
  "description": "Dynamic Color Enhancer with Active HDR and WebOS.",
  "price": 13999.0,
  "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80",
  "category_id": 3,
  "stock": 15
}
```

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": 11,
    "name": "LG 32-Inch Smart HD Ready LED TV",
    "price": 13999.0,
    "stock": 15
  }
}
```

---

### 5.5 Delete Product
Delete an appliance from the catalog.

- **Method**: `DELETE`
- **Path**: `/api/products/:id`
- **Access**: Admin only

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 6. Order Endpoints

### 6.1 Create Order (Cash on Delivery)
Places a customer order. The backend independently verifies product stock, deducts stock, and computes total amount using authoritative database pricing.

- **Method**: `POST`
- **Path**: `/api/orders`
- **Access**: Customer only (`Authorization: Bearer <customer_token>`)

#### Request Body:
```json
{
  "items": [
    {
      "product_id": 1,
      "quantity": 1
    },
    {
      "product_id": 7,
      "quantity": 2
    }
  ],
  "shipping_name": "Rohan Sharma",
  "phone": "9876543210",
  "address": "Flat 4B, Sky Heights, MG Road",
  "city": "Bengaluru",
  "pincode": "560001"
}
```

#### Response (`201 Created`):
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "order_id": 1,
    "total_amount": 35988.0,
    "status": "Pending",
    "payment_method": "Cash on Delivery",
    "created_at": "2026-10-02T13:30:00"
  }
}
```

#### Error Response (`400 Bad Request` - Stock Insufficient):
```json
{
  "success": false,
  "message": "Product 'Samsung 253L Refrigerator' only has 2 items left in stock."
}
```

---

### 6.2 Get Customer's Orders
Retrieves all orders placed by the currently logged-in customer.

- **Method**: `GET`
- **Path**: `/api/orders/my-orders`
- **Access**: Customer only

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "Orders retrieved successfully",
  "data": [
    {
      "id": 1,
      "total_amount": 35988.0,
      "status": "Pending",
      "shipping_name": "Rohan Sharma",
      "phone": "9876543210",
      "address": "Flat 4B, Sky Heights, MG Road",
      "city": "Bengaluru",
      "pincode": "560001",
      "created_at": "2026-10-02T13:30:00",
      "products": [
        {
          "product_id": 1,
          "name": "Samsung 253L 3-Star Double Door Refrigerator",
          "price": 28990.0,
          "quantity": 1,
          "subtotal": 28990.0,
          "image": "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&q=80"
        },
        {
          "product_id": 7,
          "name": "Philips 750W Mixer Grinder with 3 Jars",
          "price": 3499.0,
          "quantity": 2,
          "subtotal": 6998.0,
          "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&q=80"
        }
      ]
    }
  ]
}
```

---

## 7. Admin Endpoints

### 7.1 Get All Customer Orders
Retrieve every order placed across all customers for tracking and fulfillment.

- **Method**: `GET`
- **Path**: `/api/admin/orders`
- **Access**: Admin only

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "All orders retrieved successfully",
  "data": [
    {
      "id": 1,
      "user_name": "Rohan Sharma",
      "user_email": "rohan@example.com",
      "total_amount": 35988.0,
      "status": "Pending",
      "created_at": "2026-10-02T13:30:00",
      "shipping_name": "Rohan Sharma",
      "phone": "9876543210",
      "city": "Bengaluru",
      "products_count": 2
    }
  ]
}
```

---

### 7.2 Update Order Status
Change the fulfillment status of an order.

- **Method**: `PATCH`
- **Path**: `/api/admin/orders/:id/status`
- **Access**: Admin only

#### Request Body:
```json
{
  "status": "Confirmed"
}
```
*Allowed Status Values*: `Pending`, `Confirmed`, `Shipped`, `Delivered`, `Cancelled`.

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    "order_id": 1,
    "status": "Confirmed"
  }
}
```

---

### 7.3 Admin Dashboard Summary
Provides count summaries for dashboard metric cards.

- **Method**: `GET`
- **Path**: `/api/admin/dashboard`
- **Access**: Admin only

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "Dashboard statistics retrieved successfully",
  "data": {
    "total_categories": 5,
    "total_products": 10,
    "total_orders": 14,
    "total_revenue": 384500.0
  }
}
```
