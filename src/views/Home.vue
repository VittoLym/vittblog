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
  }, 3000)
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
      <BlogsContainer/>
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
  min-height: 45dvh;
  overflow: hidden;
  width: 80vw;
  height: 45vw;
}
.collection-skeleton > :first-child {
  grid-column: 1 / -1;
}
.collection{
  overflow: auto;
  height: max-content;
  margin-top: 120px;
  margin-bottom: 70px;
  width: 80vw;
  height: 45vw;
  overflow: hidden;
}
.collection-inner {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  position: relative;
  min-height: 45dvh;
  overflow: hidden;
}
.collection-inner > :first-child {
  grid-column: 1 / -1;
}
.blog-fade-enter-active {
  transition: all 0.25s ease;
}

.blog-fade-leave-active{
  position: absolute;
}
.blog-fade-enter-active:nth-child(3) {
  transition-delay: 0.1s;
}
.blog-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.blog-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
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
</style>
