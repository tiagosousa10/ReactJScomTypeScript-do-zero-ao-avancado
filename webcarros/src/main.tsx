import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {router} from './App'

import { RouterProvider} from 'react-router-dom'
import AuthProvider from './contexts/AuthContext'

import {register} from 'swiper/element/bundle'
register()
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <AuthProvider>
    <RouterProvider  router={router} />
    </AuthProvider>
    
  </StrictMode>,
)
