# React with TypeScript - Course Projects

This repository contains all the projects developed during the "React with TypeScript - From Zero to Advanced" course. Each project demonstrates different concepts and techniques in React and TypeScript development.

---

## 📚 Projects Overview

### 1. **primeiro** - First React Project
**Description:** The initial project introducing basic React concepts and TypeScript integration.  
**Technologies:** React, TypeScript, Vite  
**Concepts:** Component basics, JSX, TypeScript fundamentals

---

### 2. **calculadora** - Calculator
**Description:** A simple calculator application built with React and TypeScript.  
**Technologies:** React, TypeScript, Vite  
**Concepts:** State management, event handling, basic calculations

---

### 3. **reactaula** - Phrase Generator
**Description:** An interactive phrase generator application that displays random phrases based on selected categories (Motivation, Good Morning, Good Night).  
**Technologies:** React, TypeScript, Vite  
**Concepts:** State management with `useState`, conditional rendering, array manipulation

---

### 4. **context** - React Context API Demo
**Description:** A demonstration of React Context API, featuring a school application with students component and global user context.  
**Technologies:** React, TypeScript, Vite  
**Concepts:** Context API, Provider pattern, global state management  
**Key Features:**
- User context provider
- Student management components
- Global state sharing

---

### 5. **rotas** - React Router Demo
**Description:** A project demonstrating React Router functionality with multiple pages and navigation.  
**Technologies:** React, TypeScript, Vite, React Router DOM  
**Concepts:** Client-side routing, route configuration, navigation between pages

---

### 6. **carrinho** - Shopping Cart
**Description:** A complete e-commerce shopping cart application with product listing, detail pages, and cart management.  
**Technologies:** React, TypeScript, Vite, React Router DOM, Axios, Tailwind CSS, React Hot Toast  
**Concepts:** 
- REST API integration (using json-server)
- Shopping cart state management
- Context API for cart operations
- Route protection
- Product filtering and sorting
**Key Features:**
- Product listing with search
- Product detail pages
- Shopping cart with add/remove functionality
- LocalStorage persistence
- Toast notifications

---

### 7. **criptoapp** - Cryptocurrency App
**Description:** A cryptocurrency tracking application with routing and navigation between different pages.  
**Technologies:** React, TypeScript, Vite, React Router DOM, React Icons  
**Concepts:** Multi-page routing, navigation, cryptocurrency data display  
**Key Features:**
- Home page
- Detail pages
- 404 Not Found page
- Navigation menu

---

### 8. **devlink** - Linktree Clone
**Description:** A Linktree-style application for managing and displaying social links, built with Firebase integration.  
**Technologies:** React, TypeScript, Vite, Firebase, React Router DOM, Tailwind CSS  
**Concepts:** 
- Firebase Firestore integration
- Authentication
- Protected routes
- Admin panel
**Key Features:**
- Public link page
- User authentication (login/register)
- Admin dashboard for link management
- Social media links integration
- Customizable link appearance (background and text colors)
- Firebase Storage for images

---

### 9. **webcarros** - Car Marketplace
**Description:** A comprehensive car marketplace platform for buying and selling vehicles, featuring full CRUD operations, authentication, and image management.  
**Technologies:** React, TypeScript, Vite, Firebase (Auth, Firestore, Storage), React Router DOM, Tailwind CSS, Shadcn UI, React Hook Form, Zod  
**Concepts:**
- Full-stack application architecture
- Firebase Authentication
- Cloud Storage for images
- Form validation with Zod
- Protected routes
- Advanced filtering and search
- Image carousel
- Responsive design
**Key Features:**
- User authentication (login/register)
- Dashboard for managing car listings
- Add, edit, and delete car listings
- Multiple image uploads
- Advanced search (by name, brand, mileage)
- Car detail pages with image galleries
- WhatsApp integration for contact
- Responsive mobile-first design

---

### 10. **exercicio-projeto-desafio-01** - Challenge Exercise
**Description:** An exercise/challenge project demonstrating specific React and TypeScript concepts.  
**Technologies:** React, TypeScript, Vite  
**Concepts:** Various React patterns and TypeScript features

---

## 🛠 Common Technologies

All projects use:
- **React 18.3.1+** - UI library
- **TypeScript 5.6.2** - Type safety
- **Vite** - Build tool and development server
- **ESLint** - Code linting

## 📦 Project-Specific Technologies

- **React Router DOM** - Client-side routing (rotas, carrinho, criptoapp, devlink, webcarros)
- **Tailwind CSS** - Utility-first CSS framework (carrinho, devlink, webcarros)
- **Firebase** - Backend services (devlink, webcarros)
- **Axios** - HTTP client (carrinho)
- **React Hook Form + Zod** - Form handling and validation (webcarros)
- **Shadcn UI** - UI component library (webcarros)

## 🚀 Running the Projects

Each project follows a similar structure:

```bash
# Navigate to project directory
cd <project-name>

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

Each project typically contains:
- `src/` - Source code
- `public/` - Static assets
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite configuration
- `README.md` - Project-specific documentation (if available)

## 🎯 Learning Path

The projects are organized to progressively teach:
1. Basic React and TypeScript concepts
2. State management (useState, Context API)
3. Routing and navigation
4. API integration
5. Authentication and protected routes
6. File uploads and cloud storage
7. Complex form handling and validation
8. Full-stack application architecture

## 📝 Notes

- Most projects include their own README files with specific documentation
- The `webcarros` project is the most comprehensive, demonstrating advanced React patterns
- Firebase projects require proper configuration before running
- All projects use modern React patterns and TypeScript best practices

---

**Course:** React with TypeScript - From Zero to Advanced  
**Purpose:** Educational - Learning React and TypeScript development

