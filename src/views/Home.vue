<script setup>
import { ref, onMounted,onBeforeMount } from "vue"
import ArticleCard from "../components/ArticlesCard.vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

const articles = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch("https://vittblog-backend.onrender.com/articles")
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
  await fetch(`https://vittblog-backend.onrender.com/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  articles.value = articles.value.filter(a => a.id !== id)
}

</script>

<template>
  <section class="container">
    <h1 class="title">📝 Mi Blog</h1>

    <p v-if="loading" class="status">Cargando artículos...</p>

    <p v-else-if="error" class="status error">{{ error }}</p>

    <div v-else-if="articles.length === 0" class="empty">
      <h2>📭 No hay artículos todavía</h2>
      <p>Estoy escribiendo algo bueno…</p>
    </div>

    <div v-else class="grid">
        <ArticleCard
            v-for="article in articles"
            :key="article.id"
            :article="article"
            @edit="editArticle"
            @delete="deleteArticle"
        />
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 2rem 1rem;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.grid {
  display: grid;
  gap: 1.5rem;
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
</style>
