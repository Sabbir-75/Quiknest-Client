import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Routes'
import Arrow from './Components/Arrow/Arrow'
import AuthProvider from './Context/AuthProvider/AuthProvider'
import { ToastContainer } from 'react-toastify'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(

    <div>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router}>
                </RouterProvider>
                <Arrow></Arrow>
                <ToastContainer />
            </AuthProvider>
        </QueryClientProvider>

    </div>

)
