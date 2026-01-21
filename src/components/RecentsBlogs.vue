<script setup>
import { computed,ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps({
    article:Object,
    isError: Object
})
const isHover = ref(false)
const titleStyle = computed(() => ({
  color: isHover.value ? props.article?.color_title : "#eaeaf0"
}))
const heroBackground = computed(() => {
  if (!props.article?.image) return {
    backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuBhmmhQTmhuxZrvz9-TRfvW04NrIEezNOCMslwbrA0RwH235xLXB_EsIW3S51VBl5t0YpTpOkXksE8VlXTFfhs9Rp6vhQSc8NaD70dVg0pyXuiEAuisBY98hrXL11Y7AcqRoxatuktedAI4XAkzay1M27UWsyF3DvYQxYGFLScTI-Mk74yxPwpDFKYwIceCuHqhC-wGXivPpglsbaj5Dq3Ead1gVzTadKPq8kTHAvF9QK5rmeqJlJzoYQOJbBB0cOW7aW0bVkfsmU0)`,
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
const ago = ref('')
const dateAgo = new Date(props.article.created_at) - new Date()
const diffDays = Math.floor(dateAgo / (1000 * 60 * 60 * 24));
ago.value = Math.abs(diffDays)
function goToBlog(){
    router.push(`/article/${props.article.id}`)
}
</script>
<template>
<article class="article-card" @mouseenter="isHover = true" @mouseleave="isHover = false">
    <div class="image-wrapper">
        <div
            class="image"
            :style="heroBackground"
        ></div>
        <span class="tag">{{ article.category !== undefined ? article.category :'Sustainability' }}</span>
    </div>
    <div class="content">
    <h3 :style="titleStyle">
        {{ article.title !== undefined ? article.title :"The Rise of Sustainable Energy in Modern Architecture" }}
    </h3>
    <p>
        {{ article.content !== undefined ? `${article.content.slice(0,180)}...` :"Exploring how renewable energy sources are becoming the foundation of new urban developments and residential housing projects." }}
    </p>

    <div class="meta">
        <span>{{ article.created_at.split("T")[0] }} / Hace {{ ago }} dias</span>
        <button class="read-more" @click="goToBlog">
        Leer Blog
        <span class="material-symbols-outlined">arrow_forward</span>
        </button>
    </div>
    </div>
</article>
</template>
<style scoped>
/* Card */
.article-card {
  display: flex;
  flex-direction: column;
}

.image-wrapper {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: grayscale(100%);
  transition: filter 0.5s ease, transform 0.5s ease;
}

.article-card:hover .image {
  filter: grayscale(0);
  transform: scale(1.03);
}

.tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: var(--bg);
  padding: 4px 8px;
  font-size: 9px;
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 6px;
  display: inline-block;
  padding: .25rem .7rem;
  border-radius: 45px;
  font-size: .7rem;
  letter-spacing: .05em;
  text-transform: uppercase;
  background:rgba(0, 0, 0, 0.384);
  color: var(--text);
  margin-bottom: .5rem;
}

/* Content */
.content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.content h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;
}

.article-card:hover h3 {
  color: #6366f1;
}

.content p {
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

/* Meta */
.meta {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  text-transform: uppercase;
  color: #9ca3af;
}

.read-more {
  background: none;
  border: none;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6366f1;
  cursor: pointer;
}

.read-more span {
  transition: transform 0.3s ease;
}

.read-more:hover span {
  transform: translateX(4px);
}
</style>