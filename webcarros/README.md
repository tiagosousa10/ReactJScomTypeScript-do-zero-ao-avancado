# WebCarros 🚗

A modern web platform for buying and selling vehicles, developed with React, TypeScript, and Firebase. The project offers a complete car listing management experience, with user authentication, image uploads, advanced search, and a responsive interface.

## 📋 Table of Contents

- [Features](#features)
- [Technologies and Libraries](#technologies-and-libraries)
- [Project Structure](#project-structure)
- [Application Flow](#application-flow)
- [Installation and Running](#installation-and-running)
- [Color Palette](#color-palette)

## ✨ Features

### For Visitors

- **Home Page**: Hero section with integrated search and filters
- **Advanced Search**: Search by car name, brand, and mileage
- **Car Browsing**: Responsive grid with image carousel
- **Vehicle Details**: Dedicated page with all information, images, and WhatsApp contact

### For Authenticated Users

- **Dashboard**: Complete management of your listings
- **Add Car**: Full form with multiple image uploads
- **Edit Listings**: Modify data and images
- **Delete Listings**: Complete removal with storage image cleanup

## 🛠 Technologies and Libraries

### Core

- **React 18.3.1**: Main library for building the interface
- **TypeScript 5.6.2**: Static typing for greater security and productivity
- **Vite 6.0.1**: Modern and fast build tool for development

### Routing

- **react-router-dom 6.28.0**: Routing system with protected routes

### Backend & Storage

- **Firebase 11.0.2**:
  - **Firestore**: NoSQL database for storing car information
  - **Authentication**: User authentication system
  - **Storage**: Storage for vehicle images

### UI Components

- **Shadcn UI**: Accessible and customizable components based on Radix UI:
  - `@radix-ui/react-dialog`: Modals and dialogs
  - `@radix-ui/react-popover`: Popovers
  - `@radix-ui/react-tabs`: Tab system
  - `@radix-ui/react-navigation-menu`: Navigation menu
  - `@radix-ui/react-label`: Form labels
  - `@radix-ui/react-slot`: Component composition system
- **Flowbite React 0.12.10**: Additional UI components (Footer)
- **Lucide React 0.548.0**: Modern and lightweight icons
- **React Icons 5.3.0**: Additional icon library

### Forms & Validation

- **React Hook Form 7.53.2**: Efficient form management
- **Zod 3.23.8**: TypeScript-first schema validation
- **@hookform/resolvers 3.9.1**: Integration between React Hook Form and Zod

### Styling

- **Tailwind CSS 3.4.15**: Utility-first CSS framework
- **tailwindcss-animate 1.0.7**: Animations for Tailwind
- **Autoprefixer**: Browser prefix support

### Carousel & Media

- **embla-carousel-react 8.6.0**: Modern and performant carousel (used by Shadcn Carousel)
- **Swiper 11.1.15**: Alternative carousel (registered in the project)

### Utilities

- **react-hot-toast 2.4.1**: Elegant toast notifications
- **clsx 2.1.1**: Utility for building conditional CSS classes
- **tailwind-merge 3.3.1**: Smart Tailwind class merging
- **class-variance-authority 0.7.1**: Component variant management
- **uuid 11.0.3**: Unique identifier generation
- **cmdk 1.1.1**: Command/combobox component
- **match-sorter 8.0.0**: Smart sorting and filtering
- **sort-by 1.2.0**: Sorting utility

### Development

- **ESLint**: Code linting
- **PostCSS**: CSS processing

## 📁 Project Structure

```
webcarros/
├── public/                 # Static files
├── src/
│   ├── assets/            # Images and resources
│   ├── components/        # Reusable components
│   │   ├── Container/     # Container component
│   │   ├── Footer/        # Application footer
│   │   ├── Header/        # Header with navigation
│   │   ├── Layout/        # Main layout
│   │   └── ui/            # Shadcn UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── combobox.tsx
│   │       ├── input.tsx
│   │       ├── tabs.tsx
│   │       └── ...
│   ├── contexts/          # React contexts
│   │   └── AuthContext.tsx  # Authentication context
│   ├── lib/               # Utilities
│   │   └── utils.ts      # Helper functions
│   ├── pages/            # Application pages
│   │   ├── Car/          # Vehicle details
│   │   ├── Dashboard/    # User dashboard
│   │   ├── Home/         # Home page
│   │   ├── Login/        # Login
│   │   └── Register/     # Registration
│   ├── routes/           # Route configuration
│   │   └── Private.tsx   # Protected route
│   ├── services/         # External services
│   │   └── firebaseConnection.ts  # Firebase configuration
│   ├── App.tsx           # Route configuration
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## 🔄 Application Flow

### 1. Authentication

```
User → Login/Register → Firebase Auth → AuthContext → Global State
```

- **AuthContext** manages authentication state globally
- Uses Firebase's `onAuthStateChanged` to monitor changes
- **Private** component protects routes that require authentication

### 2. Navigation

```
Layout (Header + Footer)
    ├── Home (/)
    ├── Car Detail (/car/:id)
    ├── Dashboard (/dashboard) [PROTECTED]
    ├── Login (/login)
    └── Register (/register)
```

### 3. Add Car Flow

```
Dashboard → Tabs (Add Car)
    ↓
Form with Validation (Zod)
    ↓
Image Upload → Firebase Storage
    ↓
Save Data → Firestore
    ↓
Success Toast → Redirect
```

### 4. Home Search Flow

```
Home Page
    ↓
Text Input / Filters (Brand/Km)
    ↓
Firestore Query (where clauses)
    ↓
Local Filtering (JavaScript)
    ↓
Grid Rendering
```

### 5. Image Management

- **Upload**: Multiple images sent to Firebase Storage
- **Storage**: Each image receives a unique UUID
- **URLs**: Download URLs are saved in Firestore
- **Delete**: Images are removed from Storage when listing is deleted

### 6. Car Details

```
Car Grid → Click on Card
    ↓
Route /car/:id
    ↓
Firestore Search by ID
    ↓
Rendering:
    - Image Carousel
    - Details (price, year, km, city)
    - Description
    - WhatsApp Button (direct link)
```

## 🚀 Installation and Running

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Firebase account with configured project

### Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd webcarros
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Firebase**

   - Edit `src/services/firebaseConnection.ts`
   - Replace `firebaseConfig` with your Firebase credentials

4. **Run the project**

```bash
npm run dev
```

5. **Access in browser**

```
http://localhost:5173
```

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Generate production build
- `npm run preview`: Preview production build
- `npm run lint`: Run linter

## 🎨 Color Palette

The project uses a carefully selected color palette:

- **#D97D55** (Primary Accent): Earthy orange for main actions and highlights
- **#F4E9D7** (Background): Light beige for soft background
- **#B8C4A9** (Secondary Accent): Grayish-green for secondary components
- **#6FA4AF** (Navbar): Grayish-blue for navigation and important elements

### Color Application

- **Navbar**: `#6FA4AF`
- **Background**: `#F4E9D7` (defined in CSS)
- **Primary Buttons**: `#D97D55` with hover `#C86A42`
- **Borders and Cards**: `#B8C4A9` with hover `#D97D55`
- **Text**: `#6FA4AF` for titles, `#B8C4A9` for secondary text

## 📝 Technical Notes

- **Performance**: Use of `useCallback` and `useMemo` for re-render optimization
- **Accessibility**: Radix UI components follow WAI-ARIA standards
- **Responsiveness**: Mobile-first design with Tailwind CSS
- **Type Safety**: TypeScript ensures typing throughout the project
- **Validation**: Zod validates client data before submission

## 🤝 Contributing

This is a learning project. Feel free to suggest improvements or report issues.

## 📄 License

This project is for educational use.

---

Developed with ❤️ using React, TypeScript and Firebase
