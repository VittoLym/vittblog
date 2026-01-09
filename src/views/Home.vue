<script setup>
import { ref, onMounted,computed } from "vue"
import ArticleCard from "../components/ArticlesCard.vue"
import { refresh_token } from "../stores/auth"
import { useRoute, useRouter } from "vue-router"
import BlogsContainer from "../components/BlogsContainer.vue"
import AddBlogMobile from "../components/AddBlogMobile.vue"

const router = useRouter()

const articles = ref([])
const loading = ref(true)
const error = ref(null)
const isError = ref(null)
const isAdmin = computed(() => {
  return !!localStorage.getItem("token")
})
function goNew() {
  router.push("/article/new")
}
onMounted(async () => {
  try {
    const res = await fetch("https://vittblog-backend-1.onrender.com/articles")
    articles.value = await res.json()
  } catch (err) {
    error.value = "Error cargando artículos"
  } finally {
    loading.value = false
  }
})

function editArticle(article) {
  router.push(`/article/edit/${article.id}`)
}

async function deleteArticle(id) {
  const token = localStorage.getItem("token")
  const res = await fetch(`https://vittblog-backend-1.onrender.com/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  if(res.staus == 401){
    refresh_token()
  }
  if(res.status !== 200){
    isError.value = {
      id: id,
      message: "No esta autorizado para realizar eso."
    }
    return
  }
  articles.value = articles.value.filter(a => a.id !== id)
}

</script>
<template>
  
  <BlogsContainer/>
  <section class="container">
    <header class="header">
      <h1 class="title">📝Vitt<span>.</span>Blog(s)</h1>
      <button
        v-if="isAdmin"
        class="new"
        @click="goNew"
      >
        + Nuevo artículo
      </button>
      <AddBlogMobile
      v-if="isAdmin"
      @click="goNew"
      />
    </header>
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Cargando Blogs...</p>
    </div>
    <p v-else-if="error" class="status error">{{ error }}</p>
    <div v-else-if="articles.length === 0" class="empty">
      <h2>📭 No hay artículos todavía</h2>
      <p>Estoy escribiendo algo bueno…</p>

      <button v-if="isAdmin" class="new big" @click="goNew">
        Crear primer artículo
      </button>
    </div>
    <div v-else class="grid">
      <ArticleCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
        :isError="isError"
        @edit="editArticle"
        @delete="deleteArticle"
      />
    </div>
  </section>
</template>

<style scoped>
.container {
  width: 80dvw;
  margin: auto;
  padding: 2rem 1rem;
}

.grid {
  display: grid;
  gap: 1.5rem;
  padding: 1.5rem 0;
}

.status {
  opacity: 0.7;
}

.error {
  color: #ff6b6b;
}

.empty {
  text-align: center;
  margin-top: 4rem;
  opacity: 0.8;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}
.title span{
  color:  #7c8cff;
}
.new {
  background: linear-gradient(135deg, #7aa2ff, #5f8dff);
  border: none;
  padding: .6rem 1.1rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}

.new.big {
  margin-top: 1.5rem;
}

.new:hover {
  opacity: .9;
}
.loading {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  opacity: 0.8;
}

.loading p {
  font-size: 1rem;
  letter-spacing: .5px;
}

/* Spinner */
.spinner {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid rgba(255,255,255,.15);
  border-top-color: #7aa2ff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@media (max-width: 768px){
  .title{
    font-size:1.5rem;
  }
  .new{
    display: none;
  }
  .container{
    padding: 2rem 0;
  }
}
</style>
