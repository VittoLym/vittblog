<script setup>
import { ref, onMounted,computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { refresh_token } from "../stores/auth"
const route = useRoute()
const router = useRouter()
const id = route.params.id
const title = ref("")
const content = ref("")
const date = ref("")
const date_format= ref("")
const loading = ref(true)
const error = ref(null)
const imageUrl = ref("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80")
const showPreview = computed(() => {
  return imageUrl.value && imageUrl.value.startsWith("http")
})
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
    date_format.value = date.value.split("T")[0]
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
        date: date.value,
        image: imageUrl.value
      })
    }
  )
  if(res.staus == 401){
    refresh_token()
  }
  if (res.ok) {
    router.push("/")
  } else {
    error.value = "Error guardando cambios"
  }
}
</script>

<template>
  <section class="editor">
    <h1>Editar Blog</h1>

    <p v-if="loading">Cargando...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <form v-else @submit.prevent="save">
      <div class="field">
        <label>Título</label>
        <input v-model="title" placeholder="Título del artículo" />
      </div>
      <div class="field">
        <label>Imagen (URL)</label>
        <input
          v-model="imageUrl"
          type="url"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>
      <div v-if="showPreview" class="preview">
        <span>Previsualización</span>
        <img
          :src="imageUrl"
          alt="Preview"
          @error="imageUrl = ''"
        />
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
        <input type="text" v-model="date_format" />
      </div>

      <div class="actions">
        <button type="submit">Guardar</button>
        <button type="button" @click="router.back()">Cancelar</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
  .field input{
    margin: 0.4rem 0;
  }
  .preview {
  margin: .5rem 0;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
}

.preview span {
  display: block;
  font-size: .85rem;
  opacity: .7;
  margin-bottom: .5rem;
}

.preview img {
  width: 100%;
  max-height: 260px;
  object-fit: cover;
  border-radius: 10px;
}
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
  color: var(--text);
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

button {
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
}

.error {
  color: var(--negative);
}
</style>
