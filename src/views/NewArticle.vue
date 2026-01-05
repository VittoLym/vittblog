<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const title = ref("")
const content = ref("")
const date = ref("")
const loading = ref(false)
const error = ref("")
const router = useRouter()

async function submit() {
  error.value = ""

  if (!title.value || !content.value || !date.value) {
    error.value = "Todos los campos son obligatorios"
    return
  }

  loading.value = true

  console.log({
    title: title.value,
    content: content.value,
    date: date.value
  })

  saveArticle()
  setTimeout(() => {
    loading.value = false
    router.push("/")
  }, 600)
}

async function saveArticle(){
    const token = localStorage.getItem("token")
    if (!token && router.currentRoute.value.meta.requiresAuth) {
        router.push("/login")
    }
    const res = await fetch("https://vittblog-backend.onrender.com/articles",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
        date: date.value.toString()
      })
    })
}
</script>

<template>
  <section class="page">
    <form class="card" @submit.prevent="submit">
      <header class="header">
        <h1>✍️ Nuevo artículo</h1>
        <button type="button" class="cancel" @click="router.back()">
          Cancelar
        </button>
      </header>

      <div class="field">
        <label>Título</label>
        <input v-model="title" placeholder="Título del artículo" />
      </div>

      <div class="field">
        <label>Contenido</label>
        <textarea
          v-model="content"
          rows="8"
          placeholder="Escribí tu artículo..."
        />
      </div>

      <div class="field">
        <label>Fecha</label>
        <input type="date" v-model="date" />
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <footer class="actions">
        <button class="primary" :disabled="loading">
          {{ loading ? "Guardando..." : "Publicar" }}
        </button>
      </footer>
    </form>
  </section>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 4rem 1rem;
  background: #0f0f0f;
  color: #eaeaea;
}

.card {
  width: 100%;
  max-width: 680px;
  background: #161616;
  border-radius: 14px;
  padding: 2rem 2.2rem;
  box-shadow: 0 12px 30px rgba(0,0,0,.35);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.8rem;
}

h1 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 600;
}

.cancel {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: .9rem;
}

.cancel:hover {
  color: #bbb;
}

.field {
  margin-bottom: 1.3rem;
}

label {
  display: block;
  font-size: .75rem;
  color: #aaa;
  margin-bottom: .3rem;
}

input,
textarea {
  width: 100%;
  padding: .7rem .85rem;
  border-radius: 8px;
  border: 1px solid #222;
  background: #0e0e0e;
  color: #eaeaea;
  font-size: .95rem;
}

textarea {
  resize: vertical;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #7aa2ff;
}

.actions {
  margin-top: 1.8rem;
  display: flex;
  justify-content: flex-end;
}

.primary {
  background: #7aa2ff;
  border: none;
  padding: .6rem 1.4rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: .9rem;
  cursor: pointer;
}

.primary:hover {
  background: #6a92ee;
}

.primary:disabled {
  opacity: .6;
  cursor: not-allowed;
}

.error {
  margin-top: .8rem;
  color: #ff7a7a;
  font-size: .85rem;
}

</style>
