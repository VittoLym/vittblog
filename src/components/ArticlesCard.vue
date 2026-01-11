<script setup>
import { computed} from 'vue';
import { useRouter,useRoute } from "vue-router"
const route = useRoute()
const router = useRouter()
const defaultImage =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80"
const isMobile = () => {
  return window.innerWidth <= 768
}
const props = defineProps({
  article: Object,
  isError: Object
})
const isAdmin = computed(() => {
  return !!localStorage.getItem("token")
})
const emit = defineEmits(["edit", "delete"])

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
  <article class="card" @click="goArticle">
    <div class="layout">
      <div class="thumb">
        <img
          :src="article.image || defaultImage"
          alt="Cover"
        />
      </div>
      <div class="body">
        <header class="card-header">
          <div class="info">
            <h2 class="title">{{ article.title }}</h2>
            <span class="owner">✍️ {{ article.owner_name }}</span>
            <small class="date">
              📅 {{ new Date(article.date).toLocaleDateString() }}
            </small>
          </div>

          <div class="actions" v-if="isAdmin">
            <button class="icon edit" @click="emit('edit', article)">✏️</button>
            <button class="icon delete" @click="onDelete">🗑️</button>
          </div>
        </header>


        <p class="content">
          {{ article.content.slice(0, 180) }}…
        </p>

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

/* Imagen */
.thumb {
  width: 200px;
  height: 100%;
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
  background: #111;
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
  justify-content: space-between;
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
  background-color: var(--bg);
  border-radius: 10px;
  transition: transform .25s ease;
  height: 33vh;
  overflow: hidden;
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
  background: linear-gradient(180deg, #15151b, #101015);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #1f1f27;
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
  }
  .card{
    height: 300px;
  }
  .thumb {
    width: 100%;
    height: 160px;
    border-radius: 10px 10px 0 0;
  }
  .content{
    display: none;
  }
  .body{
    height: 10vh;
  }
  .body .card-header{
    overflow: hidden;
    border-radius: 0 0 10px 10px;
  }
  .body .card-header .title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  } 
  .card-header .info{
    width: 70%;
    overflow: hidden;
  }
  .card-header .actions{
    justify-content: end;
  }
  .read{
    display: none;
  }
}
</style>
