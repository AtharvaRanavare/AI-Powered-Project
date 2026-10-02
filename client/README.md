# QuickCart - E-Commerce Frontend (Phases 8 - 12)

A fast, modern React + Vite + Tailwind CSS storefront with customer authentication, product catalog browsing, persistent shopping cart with stock limits, Cash on Delivery (COD) checkout, and order history tracking.

---

## 🚀 Features & Completed Phases

### Phase 8: Frontend Setup & Styling
- **Vite + React (ESM)** configuration.
- **Tailwind CSS & PostCSS** integration for responsive styling.
- **React Router DOM v7** setup for SPA routing.
- **Axios** client configured with base URL and authorization interceptors.
- **Lucide Icons** integration.
- `.env.example` and `.env` configured with `VITE_API_URL=http://localhost:5000/api`.

### Phase 9: Authentication & State Management
- `services/api.js`: Centralized Axios instance attaching `Bearer` JWT from `localStorage`.
- `services/authService.js`: Handles `login`, `register`, `getProfile`, and `logout`.
- `context/AuthContext.jsx`: Provides persistent user session with `localStorage` fallback.
- `components/ProtectedRoute.jsx`: Protects customer and admin routes with graceful redirects.
- `pages/Login.jsx` & `pages/Register.jsx`: Form validation, error alerts, and one-click demo credentials fill.

### Phase 10: Product Catalog & Navigation
- `components/Navbar.jsx`: Responsive navigation with live cart badge counter, user profile dropdown, and mobile drawer.
- `components/Footer.jsx`: Value proposition badges, quick links, category navigation, and COD guarantee note.
- `components/ProductCard.jsx`: Stock status indicators ("In Stock", "Low Stock", "Out of Stock"), INR pricing (`₹`), and Add to Cart action.
- `pages/Home.jsx`: Eye-catching Hero banner, Popular Categories grid, and Featured Products section.
- `pages/Products.jsx`: Instant live search bar, category filter buttons, sort options (Price, Rating, In-Stock), and empty states.
- `pages/ProductDetails.jsx`: Large preview, breadcrumbs, specifications, and a **strict quantity selector limited to available stock**.

### Phase 11: Shopping Cart & Checkout
- `context/CartContext.jsx`: Full cart state synchronized with `localStorage` across page reloads.
- Stock limits enforced on add and increment.
- `pages/Cart.jsx`: Quantity increment/decrement, item removal, INR subtotal/totals, and prominent Cash on Delivery notice.
- `pages/Checkout.jsx`: Shipping address form (Name, 10-digit Phone, Street, City, State, 6-digit Pincode) and Cash on Delivery order confirmation.
- Submitting checkout **clears the cart** and redirects to `/my-orders`.

### Phase 12: Customer Order History
- `services/orderService.js`: Manages order placement and retrieval with local storage persistence fallback.
- `pages/MyOrders.jsx`: Displays itemized order cards with date formatting, colored status badges (`Pending`, `Processing`, `Shipped`, `Delivered`), and shipping summary.

---

## 🛠️ Development & Build Commands

Inside `client/`:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run acceptance criteria test suite
node test-acceptance.js
```
