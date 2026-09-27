import api from './api.js'

const signupApi = (data) =>{
    return api.post('/api/auth/register',data)
}

const loginApi = (data) =>{
    return api.post('/api/auth/login',data)
}

const logoutApi = () =>{
    return api.post('/api/auth/logout',{},{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("accessToken")}`
        },
        withCredentials:true
    })
}

const getMeApi = () => {
  return api.get("/api/auth/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  })
}


export default {signupApi, loginApi, getMeApi, logoutApi}