<script setup>
import { computed,ref,onUpdated  } from 'vue';
const props = defineProps({
  article: Object,
  isError: Object
})
onUpdated(()=> {
  console.log(props.isError.value)
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
</script>

<template>
  <article class="card">
    <!-- Header -->
    <header class="header">
      <div>
        <h2 class="title">{{ article.title }}</h2>
        <span class="owner">
          ✍️ {{ article.owner_name }}
        </span>
      </div>

      <div class="actions" v-if="isAdmin">
        <button class="icon edit" @click="emit('edit', article)">
          ✏️
        </button>
        <button class="icon delete" @click="onDelete">
          🗑️
        </button>
      </div>
    </header>

    <small class="date">
      {{ new Date(article.date).toLocaleDateString() }}
    </small>

    <p class="content">
      {{ article.content.slice(0, 180) }}…
    </p>

    <button class="read">Leer más →</button>
    <p v-if="isError != null && isError.id == article.id" class="status error">{{ isError.message }}</p>
  </article>
</template>


<style scoped>
  .owner {
  display: block;
  margin-top: .2rem;
  font-size: .75rem;
  opacity: .65;
}
.card {
  background: linear-gradient(180deg, #15151b, #101015);
  border-radius: 18px;
  padding: 1.5rem;
  box-shadow: 0 25px 60px rgba(0,0,0,.45);
  transition: transform .25s ease, box-shadow .25s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 30px 80px rgba(0,0,0,.6);
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 1rem;
}

.title {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.3;
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
  color: #ff6b6b;
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
  color: #ff6b6b;
}

.icon.edit:hover {
  color: #7c8cff;
}

/* Meta */
.date {
  display: block;
  margin-top: .25rem;
  font-size: .75rem;
  opacity: .5;
}

/* Content */
.content {
  margin: 1.2rem 0 1.5rem;
  line-height: 1.65;
  opacity: .85;
}

/* Read more */
.read {
  background: none;
  border: none;
  color: #7c8cff;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
}

.read:hover {
  text-decoration: underline;
}
</style>
