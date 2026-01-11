<script setup>
import BlogsContainer from "../components/BlogsContainer.vue"
</script>
<template>
  <div class="collection">
    <BlogsContainer/>
    <BlogsContainer/>
    <BlogsContainer/>
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
  margin: 70px 0;
}
.collection > :first-child {
  grid-column: 1 / -1;
}
</style>
