<script setup>
import { ref, onMounted,computed } from "vue"
import { useHead } from "@vueuse/head"
import BlogCard from "../components/BlogCard.vue"
import { refresh_token } from "../stores/auth"
import { useRouter, useRoute } from "vue-router"
import RecentsBlogs from "../components/RecentsBlogs.vue"
import SkeletonBlog from "../components/SkeletonBlog.vue"
const router = useRouter()
const route = useRoute()
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
useHead({
  title:  `Blogs | Vitt Blogs`,
  meta: [
    {
      name: "description",
      content: `Look all Blogs`
    }
  ]
})
onMounted(async () => {
  try {
    const res = await fetch("https://vittblog-backend-1.onrender.com/articles")
    articles.value = await res.json()
  } catch (err) {
    err.value = "Error cargando artículos"
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
  router.push(`${route.path}`)
}

</script>
<template>
  <section class="container">
    <header class="header-blogs">
      <div class="header-container">
        <div>
          <span class="mono-label">Actualizaciones en vivo</span>
          <h2>Tendencia</h2>
        </div>
          <a class="mono-label " href="#Blogs">
              Ver Blogs
              <span class="material-symbols-outlined text-xs transition-transform group-hover:translate-x-0.5">chevron_right</span>
          </a>
      </div>
    </header>
    <div v-if="loading" class="grid">
      <SkeletonBlog/>
    </div>
    <p v-else-if="error" class="status error">{{ error }}</p>
    <div v-else-if="articles.length === 0" class="empty">
      <h2>📭 No hay artículos todavía</h2>
      <p>Estoy escribiendo algo bueno…</p>
      <button v-if="isAdmin" class="new big" @click="goNew">
        Crear primer artículo
      </button>
    </div>
    <div v-else class="grid" id="posts">
      <BlogCard
        v-for="article in articles.slice(0,3)"
        :key="article.id"
        :article="article"
        :isError="isError"
        @edit="editArticle"
        @delete="deleteArticle"
        />
    </div>
    <section class="articles-section">
      <div class="section-header">
        <div>
          <span class="label">Nuevos Blogs</span>
          <h2>Blogs Recientes</h2>
        </div>
        <button class="icon-button">
          <span class="material-symbols-outlined">tune</span>
        </button>
      </div>
      <div class="articles-grid" id="Blogs">
        <RecentsBlogs 
        v-for="article in articles"
        :key="article.id"
        :article="article"
        :isError="isError"
        />
      </div>
      <div class="footer">
        <button class="load-more">ver Más Blogs</button>
      </div>
    </section>
  </section>
</template>

<style scoped>
.container {
  margin-top: 7.5rem;
}

.grid {
  display: grid;
  gap: 1.5vw;
  grid-template-columns: repeat(2, 1fr);
  width: 80vw;
  position: relative;
  overflow: hidden;
  margin: 2rem 0 ;
}
.grid > :nth-child(3n + 2) {
  width: 49.5vw;
  margin: 0;
}
.grid > :nth-child(3n + 3) {
  width: 29vw;
  margin: 0;
}
.grid > :nth-child(3n + 1) {
  grid-column: 1 / -1;
  width: 80vw;
  margin: 0;
}
.status {
  opacity: 0.7;
}

.error {
  color: var(--negative);
}

.empty {
  text-align: center;
  margin-top: 4rem;
  opacity: 0.8;
}
.header-blogs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 80vw;
  border-bottom: 1px solid #1f1f27;
}
.header-blogs .header-container{
  align-items: end;
  justify-content: space-between;
  border: #1f1f27;
  width: 100%;
  display: flex;
  padding-bottom: 1rem;
  box-sizing: content-box;
}
.mono-label{
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em; 
  color: var(--text);
  font-weight: 700; 
  margin-bottom: 0.25rem; 
  display: block;
  font-family: 'JetBrains Mono', monospace;
}
.header-blogs .header-container div h2{
  font-size: 1.875rem;
  line-height: 2.25rem; 
  font-weight: 700;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

.articles-section {
  max-width: 1200px;
  padding: 2rem 0;
  font-family: system-ui, sans-serif;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
}

.label {
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 700;
  color: #6366f1;
  display: block;
  margin-bottom: 4px;
}

.icon-button {
  border: 1px solid #e5e7eb;
  background: var(--bg-tr);
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
}
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
}

/* Footer */
.footer {
  display: flex;
  justify-content: center;
  margin: 4rem 0 2rem;
}

.load-more {
  padding: 12px 32px;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  background: var(--bg-tr2);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.load-more:hover {
  border-color: #6366f1;
  color: #6366f1;
}
@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}
.title span{
  color:  var(--accent);
}
.new {
  background: linear-gradient(135deg, #7aa2ff, #5f8dff);
  border: none;
  padding: .6rem 1.1rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
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
    margin-top:2rem ;
  }
  .grid{
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }
  .grid > :nth-child(3n + 2) {
    height: 300px;
    width: 80vw;
    margin: 0;
  }
  .grid > :nth-child(3n + 3) {
    height: 300px;
    width: 80vw;
    margin: 0;
  }
  .grid > :nth-child(3n + 1) {
    height: 300px;
    width: 80vw;
    margin: 0;
  }
}
</style>
