import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './assets/all.scss'
import 'bootstrap'
import { createHashRouter, RouterProvider } from 'react-router'
import routes from './routes/index'


const router = createHashRouter(routes)


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
