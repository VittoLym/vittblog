<script setup>
import { computed } from "vue"
import { isLogged } from "../stores/auth.js"
const props = defineProps({article:Object})
const heroBackground = computed(() => {
  if (!props.article?.image) return {
    backgroundColor: "rgba(101, 34, 153, 0.219)"
  }
  return {
    backgroundImage: `url(${props.article.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }
})
</script>
<template>
    <div class="Blog_Container">
        <section class="layout">
          <div class="hero" :style="heroBackground">
              <span class="badge">Blog</span>
              <h1 class="logo">{{ article?.title != undefined ? article.title : 'amongus' }}</h1>
              <p>{{ article?.content.slice(0,130) }}...</p>
              <div class="actions">
                  <router-link :to="`/article/${article.id}`" class="primary link">Ver Blog</router-link>
              </div>
          </div>
        </section>
    </div>
</template>
<style scoped>
.Blog_Container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 100%;
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