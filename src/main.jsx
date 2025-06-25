import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Routes'
import Arrow from './Components/Arrow/Arrow'
import AuthProvider from './Context/AuthProvider/AuthProvider'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
    <div>
        <AuthProvider>
            <RouterProvider router={router}>
            </RouterProvider>
            <Arrow></Arrow>
            <ToastContainer />
        </AuthProvider>
    </div>

)
