<script setup>
    import { onBeforeMount,ref } from "vue"
    import { useRouter,useRoute } from "vue-router"
    import { computed } from "vue"
    const route = useRoute()
    const router = useRouter()
    const id = route.params.id
    const title = ref(null)
    const content = ref("")
    const date = ref(null)
    const owner = ref(null)
    const defaultImage = ref("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80")
    const backgroundStyle = computed(() => ({
      background: `linear-gradient(
        rgba(0,0,0,0.65),
        rgba(0,0,0,0.85)
      ), url(${defaultImage.value})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }))
    onBeforeMount(async () => {
        try {
            const res = await fetch(
                `https://vittblog-backend-1.onrender.com/articles/${id}`
            )
            if (!res.ok) throw new Error("Artículo no encontrado")
            const article = await res.json()
            title.value = article.title
            content.value = article.content
            date.value = article.date
            defaultImage.value = article.image
        } catch (err) {
            console.log(err)
        }
    })
</script>
<template>
<article class="post" :style="backgroundStyle">
    <header class="post-header">
        <h1 class="title">{{ title }}</h1>
        <div class="meta">
            <span class="date">
                {{ new Date(date).toLocaleDateString() }}
            </span>
            <span v-if="owner" class="owner">
                ✍️ {{ owner }}
            </span>
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
.post {
  color: #eaeaea;
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
  width: 60vw;
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
  width: 60vw;
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
  color: #7aa2ff;
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
  color: #eaeaea;
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

</style>