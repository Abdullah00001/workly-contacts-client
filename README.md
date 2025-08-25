# 📇 Workly Contacts – Client

**Workly Contacts** is a feature-rich, user-friendly contact management web application built to help users securely store, manage, and interact with their personal or professional contact lists. This is the **client-side (frontend)** codebase built with modern web technologies and connected to a scalable backend.

---

## 🚀 Features

- 🔐 **Authentication & Authorization** – Signup, Login, Logout
- 👤 **Contact CRUD** – Create, view, update, delete contacts
- 🗃️ **Bulk Operations** – Trash, recover, and permanently delete multiple contacts
- 📌 **Favorites** – Mark important contacts
- 🔍 **Search** – By name or email
- 📅 **Birthday & Profile Details**
- 🗑️ **Trash Management** – Recover or delete contacts forever
- 💬 **Feedback Form** – User feedback submission
- 🛡️ **Static Legal Pages** – Privacy Policy, Terms of Service
- 🎯 **Landing Page** – Shown to unauthenticated users
- 📱 **Fully Responsive** – Mobile & tablet-friendly

---

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **React Router v7** – For navigation
- **Tailwind CSS v4** – For styling
- **Axios** – For API communication
- **TanStack Query** – For server state management
- **Framer Motion** – For animations
- **Lucide React** & **React Icons** – For icons
- **Zod** – For form validation
- **React Toastify** – For notifications
- **React Spinners** – For loading states
- **Cloudinary** – For image management
- **Crypto-JS** – For encryption
- **JWT Decode** – For token handling
- **JS Cookie** – For cookie management

# 📦 Getting Started

## Prerequisites

- Node.js >= 18
- npm or yarn

## Installation

```bash
git clone https://github.com/your-username/amar-contact-client.git
cd amar-contact-client
npm install
```

## 🚀 Run Locally

```bash
npm run dev
```

The app will be available at [http://localhost:5173/](http://localhost:5173/) (or the Vite port you use).

## 🌐 Environment Variables

Create a `.env` file in the root and define:

```env
# Base URL for the backend API (development)
VITE_API_BASE_URL=http://localhost:5000/api/v1

# Uncomment and set this to your production backend URL when deploying
# VITE_API_BASE_URL=https://your-production-backend.com/api/v1

# OTP length used in the app (e.g., 4, 6)
VITE_OTP_LENGTH=6

# Very useful encryption (VU_E) secret key for CryptoJS (must match backend)
VITE_VU_E_SECRET=your-secret-key
```

## 📂 Project Structure

### `src/`

```
src/
├── apis/             # API service layer
├── assets/           # Images and static files
├── components/       # Reusable UI components
├── configs/          # Configuration files
├── constants/        # Application constants
├── contexts/         # React context providers
├── hooks/            # Custom React hooks
├── interfaces/       # TypeScript interfaces
├── layouts/          # Layout components
├── pages/            # Page-level components
├── providers/        # App providers
├── routes/           # Route definitions
├── schemas/          # Validation schemas
├── services/         # Business logic services
├── utils/            # Utility functions
├── App.css           # Global styles
├── App.tsx           # Main app entry point
├── index.css         # Base styles
└── main.tsx          # React app entry point
```

### `root/`

```
Root Files:
├── .dockerignore
├── .env              # Environment variables
├── .eslintignore
├── .gitignore
├── .prettierrc
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── Dockerfile
├── LICENSE
├── README.md
├── SECURITY.md
├── eslint.config.js
├── index.html
├── nginx.conf
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

## 🎯 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier

# Type Checking
npm run type-check   # Run TypeScript type checking
```

## 📋 Key Dependencies

### 🧩 Core

- **React 19** – Latest React version with concurrent features
- **TypeScript** – Type safety and better developer experience
- **Vite** – Fast build tool and dev server

### 🔀 Routing & State

- **React Router DOM v7** – Client-side routing
- **TanStack Query** – Server state management and caching

### 🎨 Styling & UI

- **Tailwind CSS v4** – Utility-first CSS framework
- **Framer Motion** – Animation library
- **Lucide React** – Beautiful icons
- **React Icons** – Icon library

### 🧾 Forms & Validation

- **Zod** – TypeScript-first schema validation
- **React Toastify** – Toast notifications

### 🛠️ Utilities

- **Axios** – HTTP client
- **Crypto-JS** – Encryption utilities
- **JWT Decode** – JWT token decoding
- **JS Cookie** – Cookie management

## ✅ Roadmap

- [x] Contact CRUD
- [x] Favorites
- [x] Trash & Recovery
- [x] Search
- [x] Landing Page
- [x] Feedback Form
- [ ] Import/Export CSV
- [ ] Chat Feature (Socket.io)
- [ ] Merge Duplicate Contacts
- [ ] Label Support
- [ ] Advanced Filtering & Sorting
- [ ] Last Login Info
- [ ] Password Change History

## 🚀 Deployment

### 🔧 Vercel

The project includes a `vercel.json` file for easy deployment to [Vercel](https://vercel.com/).

## 🔒 Security

Please review our **Security Policy** for reporting security vulnerabilities.

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.

---

## 👨‍💻 Author

Built with ❤️ by **Abdullah Bin Omar Chowdhury**
