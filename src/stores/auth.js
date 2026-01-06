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
