import AuthProvider from './context/AuthProvider'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from "sonner"
const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster />
    </AuthProvider>


  )
}

export default App
