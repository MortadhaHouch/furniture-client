## 🎨 Frontend

The frontend is built using **Next.js** with a modern UI design, integrating **Tailwind CSS, Radix UI, and animations** for a seamless user experience.

### 🛠️ Technologies

- **Framework:** Next.js
- **Styling:** Tailwind CSS, Next-Themes
- **UI Components:** Radix UI, Lucide React, Swiper
- **State Management:** React Context API
- **Animations & Effects:** Lenis (smooth scrolling), Lottie React, Motion
- **Cookies Management:** React Cookie

#### 📂 Frontend Pages

##### 🔐 Authentication

- `GET /login` - User login page
- `GET /signup` - User registration page

##### 🛍️ Shopping Experience

- `GET /produits` - Browse all available furniture
- `GET /tendances` - View trending furniture products

##### 📊 Dashboard (User/Admin/Super Admin)

- `GET /dashboard` - Main dashboard overview
- `GET /dashboard/categories/:id` - Manage furniture categories
- `GET /dashboard/commandes/:id` - View and manage orders
- `GET /dashboard/messages` - Manage user/admin messages
- `GET /dashboard/notifications` - Manage notifications
- `GET /dashboard/profil` - User profile management
- `GET /dashboard/settings` - Configure account settings
- `GET /dashboard/utilisateurs/:id` - Manage users (Admin only)

---

## 🚀 Setup & Installation

### 🏗️ Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/furniture-ecommerce.git
   cd furniture-ecommerce/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables in `.env`:
   ```env
   SECRET_KEY=your_secret_key
   MONGO_URI=your_mongodb_uri
   PORT=5000
   ```
4. Start the server:
   ```sh
   npm start
   ```

### 🌐 Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Next.js development server:
   ```sh
   npm run dev
   ```
4. Open in browser: [http://localhost:3000](http://localhost:3000)

---

## 📌 Features

✅ User authentication with JWT cookies\
✅ Product browsing, filtering, and searching\
✅ Secure checkout and order processing\
✅ Admin panel for managing products, orders, users, and categories\
✅ Notifications and messaging system\
✅ Smooth UI animations and modern design

---

## 🛠️ Future Enhancements

- 📦 **Wishlist & Favorites** - Allow users to save favorite furniture
- 🚚 **Real-time Order Tracking** - Live updates on delivery status
- 🏷️ **Discounts & Promotions** - Implement discount coupons
- 🔍 **Advanced Search & Filters** - Improve product discovery
- 📊 **Sales Analytics Dashboard** - Admin insights into business trends

---

## 🏆 Contributors

💡 Developed by **[Your Name/Team]**

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📞 Contact

For inquiries, support, or collaboration, reach out at: 📧 Email: [your.email@example.com](mailto\:your.email@example.com)\
🌐 Website: [yourwebsite.com](https://yourwebsite.com)

