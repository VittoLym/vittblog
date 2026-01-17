<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useHead } from "@vueuse/head"
import { login } from "../stores/auth"

const username = ref("")
const password = ref("")
const error = ref("")
const router = useRouter()

async function onLogin() {
  try {
    const res = await fetch("https://vittblog-backend-1.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    const data = await res.json()
    if (!res.ok) {
      error.value = data.error
      return
    }

    login(data.token)
    localStorage.setItem("user",username.value)
    router.push("/")
  } catch {
    error.value = "Server error"
  }
}

useHead({
  title:  `Login | Vitt Blog`,
  meta: [
    {
      name: "description",
      content: `Login to see all blogs`
    }
  ]
})
</script>
<template>
  <div class="login-page">
    <form class="login-card" @submit.prevent="onLogin">
      <h1>Login</h1>
      <p class="subtitle">Acceso privado</p>

      <div class="field">
        <label>Usuario</label>
        <input v-model="username" placeholder="Usuario" />
      </div>

      <div class="field">
        <label>Contraseña</label>
        <input
          v-model="password"
          type="password"
          placeholder="••••••••"
        />
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <button :disabled="loading">
        {{ loading ? "Ingresando..." : "Ingresar" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  color: var(--text);
}

.login-card {
  width: 100%;
  max-width: 380px;
  padding: 2.5rem;
  border-radius: 18px;
  background: rgba(255,255,255,.05);
  backdrop-filter: blur(12px);
  box-shadow: 0 40px 80px rgba(0,0,0,.6);
}

h1 {
  margin: 0;
  font-size: 1.8rem;
}

.subtitle {
  opacity: .6;
  margin-bottom: 2rem;
}

.field {
  margin-bottom: 1.2rem;
}

label {
  font-size: .8rem;
  opacity: .6;
}

input {
  width: 100%;
  margin-top: .3rem;
  padding: .8rem 1rem;
  border-radius: 10px;
  border: none;
  background: #111;
  color: var(--text);
  outline: none;
}

input:focus {
  box-shadow: 0 0 0 2px #7aa2ff;
}

button {
  width: 100%;
  margin-top: 1rem;
  padding: .9rem;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #7aa2ff, #5f8dff);
  color: var(--bg);
  font-weight: 600;
  cursor: pointer;
}

button:disabled {
  opacity: .6;
  cursor: not-allowed;
}

.error {
  margin-top: .8rem;
  color: var(--negative);
  font-size: .85rem;
}
.login-card {
  animation: fadeUp .6s ease;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>
