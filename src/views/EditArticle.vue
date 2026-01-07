<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

const id = route.params.id

const title = ref("")
const content = ref("")
const date = ref("")
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch(
      `https://vittblog-backend-1.onrender.com/articles/${id}`
    )

    if (!res.ok) throw new Error("Artículo no encontrado")
    const article = await res.json()
    title.value = article.title
    content.value = article.content
    date.value = article.date
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

async function save() {
    const token = localStorage.getItem("token")
    if (!token && router.currentRoute.value.meta.requiresAuth) {
      router.push("/login")
    }
  const res = await fetch(
    `https://vittblog-backend-1.onrender.com/articles/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
        date: date.value
      })
    }
  )

  if (res.ok) {
    router.push("/")
  } else {
    error.value = "Error guardando cambios"
  }
}
</script>

<template>
  <section class="editor">
    <h1>Editar artículo</h1>

    <p v-if="loading">Cargando...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <form v-else @submit.prevent="save">
      <input v-model="title" placeholder="Título" />

      <textarea
        v-model="content"
        placeholder="Contenido"
        rows="10"
      />

      <input type="text" v-model="date" />

      <div class="actions">
        <button type="submit">Guardar</button>
        <button type="button" @click="router.back()">Cancelar</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.editor {
  max-width: 700px;
  margin: auto;
  padding: 2rem 1rem;
}

input,
textarea {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.8rem;
  border-radius: 10px;
  border: 1px solid #222;
  background: #121218;
  color: #eee;
}

.actions {
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
}

.error {
  color: #ff6b6b;
}
</style>
