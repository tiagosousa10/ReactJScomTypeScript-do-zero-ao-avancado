import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {router} from './App'
import {RouterProvider} from 'react-router-dom'

import CartProvider from './contexts/CartContext'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
    <RouterProvider  router={router} />
    </CartProvider>
  </StrictMode>,
)
