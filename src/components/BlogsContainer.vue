<script setup>
    import { isLogged } from "../stores/auth.js"

</script>
<template>
  <div class="Blog_Container">
    <section class="layout">
      <div class="hero">
        <span class="badge">Blog</span>

        <h1>
          Ideas, código,<br />
          experiencias reales y<br />
          <s>análisis rebuscados</s>
        </h1>

        <p>
          Artículos sobre desarrollo web, proyectos personales
          y aprendizajes del día a día como desarrollador.
        </p>

        <div class="actions">
          <a href="#posts" class="primary">Ver Artículos</a>
          <router-link class="primary" to="/article/new" v-if="isLogged">+ Nuevo Artículo</router-link>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.Blog_Container{
    height: 90vh;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #1f1f27;
    background-color: var(--bg);
    background-image:
    linear-gradient(
        rgba(255,255,255,0.03) 1px,
        transparent 1px
    ),
    linear-gradient(
        90deg,
        rgba(255,255,255,0.03) 1px,
        transparent 1px
    );
    background-size: 40px 40px;
}
.layout{
    display: flex;
    justify-content: center;
    align-items: center;
}
.hero {
  max-width: 620px;
}

.badge {
  display: inline-block;
  padding: .25rem .7rem;
  border-radius: 999px;
  font-size: .7rem;
  letter-spacing: .05em;
  text-transform: uppercase;
  background: rgba(255,255,255,.06);
  color: var(--text);
  margin-bottom: .8rem;
}

.hero h1 {
  font-size: 2.4rem;
  line-height: 1.1;
  margin-bottom: 1rem;
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

.primary {
  position: relative;
  overflow: hidden;
  color: var(--text);
  border-radius: 10px;
  font-weight: 600;
  padding: .7rem 1.4rem;
  background: rgba(255, 255, 255, 0.03);
  text-decoration: none;
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
@media (max-width: 600px) {
  .layout {
    width: 100%;
    padding: 1.5rem 1rem;
  }

  .hero h1 {
    font-size: 1.8rem;
  }

  .hero p {
    font-size: .95rem;
  }

  .actions {
    flex-direction: column;
  }

  .primary {
    width: 100%;
    text-align: center;
  }
}

</style>