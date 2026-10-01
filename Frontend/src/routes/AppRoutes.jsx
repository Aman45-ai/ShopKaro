import { Route, Routes } from 'react-router-dom'
import HomePage from '../components/HomePage'
import LoginPage from '../components/LoginPage'
import SignupPage from '../components/SignupPage'
import AddProductPage from '../components/AddProductPage'
import ProtectedRoutes from './ProtectedRoutes'
import CartPage from '../components/CartPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={
        <ProtectedRoutes>
          <HomePage />
        </ProtectedRoutes>
      } />
      <Route path='/add-product' element={
        <ProtectedRoutes>
          <AddProductPage />
        </ProtectedRoutes>
      } />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path="/cart" element={
        <ProtectedRoutes>
          <CartPage />
        </ProtectedRoutes>
      } />

    </Routes>
  )
}

export default AppRoutes
