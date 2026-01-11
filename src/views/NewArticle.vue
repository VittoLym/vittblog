<script setup>
import { ref,computed } from "vue"
import { useRouter } from "vue-router"
import { useHead } from "@vueuse/head"
import { refresh_token } from "../stores/auth"
const title = ref("")
const titleColor = ref("#ff6b6b")
const content = ref("")
const image = ref("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80")
const date = ref(new Date().toISOString())
const date_format = ref(date.value.split("T")[0])
const owner = ref("")
const loading = ref(false)
const error = ref("")
const router = useRouter()
const imageUrl = ref("")

const showPreview = computed(() => {
  return imageUrl.value && imageUrl.value.startsWith("http")
})

useHead({
  title:  "Nuevo | Vitt Blog",
  meta: [
    {
      name: "description",
      content: "no info yet"
    }
  ]
})

async function submit() {
  error.value = ""

  if (!title.value || !content.value || !date.value) {
    error.value = "Todos los campos son obligatorios"
    return
  }

  loading.value = true
  saveArticle()
}

async function saveArticle(){
    const token = localStorage.getItem("token")
    if (!token && router.currentRoute.value.meta.requiresAuth) {
        router.push("/login")
    }
    owner.value = localStorage.getItem("user")
    const res = await fetch("https://vittblog-backend-1.onrender.com/articles",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title.value,
        colorTitle:titleColor.value,
        content: content.value,
        date: date.value,
        owner: owner.value,
        image: imageUrl.value != '' ? imageUrl.value : image.value,
      })
    })
    
  if(res.staus == 401){
    refresh_token()
  }
    if(res.status !== 200){
      const data = await res.json()
      if(data?.error == 'Invalid token'){
        error.value = 'Session cerrada. Vuelva a iniciar sesión.'
        setTimeout(router.push(`/login`),2000)
      }
      error.value = 'Ha surgido un problema actualizando los datos.'
    }
    else{
      loading.value = false
      router.push("/")
    }
}
</script>

<template>
  <section class="page">
    <form class="card" @submit.prevent="submit">
      <header class="header-new">
        <h1>✍️ Nuevo artículo</h1>
        <button type="button" class="cancel" @click="router.back()">
          x
        </button>
      </header>
      <div class="field">
        <label>Título</label>
        <input v-model="title" placeholder="Título del artículo" class="title-form"/>
        <input
          type="color"
          v-model="titleColor"
          class="color-picker"
          title="Elegir color"
        />
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

      <p v-if="error" class="error">{{ error }}</p>

      <footer class="actions">
        <button class="link primary" :disabled="loading">
          {{ loading ? "Guardando..." : "Publicar" }}
        </button>
      </footer>
    </form>
  </section>
</template>

<style scoped>
.page {
  height: max-content;
  display: flex;
  justify-content: center;
  padding: 4rem 1rem;
  color: var(--text);
  margin-top: 7vh;
  width: 80vw;
}

.card {
  width: 100%;
  border-radius: 14px;
  padding: 2rem 2.2rem;
  border-radius: 45px;
  background: var(--bg-tr2);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.header-new {
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
  color: var(--muted);
  cursor: pointer;
  font-size: .9rem;
  height: 100%;
  width: max-content;
  font-size: 2rem;
  font-weight: bold;
}

.cancel:hover {
  color: var(--text);
}

.field {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.3rem;
  justify-content: space-between;
}

  .title-form{
    width: 95%;
  }
  .color-picker{
  width: 32px;
  height: 35px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  }
  .color-picker::-webkit-color-swatch {
    border-radius: 99px;
    border: 2px solid rgba(55, 0, 255, 0.473);
  }
label {
  display: block;
  font-size: .75rem;
  color: var(--text);
  margin-bottom: .3rem;
  width: 100%;
}

input,
textarea {
  width: 100%;
  padding: .7rem .85rem;
  border-radius: 8px;
  border: 1px solid #222;
  background: #0e0e0e;
  color: var(--text);
  font-size: .95rem;

}

textarea {
  resize: vertical;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent);
}

  .preview {
  margin-top: 1rem;
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

.actions {
  margin-top: 1.8rem;
  display: flex;
  justify-content: flex-end;
}

.primary {
  border: none;
  padding: .6rem 1.4rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: .9rem;
  cursor: pointer;
  width: max-content;
}
.link:disabled {
  opacity: .6;
  cursor: not-allowed;
}

.error {
  margin-top: .8rem;
  color: var(--negative);
  font-size: .85rem;
}
@media (max-width: 768px) {
  .page {
    margin-top: 10vh;
    height: 90%;
    padding: 2rem ;
    width: 100%;
  }

  .card {
    padding: 1.4rem 1.2rem;
    border-radius: 45px;
    display: flex;
    height: max-content;
    flex-direction: column;
    justify-content: start;
  }

  .header {
    flex-direction: row;
    align-items: center;
    gap: .6rem;
    justify-content: space-between;
    padding: .5rem 0;
  }

  h1 {
    font-size: 1.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cancel {
    align-self: center;
    font-size: .85rem;
    height: 100%;
  }

  label {
    font-size: .7rem;
  }
  .field{
    align-items: center;
    justify-content: space-between;
  }
  .title-form{
    width: 85%;
  }
  .color-picker{
  width: 32px;
  height: 35px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  }
  input,
  textarea {
    font-size: .9rem;
    padding: .65rem .75rem;
  }
  .preview{
    margin: 0;
  }
  .preview img {
    max-height: 200px;
  }

  .actions {
    justify-content: center;
    padding-top: 0;
    margin-bottom: .5rem;
  }

  .primary {
    width: 100%;
    padding: .75rem;
    font-size: .95rem;
    color: var(--text);
    border-radius: 45px;
  }
}

</style>
