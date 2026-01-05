# DBees BabyShop - Frontend Documentation & Backend Integration Guide

Welcome to the DBees BabyShop E-commerce project. This document serves as a guide for the Backend and CMS developer to connect the existing React frontend to a live backend and dashboard.

## 🚀 Tech Stack

- **Frontend:** React 19 (Vite)
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Routing:** React Router 7
- **Notifications:** React Hot Toast
- **State Management:** React Context API (for Cart & Wishlist)

---

## 📂 Project Structure

- `src/components/`: Reusable UI components (Navbar, Footer, Product Cards, etc.)
- `src/pages/`: Main page views (Home, Shop, Product Details, Auth, etc.)
- `src/context/`: Global state management (Cart and Wishlist logic)
- `src/data/`: **CRITICAL** - Currently contains static `.js` files acting as a mock database. These need to be replaced with API calls.
- `src/hooks/`: Custom hooks (currently empty, good place for data fetching hooks).
- `public/`: Static assets like local images and logos.

---

## 🛠 Integration Points (Action Items)

### 1. Product & Category Data

Currently, products and categories are imported from `src/data/products.js` and `src/data/categories.js`.

- **Task:** Replace these imports with `useEffect` hooks or a data-fetching library (like TanStack Query) to fetch data from your API.
- **Key Pages:**
  - `src/pages/Home.jsx` (Featured/Trending products)
  - `src/pages/Shop.jsx` (All products with filtering)
  - `src/pages/Category.jsx` (Filtered by category/subcategory)
  - `src/pages/ProductDetails.jsx` (Fetch single product by ID)

### 2. Authentication (Auth)

The UI for Login and Signup is ready in `src/pages/auth/UserAuth.jsx`.

- **Task:** Connect the forms to your authentication backend (Firebase, Supabase, or custom JWT).
- **State:** Update the app to track `user` state and protect routes like `/profile`.
- **Profile:** `src/pages/profile/UserProfile.jsx` needs to display real user data and order history.

### 3. Cart & Wishlist Persistence

Logic is handled in `src/context/CartContext.jsx` using `localStorage`.

- **Task:** For logged-in users, sync the cart and wishlist with the backend database so they persist across devices.

### 4. Checkout & Orders

The checkout UI is in `src/pages/CartandCheckout.jsx`.

- **Task:**
  - Implement the "Place Order" logic to send order details (items, shipping, total) to the backend.
  - Integrate a payment gateway (Stripe, Paystack, etc.) if not already handled by the dashboard.
  - Redirect to `src/pages/OrderSuccess.jsx` upon successful payment.

### 5. CMS / Dashboard Integration

The following sections should be manageable via a dashboard:

- **Banners:** `src/components/NewArrivalsBanners.jsx` and Home page hero sections.
- **Testimonials:** `src/data/reviews.js` should be replaced with dynamic data from the CMS.
- **Categories:** The navigation menu in `src/components/Navbar.jsx` and `src/components/ShopCategories.jsx` should reflect categories created in the dashboard.

---

## 📡 Suggested API Endpoints

- `GET /api/products` - Fetch all products (with query params for filtering/sorting).
- `GET /api/products/:id` - Fetch single product details.
- `GET /api/categories` - Fetch category list for navigation.
- `POST /api/auth/register` - User registration.
- `POST /api/auth/login` - User login.
- `POST /api/orders` - Create a new order.
- `GET /api/user/orders` - Fetch order history for the logged-in user.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory to store your API base URL:

```env
VITE_API_URL=https://your-api-endpoint.com/api
```

Access it in the code using `import.meta.env.VITE_API_URL`.

---

## 📦 Development Commands

- `npm run dev`: Start development server.
- `npm run build`: Build for production.
- `npm run preview`: Preview the production build locally.

---

## 🎨 Design Notes

- The project uses **Tailwind CSS 4**. Custom colors like `babyBlue` and `babyPink` are defined in the CSS/Config.
- Ensure that any images uploaded via the CMS maintain a consistent aspect ratio (preferably 1:1 for products) to keep the UI clean.

If you have any questions regarding the component logic or styling, please refer to the comments within the `.jsx` files.
