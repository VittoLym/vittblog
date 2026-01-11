<script setup>
import { onMounted,ref,computed,watch,onUnmounted } from "vue";
import SkeletonBlog from "../components/SkeletonBlog.vue";
import BlogsContainer from "../components/BlogsContainer.vue"
const articles = ref([])
const loading = ref(false)
const currentIndex = ref(0)
const VISIBLE = 2
let interval
const visibleArticles = computed(() => {
  if (!articles.value.length) return []

  return Array.from({ length: VISIBLE }, (_, i) =>
    articles.value[(currentIndex.value + i) % articles.value.length]
  )
})
watch(articles, (newVal) => {
  if (!newVal.length) return

  interval = setInterval(() => {
    currentIndex.value =
      (currentIndex.value + VISIBLE) % newVal.length
  }, 4000)
})
onMounted(async () => {
  try {
    loading.value = true
    const res = await fetch("https://vittblog-backend-1.onrender.com/articles")
    articles.value = await res.json()
  } catch (err) {
    err.value = "Error cargando artículos"
  } finally {
    loading.value = false
  }
})
onUnmounted(() => clearInterval(interval))
</script>
<template>
  <div class="collection-skeleton"v-if="loading">
    <SkeletonBlog
      v-for="n in 3"
      :key="n"
    />
  </div>
  <div class="collection " v-else>
    <TransitionGroup name="blog-fade" tag="div" class="collection-inner">
      <section class="layout">
        <div class="hero">
            <span class="badge">Blog</span>
            <h1 class="logo" >Vitt<span>.</span>Blog | Desarrollo & Tecnología 💻🧠<br><span><s>(Y Pensamientos Intrusivos)</s></span></h1>
            <p>
                Artículos sobre desarrollo web, proyectos personales
                y aprendizajes del día a día como desarrollador.
            </p>
            <div class="actions">
                <router-link to="/blogs" class="primary link">Ver Blogs</router-link>
                <router-link class="primary link" to="/article/new" v-if="isLogged">+ Nuevo Blog</router-link>
            </div>
        </div>
      </section>
      <BlogsContainer
        v-for="article in visibleArticles"
        :key="article.id"
        :article="article"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.collection-skeleton{
  margin-top: 120px;
  margin-bottom: 70px;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  position: relative;
  min-height: 45vh;
  overflow: hidden;
  width: 80vw;
  height: 45vw;
}
.collection-skeleton > :first-child {
  grid-column: 1 / -1;
}
.collection{
  height: max-content;
  margin-top: 120px;
  margin-bottom: 70px;
  width: 80vw;
  overflow: hidden;
}
.collection-inner {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.collection-inner > :nth-child(3n + 1) {
  grid-column: 1 / -1;
}
.blog-fade-enter-active {
  transition: all 0.3s ease;
}

.blog-fade-leave-active{
  position: absolute;
}
.blog-fade-enter-active:nth-child(2) {
  transition-delay: 0.05s;
}
.blog-fade-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.blog-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.blog-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.blog-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
@media (max-width: 768px) {
  .collection{
    width: 100vw;
    height: max-content;
  }
  .collection-inner{
    gap: .5rem;
  }
}

.layout{
    display: flex;
    padding:0;
    justify-content: center;
    align-items: center ;
}
.logo{
    font-size: 1.5rem;
    padding: .25rem 0;
    font-weight: 700;
    letter-spacing: 0.5px;
    align-items: center;
    width: 90%;
    margin:0;
}
.logo span {
    color: var(--negative);
    font-size:1rem;
}
.hero {
  width: 100%;
  border-radius: 45px;
  padding: 2rem 1.5rem;
  backdrop-filter: blur(3px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  color: white;
  height: 45vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  background-color: rgba(101, 34, 153, 0.219);
}
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0,0,0,.75),
    rgba(0,0,0,.35),
    rgba(0,0,0,.1)
  );
  border-radius: 45px;
  z-index: 0;
}

.hero > * {
  position: relative;
  z-index: 1;
}
.badge {
  display: inline-block;
  padding: .25rem .7rem;
  border-radius: 45px;
  font-size: .7rem;
  letter-spacing: .05em;
  text-transform: uppercase;
  background: rgba(255,255,255,.06);
  color: var(--text);
  margin-bottom: .8rem;
}

.hero h2 {
  line-height: 1.1;
}

.hero p {
  font-size: 1rem;
  opacity: .8;
  text-overflow: ellipsis;
  height: 70px;
  width: 400px;
  overflow: hidden;
  margin: 0;
}

.actions {
  display: flex;
  gap: 1rem;
}
.add{
  background: linear-gradient(135deg, #7aa2ff, #5f8dff);
}
.add::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgb(255, 255, 255),
    transparent
  );
  transform: translateX(-100%);
  transition: transform .4s ease;
}
.primary {
  position: relative;
  overflow: hidden;
  color: var(--text);
  border-radius: 10px;
  font-weight: 600;
  padding: .7rem 1.4rem;
  text-decoration: none;
  width: max-content;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.primary::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,.08),
    transparent
  );
  transform: translateX(-100%);
  transition: transform .4s ease;
}

.primary:hover::before {
  transform: translateX(100%);
}
@media (max-width: 768px) {
  .layout {
    padding: 1rem .5rem;
    padding-bottom: 0;
    justify-content: start;
    max-width: 100vw;
  }
  .hero{
    max-width: 100vw;
    max-height: 300px;
    padding: 1rem .5rem;
    border-radius: 25px;
  }
  .hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(0,0,0,.75),
      rgba(0,0,0,.35),
      rgba(0,0,0,.1)
    );
    border-radius: 25px;
    z-index: 0;
  }
  .hero h1 {
    font-size: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 1rem;
  }
  .badge{
    margin-left: 1rem;
  }
  .hero p {
    margin-left: 1rem;
    width: 100%;
    font-size: .8rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .logo span s{
  font-size: .8rem;
  }
  .actions {
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .primary {
    text-align: center;
    border-radius: 25px;
    width: 130px;
    padding: 0;
  }
}
</style>
