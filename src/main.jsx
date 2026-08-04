import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  Home,
  Headphones,
  Speakers,
  Earphones,
  ProductPage,
  Checkout,
  Admin,
} from './pages'
import { AppProvider } from './context'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      { path: 'projectors', element: <Headphones></Headphones> },
      { path: 'speakers', element: <Speakers></Speakers> },
      { path: 'earphones', element: <Earphones></Earphones> },
      { path: 'product_detail/:id', element: <ProductPage></ProductPage> },
      { path: 'checkout', element: <Checkout></Checkout> },
      { path: 'admin', element: <Admin></Admin> },
    ],
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AppProvider>
      <RouterProvider router={router}></RouterProvider>
    </AppProvider>
  </>
)
