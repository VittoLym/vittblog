<script setup>
import { onBeforeMount,ref,computed } from "vue"
import { useRouter,useRoute } from "vue-router"
const route = useRoute()
const router = useRouter()
const id = route.params.id
const title = ref(null)
const content = ref("")
const date = ref(null)
const owner = ref(null)
const isLoading = ref(true)
const defaultImage = ref("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80")
const backgroundStyle = computed(() => ({
  background: `linear-gradient(
    rgba(0,0,0,0.65),
    rgba(0,0,0,0.85)
  ), url(${defaultImage.value})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}))
onBeforeMount(async () => {
  try {
    isLoading.value = true
    const res = await fetch(
        `https://vittblog-backend-1.onrender.com/articles/${id}`
    )
    if (!res.ok) throw new Error("Artículo no encontrado")
    const article = await res.json()
    title.value = article.title
    content.value = article.content
    date.value = article.date
    defaultImage.value = article.image
    owner.value = article.owner_name
    isLoading.value = false
  } catch (err) {
      console.log(err)
  }
})
</script>
<template>
<article class="post" :style="backgroundStyle">
    <div v-if="isLoading" class="loading-container">
      <div class="spinner">⏳</div>
      <p>Cargando artículo...</p>
    </div>
    <header class="post-header">
        <h1 class="title">{{ title }}</h1>
        <div class="meta">
          <span class="date">📅 {{ new Date(date).toLocaleDateString() }}</span>
          <span v-if="owner" class="separator">•</span>
          <span v-if="owner" class="owner">✍️ {{ owner }}</span>
        </div>
      </header>
    <section class="content">
        <p v-for="(paragraph, i) in content.split('\n')" :key="i">
            {{ paragraph }}
        </p>
    </section>
    <footer class="footer">
        <button class="back" @click="router.back()">
            ← Volver
        </button>
    </footer>
</article>
</template>

<style scoped>
  .loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}

.spinner {
  font-size: 3rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.post {
  color: #eaeaea;
  line-height: 1.75;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.post-header {
  margin-bottom: 3rem;
  width: 80vw;
}

.title {
  font-size: 2.8rem;
  line-height: 1.2;
}

.meta {
  display: flex;
  gap: 1rem;
  font-size: .85rem;
  opacity: .7;
}
.content{
  width: 80vw;
}
.content p {
  margin-bottom: 1.4rem;
  font-size: 1.05rem;

}

.footer {
  width: 100%;
  padding: 0;
  margin-top: 4rem;
}

.back {
  background: none;
  border: none;
  color: #7aa2ff;
  font-size: .95rem;
  cursor: pointer;
  padding: 2rem 3rem;
  transition: all ease .25s;
  height: 100%;
  width: 100%;

}

.back:hover {
  text-decoration: underline;
  background-color: #7aa2ff44;
  color: #eaeaea;
}
.post {
  animation: fade .4s ease;
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 768px) {
  .post {
    padding: 1.5rem 0;
    justify-content: space-between;
    height: max-content;
  }

  .post-header {
    width: 92vw;
    margin: 0;
  }

.title {
  font-size: 2.6rem;
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 1.2rem;
  letter-spacing: -0.5px;
  text-align: center;
}

.meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .6rem;
  font-size: .85rem;
  color: rgba(255,255,255,.7);
}

.meta span {
  display: flex;
  align-items: center;
  gap: .25rem;
}

.separator {
  opacity: .5;
}
.content {
    width: 92vw;
    background: rgba(0,0,0,.35);
    padding: 1.2rem;
    border-radius: 12px;
    height: 500px;
    overflow: auto;
  }

  .content p {
    font-size: 1rem;
    line-height: 1.7;
  }

  .footer {
    margin-top: 2.5rem;
  }

  .back {
    padding: 1.2rem;
    font-size: .95rem;
  }
}

</style>