<script setup>
import { computed } from 'vue';
import { useRouter,useRoute } from "vue-router"
const route = useRoute()
const router = useRouter()
const props = defineProps({
  article: Object,
  isError: Object
})
const defaultImage ="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80"
const isMobile = () => {
  return window.innerWidth <= 768
}
const isAdmin = computed(() => {
  return !!localStorage.getItem("token")
})
const emit = defineEmits(["edit", "delete"])

const heroBackground = computed(() => {
  if (!props.article?.image) return {
    backgroundImage: `url(${defaultImage})`,
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
  if(isMobile){
    if (event.target.closest('.actions')) {
      return;
    }
    toArticle()
  }
}
</script>

<template>
  <article class="card" @click="goArticle" :style="heroBackground">
    <div class="layout">
      <div class="body">
        <header class="card-header">
          <div class="info">
            <h2 class="title">{{ article.title }}</h2>
            <span class="owner">✍️ {{ article.owner_name }}</span>
            <small class="date">
              📅 {{ new Date(article.date).toLocaleDateString() }}
            </small>
            <p class="content">
              {{ article.content.slice(0, 120) }}…
            </p>
          </div>
          <div class="actions" v-if="isAdmin">
            <button class="icon edit" @click="emit('edit', article)">✏️</button>
            <button class="icon delete" @click="onDelete">🗑️</button>
          </div>
        </header>
        <button class="read" @click="toArticle">
          Leer más →
        </button>

        <Transition name="error">
          <p
            v-if="isError && isError.id === article.id"
            class="status error"
          >
            {{ isError.message }}
          </p>
        </Transition>
      </div>
    </div>
  </article>
</template>

<style scoped>
  .layout {
  display: flex;
  gap: 1.2rem;
  height: 100%;
  padding: 1.5rem;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Cuerpo */
.body {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: end;
}

/* Responsive */
  .owner {
  display: block;
  margin-top: .2rem;
  font-size: .75rem;
  opacity: .65;
  width: max-content;
}
.card {
  border-radius: 10px;
  transition: transform .25s ease;
  height: 33vh;
  overflow: hidden;
  background-color: var(--bg-tr2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  color: white;
}
.card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0,0,0,.75),
    rgba(0,0,0,.35),
    rgba(0,0,0,.1)
  );
  border-radius: 10px;
  z-index: 0;
}

.card > * {
  position: relative;
  z-index: 1;
}
.card:hover {
  transform: translateY(-6px);
}

/* Header */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.3rem .5rem ;
  border-radius: 10px;
}
.hero{
  width: 100%;
  border-radius: 45px;
  padding: 2rem 1.5rem;
  backdrop-filter: blur(3px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  color: white;
  height: 45dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
}

.title {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.3;
  color: var(--negative);
}

/* Actions */
.actions {
  display: flex;
  gap: .25rem;
}
.status {
  opacity: 0.7;
}

.error {
  color: var(--negative);
}
.icon {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: .9rem;
  opacity: .45;
  transition: opacity .2s ease, transform .2s ease;
}

.icon:hover {
  opacity: 1;
  transform: scale(1.1);
}

.icon.delete:hover {
  color:var(--negative);
}

.icon.edit:hover {
  color: var(--accent);
}

/* Meta */
.date {
  display: block;
  margin-top: .25rem;
  font-size: .75rem;
  opacity: .5;
  width: max-content;
}

/* Content */
.content {
  margin: 0 0 1.5rem;
  line-height: 1.65;
  opacity: .85;
  padding: 0 .6rem;
}

/* Read more */
.read {
  background: none;
  border: none;
  color: var(--accent);
  font-weight: 500;
  cursor: pointer;
  padding: 0;
}

.read:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .layout {
    flex-direction: column;
    padding: 1rem .5rem;
  }
  .card{
    height: 300px;
  }
  .content{
    margin: 0;
    height: 10vh;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0;
  }
  .body{
    height: 80%;
  }
 .card-header{
    overflow: hidden;
    border-radius: 10px;
    height: 100%;
    width: 100%;
    flex-direction: row;
    justify-content: end;
    flex-wrap: wrap;
    padding: 0;
    margin-top: 10px;
  }
 .title{
    width: 100%;
    margin-bottom: .5rem;
    height: 70px;
  } 
  .info{
    width: 100%;
    overflow: hidden;
    height: max-content;
    display: flex;
    flex-direction: column;
    justify-content: end;
  }
  .actions{
    width: 100%;
    justify-content: center;
    height: 5vh;
  }
   .icon{
    height: 50px;
    width: 70px;
  }
  .read{
    display: none;
  }
}
</style>
