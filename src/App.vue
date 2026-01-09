<script setup>
  import { ref,watch } from "vue"
  import { useRouter,useRoute } from "vue-router"
  import { isLogged, logout } from "../src/stores/auth.js"
  import BurgerIcon from "./components/BurgerIcon.vue"
  import MenuMobile from "./components/MenuMobile.vue"
  const route = useRoute()
  const router = useRouter()
  const menuIsOpen = ref(false)
  function onLogout() {
    logout()
    router.push("/login")
  }
  function goNew() {
    router.push("/article/new")
  }
  
  function mobileState(){
    menuIsOpen.value = !menuIsOpen.value
    watch(menuIsOpen, (open) => {
      document.body.style.overflow = open ? "hidden" : ""
    })
  }
</script>

<template>
  <div class="layout">
    <header class="header">
      <div class="header-inner">
        <article class="main_header">
          <img src="./assets/Jotchua.jpg" alt="Vitt.">
          <h1 class="logo">Vitt<span>.</span>Blog | Desarrollo & Tecnología 💻🧠<br><span>(Y Pensamientos Intrusivos)</span></h1>
        </article>
        <aside class="buttons">
          <button
            v-if="isLogged"
            class="new"
            @click="goNew"
          >
            + Nuevo Blog
          </button>
          <nav class="nav" >
            <RouterLink to="/" class="link" v-if="route.path !== '/'" active-class="active">
              Home
            </RouterLink>
            <button
              v-if="isLogged && route.path !== '/login'"
              class="logout"
              @click="onLogout"
            >
              Logout
            </button>
            <RouterLink
              v-if="!isLogged && route.path !== '/login'"
              to="/login"
              class="link"
              active-class="active"
            >
              Login 
            </RouterLink>
          </nav>
        </aside>
      </div>
      <BurgerIcon
      @menuChange="mobileState"
      v-model="menuIsOpen"
      />
    </header>
    <MenuMobile :isOpen="menuIsOpen" @selectMenu="mobileState"/>
    <main class="main">
      <RouterView />
    </main>

    <footer class="footer">
      <p>
        © {{ new Date().getFullYear() }} Vitt —
        <span>Personal blog</span>
      </p>
    </footer>
  </div>
</template>

<style>
:root {
  --bg: #0e0e11;
  --bg-soft: #15151b;
  --bg-tr:#7c8bff1a;
  --text: #eaeaf0;
  --muted: #9a9aa3;
  --accent: #7c8cff;
  --negative: #ff6b6b;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  background: var(--bg);
  color: var(--text);
  overflow: auto;
}

.header {
  background: rgba(14, 14, 17, 0.75);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #1f1f27;
  height: 20dvh;
}
.header-inner {
  width: 80vw;
  margin: auto;
  padding: 1.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.main_header{
  display: flex;
  flex-direction: row;
}
.main_header img{
  border-radius: 100%;
  margin-right: .5rem;
}

.buttons{
  display: flex;
  flex-direction: row;
  height: 60%;
  width: 25dvw;
  justify-content: end;
}

.logo {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.logo span {
  color: var(--negative);
}

.nav {
  display: flex;
  gap: 1rem;
  justify-content: end;
  padding: 0;
  backdrop-filter: blur(8px);
  transition: all ease .3s;
  height: 100%;
  width: 100%;
}

.link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text);
  font-size: .9rem;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 1rem;
  padding: .4rem .9rem;
  transition: all .2s ease;
  width: 80%;
  background: rgba(255, 255, 255, 0.03);
}
.link:hover {
  color: var(--text);
  background: rgba(255,255,255,.08);
}

.link.active {
  color: var(--accent);
  background: rgba(122,162,255,.15);
}

.nav a:hover {
  color: var(--text);
}

.nav .active {
  color: var(--accent);
}

.new {
  background: linear-gradient(135deg, #7aa2ff, #5f8dff);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: var(--text);
  margin-left: 1rem;
  font-size: .9rem;
  font-weight: 500;
  padding: .4rem .9rem;
  transition: all .2s ease;
  width: 60%;
}

.new:hover {
  opacity: .9;
}
.main {
  flex: 1;
  width: 100%;
}
.footer {
  border-top: 1px solid #1f1f27;
  padding: 1.5rem 1rem;
  text-align: center;
  font-size: 0.85rem;
  color: var(--muted);
}

.footer span {
  opacity: 0.6;
}

.logout {
  border: none;
  color: var(--negative);
  font-size: .9rem;
  font-weight: 500;
  cursor: pointer;
  padding: .4rem .9rem;
  border-radius: 10px;
  transition: all .2s ease;
  background: rgba(255, 255, 255, 0.03);
  width: 80%;
  height: 100%;
}

.logout:hover {
  background: rgba(255, 107, 107, 0.247);
  color: var(--text);
}

@media (max-width: 768px) {
  .header{
    height: min-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-inner {
    flex-direction: column;
    gap: 1.2rem;
    padding: .5rem 0;
    overflow: hidden;
    margin: 0;
    width: 60%;
  }

  .main_header {
    text-align: start;
    padding: 0 .5rem;
  }

  .main_header img {
    display: none;
  }
  .logo {
    font-size: 1.1rem;
    line-height: 1.4;
  }

  .logo span {
    font-size: .9rem;
    width: max-content;
  }

  .buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: .6rem;
    display: none;
  }

  .nav {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
  }

  .link,
  .logout,
  .new {
    text-align: center;
    padding: .7rem;
    border-radius: 10px;
    margin: 0;
  }
}
</style>
