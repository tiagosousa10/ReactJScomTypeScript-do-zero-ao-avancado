# 🔗 DevLink

A modern and elegant application to create and manage a personalized link page (similar to Linktree), developed with React, TypeScript, and Firebase. Allows users to create a unique page with their important links and social networks.

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Application Flow](#-application-flow)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Available Scripts](#-available-scripts)
- [Application Pages](#-application-pages)
- [Main Components](#-main-components)

## 🎯 About the Project

DevLink is a web application that allows you to create a personalized page with your important links, such as projects, social networks, blogs, and more. The application offers:

- **Modern and responsive interface** with clean and elegant design
- **Secure authentication system** with Firebase
- **Link management** with customizable colors
- **Social media integration** (Facebook, Instagram, YouTube)
- **Admin panel** to manage content

## ✨ Features

- ✅ Email and password authentication system
- ✅ Create, edit, and delete personalized links
- ✅ Color customization (text and background) for each link
- ✅ Real-time preview of created links
- ✅ Social media link configuration
- ✅ Public page with elegant gradient and grainy texture
- ✅ Protected routes with authentication verification
- ✅ Responsive and modern interface
- ✅ Design with Tailwind CSS

## 🛠 Technologies Used

### Main Dependencies

- **[React](https://react.dev/)** (v18.3.1) - JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** (v5.6.2) - JavaScript superset with static typing
- **[React Router DOM](https://reactrouter.com/)** (v6.28.0) - Routing for React applications
- **[Firebase](https://firebase.google.com/)** (v11.0.2) - Backend-as-a-Service platform
  - Firebase Authentication - User authentication
  - Cloud Firestore - Real-time NoSQL database
- **[React Icons](https://react-icons.github.io/react-icons/)** (v5.3.0) - Icon library
- **[Vite](https://vitejs.dev/)** (v5.4.10) - Modern and fast build tool

### Development Dependencies

- **[Tailwind CSS](https://tailwindcss.com/)** (v3.4.15) - Utility-first CSS framework
- **[ESLint](https://eslint.org/)** - Linter for JavaScript/TypeScript
- **[PostCSS](https://postcss.org/)** - Tool for transforming CSS
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - Automatically adds CSS prefixes

## 📁 Project Structure

```
devlink/
├── public/                 # Public static files
├── src/
│   ├── components/         # Reusable components
│   │   ├── Header/         # Application header
│   │   ├── Input/          # Input component
│   │   └── Social/         # Social links component
│   ├── pages/              # Application pages
│   │   ├── admin/          # Admin panel
│   │   ├── error/          # 404 error page
│   │   ├── home/           # Main public page
│   │   ├── login/          # Login page
│   │   └── networks/       # Social media management
│   ├── routes/             # Routes and route protection
│   │   └── Private.tsx     # Private route component
│   ├── services/           # Services and configurations
│   │   └── firebaseConnection.ts  # Firebase configuration
│   ├── App.tsx             # Route configuration
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── package.json            # Project dependencies
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## 🔄 Application Flow

### 1. Public Page (Home)
- Users visit the home page (`/`)
- View links registered by the administrator
- Can access configured links and social networks

### 2. Authentication
- User accesses `/login`
- Logs in with email and password via Firebase Authentication
- After authentication, is redirected to the admin panel

### 3. Admin Panel

#### Links Page (`/admin`)
- **Create Links**: Add new links with name, URL, and custom colors
- **Preview**: View how the link will look before saving
- **List Links**: See all created links
- **Delete Links**: Remove unwanted links

#### Social Networks Page (`/admin/social`)
- Configure Facebook, Instagram, and YouTube links
- These links appear as icons on the public page

### 4. Route Protection
- Administrative routes (`/admin` and `/admin/social`) are protected
- The `Private` component verifies authentication:
  - If not authenticated → redirects to `/login`
  - If authenticated → allows access to content

### 5. Data Persistence
- Data stored in **Cloud Firestore** (Firebase)
- **Collection `links`**: Stores personalized links
- **Document `social/link`**: Stores social networks
- Real-time synchronization with `onSnapshot`

## 🚀 Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Firebase account (for backend configuration)

### Step by Step

1. **Clone the repository**
```bash
git clone <repository-url>
cd devlink
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**
   - Create a project in [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password) and Firestore
   - Copy the configuration credentials
   - Update the `src/services/firebaseConnection.ts` file with your credentials

4. **Run the project**
```bash
npm run dev
```

5. **Access the application**
   - Open `http://localhost:5173` in your browser

## ⚙️ Configuration

### Firebase

Edit `src/services/firebaseConnection.ts`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Firestore

Create the following collections in Firestore:

- **`links`**: To store links
  - Fields: `name`, `url`, `bg`, `color`, `created`
- **`social`**: For social networks
  - Document ID: `link`
  - Fields: `facebook`, `instagram`, `youtube`

## 📜 Available Scripts

```bash
# Development - starts development server
npm run dev

# Build - creates production build
npm run build

# Preview - previews production build
npm run preview

# Lint - checks code for errors
npm run lint
```

## 📄 Application Pages

### 🏠 Home (`/`)
- Main public page
- Displays all registered links
- Shows configured social network icons
- Background with elegant gradient and grainy texture

### 🔐 Login (`/login`)
- Authentication page
- Modern design with icons in fields
- Show/hide password functionality
- Redirects to `/admin` after successful login

### ⚙️ Admin (`/admin`)
- Admin panel to manage links
- Form to create new links
- Color selectors for customization
- List of all links with delete option

### 📱 Networks (`/admin/social`)
- Social network configuration
- Fields for Facebook, Instagram, and YouTube
- Automatic saving to Firestore

### ❌ Error (`/*`)
- 404 page for routes not found

## 🧩 Main Components

### Header
Navigation component used in administrative pages with:
- Navigation links (Home, Links, Social Networks)
- Logout button

### Private
Route protection component:
- Verifies authentication state
- Redirects to login if not authenticated
- Allows access if authenticated

### Input
Reusable input component with consistent styling.

### Social
Component to render social network links with icons.

## 🎨 Design

The project uses **Tailwind CSS** for styling, providing:

- Responsive and modern design
- Teal colors (#14b8a6) as main theme
- Gradients and textures for background
- Cards with elegant shadows and borders
- Smooth animations and transitions

## 📝 Data Structure

### Collection: `links`
```typescript
{
  id: string;
  name: string;        // Link name
  url: string;         // Destination URL
  bg: string;         // Background color (hex)
  color: string;      // Text color (hex)
  created: Timestamp; // Creation date
}
```

### Document: `social/link`
```typescript
{
  facebook: string;   // Facebook URL
  instagram: string;  // Instagram URL
  youtube: string;    // YouTube URL
}
```

## 🔒 Security

- Administrative routes protected by authentication
- Sensitive data stored securely in Firebase
- Frontend form validation
- Protection against unauthorized access

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

## 👤 Author

Developed by **Tiago Sousa**

---

**DevLink** - Connect with purpose ✨
