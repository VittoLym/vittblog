<script setup>
import { computed,ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter() 
const props = defineProps({
  index: String,
  category: String,
  title: String,
  readTime: String,
  image: String,
  article: Object,
  isError: Object
})
const ago = ref('')
const dateAgo = new Date(props.article.created_at) - new Date()
const diffDays = Math.floor(dateAgo / (1000 * 60 * 60 * 24));
ago.value = Math.abs(diffDays)
const isHover = ref(false)
const titleStyle = computed(() => ({
  color: isHover.value ? props.article?.color_title : "#eaeaf0"
}))
const emit = defineEmits(["edit", "delete"])
const heroBackground = computed(() => {
  if (!props.article?.image) return {
    backgroundImage: `url(${props.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }
  return {
    backgroundImage: `url(${props.article.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }
})
function onDelete() {
  if (confirm("¿Eliminar este artículo?")) {
    emit("delete", props.article.id)
  }
}
function toArticle(){
  router.push(`/article/${props.article.id}`)
}
function goArticle(event){
  if(props.article !== undefined){
    toArticle()
  }
  return
}
</script>
<template>
<article class="card" @mouseenter="isHover = true" @mouseleave="isHover = false" @click="goArticle">
    <div
        class="card-bg"
        :style="heroBackground"
    ></div>
    <div class="card-gradient"></div>
    <div class="card-content">
        <span class="card-label">
            {{ article.id }} / {{ article.category }}
        </span>
        <h3 class="card-title" :style="titleStyle">
            {{ title !== undefined ? title : article.title}}
        </h3>
        <div class="card-meta">
            <article>
                <span class="material-symbols-outlined icon-xs">timer</span>
                <p>Hace {{ ago }} dias</p> 
            </article>
            <p>✍️{{ article.owner_name }}</p>
        </div>
    </div>
</article>
</template>
<style scoped>
.card {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 1rem;
  background-color: #0f172a;
  border: 1px solid #1e293b;
  transition: box-shadow 300ms ease;
  height: 250px;
  width: 100%;
}

.card:hover {
  box-shadow: 0 25px 50px -12px rgba(19, 127, 236, 0.15);
}

/* IMAGE */
.card-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.7;
  transition: transform 700ms ease;
}

.card:hover .card-bg {
  transform: scale(1.1);
}

/* GRADIENT */
.card-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    #020617 0%,
    rgba(2, 6, 23, 0.4) 50%,
    transparent 100%
  );
}

/* CONTENT */
.card-content {
  position: absolute;
  bottom: 0;
  padding: 1.5rem;
  width: 100%;
}

/* LABEL */
.card-label {
  display: inline-block;
  background-color: #137fec;
  color: white;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  padding: 2px 6px;
  border-radius: 2px;
  margin-bottom: 0.75rem;
}

/* TITLE */
.card-title {
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  transition: color 200ms ease;
}

.card:hover .card-title {
  color: #137fec;
}

/* META */
.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  font-size: 10px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.card-meta article{
    display: flex;
    align-items: center;
}
.card-meta article span{
    margin-top: .1rem;
    margin-right: .3rem;
}
/* ICON */
.icon-xs {
  font-size: 12px;
}

</style>
