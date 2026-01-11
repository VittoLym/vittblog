<script setup>
    import { isLogged } from "../stores/auth.js"

</script>
<template>
    <div class="Blog_Container">
        <section class="layout">
            <div class="hero">
                <span class="badge">Blog</span>
                <h1 class="logo">Vitt<span>.</span>Blog | Desarrollo & Tecnología 💻🧠<br><span><s>(Y Pensamientos Intrusivos)</s></span></h1>
                <p>
                    Artículos sobre desarrollo web, proyectos personales
                    y aprendizajes del día a día como desarrollador.
                </p>
                <div class="actions">
                    <router-link to="/blogs" class="primary link">Ver Blogs</router-link>
                    <router-link class="link primary add" to="/article/new" v-if="isLogged">+ Nuevo Blog</router-link>
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
}
.layout{
    display: flex;
    padding:0rem 1rem;
    justify-content: center;
    align-items: center ;
}
.presentation{
    display: flex;
    flex-direction: column;
    align-items: center;
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
  max-width: 620px;
  background-color: var(--bg-tr2);
  border-radius: 45px;
  padding: 2rem 1.5rem;
  backdrop-filter: blur(3px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0), inset 0 1px 0 rgba(255, 255, 255, 0.15)
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
  margin-bottom: 1rem;
  margin-top: .5rem;
}

.hero p {
  font-size: 1rem;
  opacity: .8;
  margin-bottom: 1.6rem;
}

.actions {
  display: flex;
  gap: 1rem;
}
.add{
  background: linear-gradient(135deg, #7aa2ff, #5f8dff);
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
    width: 100%;
    padding: 2rem 1rem;
    padding-bottom: 0;
  }
  .hero h1 {
    font-size: 1.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hero p {
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
    border-radius: 45px;
    width: 150px;
  }
}

</style>