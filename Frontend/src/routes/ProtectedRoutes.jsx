import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
const ProtectedRoutes = ({children}) => {
    const { isLoggedIn } = useContext(AuthContext)
  return (
    <div>
       {isLoggedIn?children:<Navigate to='/login' />}
    </div>
  )
}

export default ProtectedRoutes
