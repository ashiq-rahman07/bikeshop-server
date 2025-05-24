# 🚴‍♂️ Bike Shop Backend API

A robust, scalable, and modern backend API for the Bike Shop platform. Built with **Node.js**, **Express.js**, and **TypeScript**, this server powers all core features for the admin dashboard and customer-facing applications.

---

## 🚀 Features

- **User Authentication & Authorization** (JWT-based)
- **Product Management** (CRUD for bikes, gear, and product types)
- **Order Management** (create, update, track orders)
- **Payment Integration** (ShurjoPay plugin ready)
- **Image Uploads** (Cloudinary integration)
- **Role-based Access Control** (admin, customer, etc.)
- **Comprehensive Error Handling**
- **RESTful API Design**
- **TypeScript for type safety**
- **Modular, Scalable Project Structure**

---

## 🛠️ Tech Stack

- **Node.js** & **Express.js**
- **TypeScript**
- **MongoDB** & **Mongoose**
- **Cloudinary** (image hosting)
- **ShurjoPay** (payment gateway)
- **JWT** (authentication)
- **ESLint** (code quality)

---

## 📁 Project Structure

```
bikeshop-server/
├── src/
│   ├── app/           # Core app logic (config, errors, middlewares, modules, routes, utils)
│   ├── app.ts         # Express app setup
│   ├── server.ts      # Server entry point
├── package.json
├── tsconfig.json
└── ...
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/bike-shop-backend.git
cd bikeshop-server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SHURJOPAY_USERNAME=your_shurjopay_username
SHURJOPAY_PASSWORD=your_shurjopay_password
```

### 4. Start the Server
```bash
npm run dev
```

The server will run at [http://localhost:5000](http://localhost:5000)

---

## 📚 API Documentation

- All endpoints are RESTful and return JSON.
- Use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test endpoints.
- Example endpoints:
  - `POST /api/v1/auth/login`
  - `GET /api/v1/bikes`
  - `POST /api/v1/orders`
  - ...and more

---

## 🧑‍💻 Contributing

Contributions, issues, and feature requests are welcome! Please open an issue or submit a pull request.

---

## 📄 License

This project is [MIT](LICENSE) licensed.

---

## 🙏 Acknowledgements

- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [ShurjoPay](https://shurjopay.com.bd/)

---

> _Built with ❤️ by the Bike Shop Team_
