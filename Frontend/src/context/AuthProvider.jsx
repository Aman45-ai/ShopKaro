
import { useState } from 'react'
import { AuthContext } from './AuthContext'

const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken')|| null)
    const isLoggedIn = !!accessToken
  return (
    <AuthContext.Provider value={{accessToken, setAccessToken, isLoggedIn}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
