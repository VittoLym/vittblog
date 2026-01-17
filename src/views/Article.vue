<script setup>
import { ref,computed,onMounted } from "vue"
import { useRouter,useRoute } from "vue-router"
import { useHead } from "@vueuse/head"
const route = useRoute()
const router = useRouter()
const id = route.params.id
const title = ref(null)
const content = ref("")
const date = ref(null)
const owner = ref(null)
const isLoading = ref(true)
const defaultImage = ref(null)
const imageLoaded = ref(false)
const backgroundStyle = computed(() => ({
  background: imageLoaded.value
    ? `linear-gradient(
        rgba(0,0,0,0.65),
        rgba(0,0,0,0.85)
      ), url(${defaultImage.value})`
    : `linear-gradient(
        rgba(0,0,0,0.75),
        rgba(0,0,0,0.9)
      )`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}))
onMounted(async() => {
  
  try {
    isLoading.value = true
    imageLoaded.value = false
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
    
    imageLoaded.value =true ? article.image !== '': false
  } catch (err) {
      console.log(err)
  }
  useHead({
    title:  `${title.value}`,
    meta: [
      {
        name: "description",
        content: `${content.value} | ${owner.value} | ${date.value}`
      }
    ]
  })
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
})
</script>
<template>
  <article v-if="isLoading" class="skeleton-post" :style="backgroundStyle">
    <header class="post-header-skeleton">
      <h1 class="skeleton-title"></h1>

      <div class="meta">
        <span class="skeleton-meta"></span>
        <span class="skeleton-meta"></span>
      </div>
    </header>

    <section class="skeleton-content">
      <p class="skeleton-line"></p>
      <p class="skeleton-line"></p>
      <p class="skeleton-line short"></p>
      <p class="skeleton-line tiny"></p>
    </section>

    <footer class="footer">
      <button class="back" disabled>
        ← Volver
      </button>
    </footer>
  </article>
  <article v-else class="post" :style="backgroundStyle">
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
.skeleton-post{
  color: var(--text);
  line-height: 1.75;
  width: 100%;
  min-height: 90dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.skeleton-content {
    width: 92vw;
    background: rgba(0,0,0,.35);
    padding: 1.2rem;
    border-radius: 12px;
    height: 300px;
    overflow: auto;
}
.skeleton-title,
.skeleton-line,
.skeleton-meta {
  position: relative;
  overflow: hidden;
  background: #1c1c22;
  border-radius: 6px;
}

/* shimmer */
.skeleton-title::after,
.skeleton-line::after,
.skeleton-meta::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.08),
    transparent
  );
  animation: shimmer 1.3s infinite;
}

/* ===== Title ===== */
.skeleton-title {
  height: 3rem;
  width: 65%;
  margin-bottom: 1rem;
}

/* ===== Meta ===== */
.post-header-skeleton .meta {
  display: flex;
  gap: 1rem;
}

.skeleton-meta {
  height: 0.9rem;
  width: 120px;
}

/* ===== Content ===== */
.skeleton-line {
  height: 1rem;
  width: 100%;
  margin-bottom: 0.8rem;
}

.skeleton-line.short {
  width: 75%;
}

.skeleton-line.tiny {
  width: 55%;
}

/* ===== Animation ===== */
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
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
  color: var(--text);
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
  color: var(--negative);
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
  color: var(--text);
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
  color: var(--text);
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