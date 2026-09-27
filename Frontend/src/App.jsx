import AuthProvider from './context/AuthProvider'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from "sonner"
const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast: "rounded-xl border bg-white shadow-lg",
            title: "font-semibold",
            description: "text-sm",
            success: "border-emerald-200 text-emerald-800",
            error: "border-red-200 text-red-700",
          },
        }}
      />
    </AuthProvider>


  )
}

export default App
