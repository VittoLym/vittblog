import { ref } from "vue"

export const isLogged = ref(!!localStorage.getItem("token"))

export function login(token) {
  localStorage.setItem("token", token)
  isLogged.value = true
}

export function logout() {
  localStorage.removeItem("token")
  isLogged.value = false
}
export async function refresh_token(){
  isLogged.value = false
  const token = localStorage.getItem("token")
  const user = localStorage.getItem('user')
  if(!token){
    return 'No Have Token'
  }
  const res = await fetch('https://vittblog-backend-1.onrender.com/auth/refresh',{
    method: "POST",
    body:{
      "username": user
    }
  })
  const data = await res.json()
  if(data?.token){
    localStorage.setItem("token",data.token)
  }
}