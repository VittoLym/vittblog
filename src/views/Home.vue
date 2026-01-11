<script setup>
import { onMounted,ref } from "vue";
import BlogsContainer from "../components/BlogsContainer.vue"
const articles = ref([])
const loading = ref(false)
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
</script>
<template>
  <div class="collection">
    <BlogsContainer/>
    <BlogsContainer v-for="article in articles.slice(0,2)" :key="article.id" :article="article"/>
  </div>
</template>

<style scoped>
.collection{
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  gap: 1rem;
  height: max-content;
  margin-top: 120px;
  margin-bottom: 70px;
  width: 80vw;
}
.collection > :first-child {
  grid-column: 1 / -1;
}

@media (max-width: 768px) {
  .collection{
    width: 100%;
  }
}
</style>
