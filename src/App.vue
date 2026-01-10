<script setup>
  import { ref,watch } from "vue"
  import { useRouter,useRoute } from "vue-router"
  import { isLogged, logout } from "../src/stores/auth.js"
  import BurgerIcon from "./components/BurgerIcon.vue"
  import MenuMobile from "./components/MenuMobile.vue"
  import LoginIcon from "./components/LoginIcon.vue"
  import HomeIcon from "./components/HomeIcon.vue"
  import LogoutIcon from "./components/LogoutIcon.vue"
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
  <div class="main-layout">
    <header class="header" id="home">
      <div class="header-inner">
        <article class="main_header">
          <h1 class="logo">Vitt<span>.</span>Blog</h1>
        </article>
        <nav class="sections">
          <a href="/">Home</a>
          <a href="#posts">Blogs</a>
          <a href="#footer">Footer</a>
        </nav>
        <aside class="buttons">
          <nav class="nav" >
            <RouterLink to="/" class="link" v-if="route.path !== '/'" active-class="active">
              <HomeIcon/>
              <div class="text">Home</div>
            </RouterLink>
            <button
              v-if="isLogged && route.path !== '/login'"
              class="logout link"
              @click="onLogout"
            >
              <LogoutIcon/>
              <div class="text">Cerrar Sesión</div>
            </button>
            <RouterLink
              v-if="!isLogged && route.path !== '/login'"
              to="/login"
              class="link"
              active-class="active"
            >
              <LoginIcon/>
              <div class="text">Iniciar Sesión</div>
            </RouterLink>
            <button
              v-if="isLogged"
              class="new"
              @click="goNew"
              title="Nuevo Blog"
            >
              <div class="sign">+</div>
              <div class="text">Crear Blog</div>
            </button>
          </nav>
        </aside>
        <BurgerIcon
        @menuChange="mobileState"
        v-model="menuIsOpen"
        />
      </div>
    </header>
    <MenuMobile :isOpen="menuIsOpen" @selectMenu="mobileState"/>
    <main class="main">
      <RouterView />
    </main>

    <footer class="footer" id="footer">
      <p>
        © {{ new Date().getFullYear() }} Vitt —
        <span>Personal blog</span>
      </p>
    </footer>
  </div>
</template>

<style>
html{
  scroll-behavior: smooth;
}
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
  color: var(--text);
  overflow: auto;
}
.header {
  height: 20dvh;
  width: 80vw;
  padding: 0 1rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.header-inner {
  margin: auto;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: min-content;
  background: var(--bg-tr);
  padding: .5rem 1rem;
  width: 100%;
  border-radius: 45px;
}
.main_header{
  display: flex;
  flex-direction: row;
}
.main_header img{
  border-radius: 100%;
  margin-right: .5rem;
}
.sections{
  width: 25vw;
  display: flex;
  justify-content: space-between;
}
.sections a{
  text-decoration: none;
  color: var(--text);
  font-size: 500;
  font-weight: bold;
}
.sections a:hover{
  color: var(--muted);
}
.buttons{
  display: flex;
  flex-direction: row;
  height: 60%;
  justify-content: end;
}

.logo {
  margin: 0;
  margin-left: .5rem;
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
  transition: all ease .3s;
  height: 100%;
}

.link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text);
  font-size: .9rem;
  font-weight: 500;
  border: none;
  border-radius: 45px;
  cursor: pointer;
  transition: all .2s ease;
  background: rgba(255, 255, 255, 0.03);
  width: 3.5vw;
  height: 50px;
  overflow: hidden;
}
.link::before {
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

.link:hover::before {
  transform: translateX(100%);
}
.link:hover {
  color: var(--text);
  background: rgba(255,255,255,.08);
  opacity: .9;
  width: 150px;
  transition-duration: .3s;
  
}

.link.active {
  color: var(--accent);
  background: rgba(122,162,255,.15);
}
.link .text{
    width: 0%;
    opacity: 0;
    color: var(--text);
    font-size: 1em;
    font-weight: 500;
    transition-duration: .3s;
    display: flex;
    align-self: center;
    white-space:nowrap;
}
.link .sign{
    width: 100%;
    font-size: 2em;
    color: var(--text);
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
}
.link
.nav a:hover {
  color: var(--text);
}
.link:hover .sign {
    width: 30%;
    transition-duration: .3s;
}
.link:hover .text {
    opacity: 1;
    width: max-content;
    transition-duration: .3s;
    margin-left: .3rem;
}
.nav .active {
  color: var(--accent);
}

.new {
  position: relative;
  background: linear-gradient(135deg, #7aa2ff, #5f8dff);
  border: none;
  border-radius: 45px;
  cursor: pointer;
  color: var(--text);
  font-size: .9rem;
  font-weight: 500;
  padding: .5rem 1rem;
  transition: all .2s ease;
  width: 3.5vw;
  height: 50px;
  overflow: hidden;
  display: flex;
}
.new::before {
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
.new:hover::before {
  transform: translateX(100%);
}
.new:hover {
  opacity: .9;
  width: 130px;
  transition-duration: .3s;
}
.new .text {
    width: 0%;
    opacity: 0;
    color: var(--text);
    font-size: 1em;
    font-weight: 500;
    transition-duration: .3s;
    display: flex;
    align-self: center;
    white-space:nowrap;
}
.new .sign {
    width: 100%;
    font-size: 2em;
    color: var(--text);
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
}
.new:hover .sign {
    width: 30%;
    transition-duration: .3s;
}
.new:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
}
.new:active {
    transform: translate(2px ,2px);
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
  position: relative;
  border: none;
  color: var(--negative);
  font-size: .9rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 45px;
  transition: all .2s ease;
  background: rgba(255, 255, 255, 0.03);
  overflow: hidden;
}
.logout::before {
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

.logout:hover::before {
  transform: translateX(100%);
}
.logout:hover {
  background: rgba(255, 107, 107, 0.247);
  color: var(--text);
}
.main{
  background-color: var(--bg-soft);
}
@media (max-width: 768px) {
  .header{
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 .5rem;
    z-index: 100;
  }
  .header-inner {
    flex-direction: row;
    gap: 1.2rem;
    padding: .5rem 1rem;
    overflow: hidden;
    margin: 0;
    width: 100%;
  }

  .main_header {
    text-align: start;
    padding: 0 .5rem;
  }

  .main_header img {
    display: none;
  }
  .logo {
    font-size: 1.2rem;
    line-height: 1.4;
    width: 80%;
  }

  .logo span {
    font-size: .7rem;
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
