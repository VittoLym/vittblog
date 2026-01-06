<script setup>
  import { onMounted, computed} from "vue"
  import { useRouter,useRoute } from "vue-router"
  import { isLogged, logout } from "../src/stores/auth.js"

  const route = useRoute()
  const router = useRouter()
  function onLogout() {
    logout()
    router.push("/login")
  }

</script>

<template>
  <div class="layout">
    <header class="header">
      <div class="header-inner">
        <h1 class="logo">vitt<span>.</span></h1>
        <nav class="nav" v-if="route.path !== '/login'">
          <button
            v-if="isLogged"
            class="logout"
            @click="onLogout"
          >
            Logout
          </button>
          <RouterLink
            v-if="!isLogged"
            to="/login"
            class="link"
            active-class="active"
          >
            Login 
          </RouterLink>
        </nav>

        <nav class="nav" v-else-if="route.path !== '/' && !isLogged">
          <RouterLink to="/" class="link" active-class="active">
            Home
          </RouterLink>
        </nav>
      </div>
    </header>

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
/* ===== Base ===== */
:root {
  --bg: #0e0e11;
  --bg-soft: #15151b;
  --text: #eaeaf0;
  --muted: #9a9aa3;
  --accent: #7c8cff;
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
}

/* ===== Layout ===== */
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ===== Header ===== */
.header {
  background: rgba(14, 14, 17, 0.75);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #1f1f27;
}

.header-inner {
  max-width: 1000px;
  margin: auto;
  padding: 1.5rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.logo span {
  color: var(--accent);
}

/* ===== Nav ===== */
.nav a {
  color: var(--accent);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.nav a:hover {
  color: var(--text);
}

.nav .active {
  color: var(--accent);
}

/* ===== Main ===== */
.main {
  flex: 1;
  width: 100%;
}

/* ===== Footer ===== */
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
.nav {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: .75rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 14px;
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 30px rgba(0,0,0,.25);
  transition: all ease .3s;
}

.link {
  text-decoration: none;
  color: #ccc;
  font-size: .9rem;
  font-weight: 500;
  padding: .4rem .9rem;
  border-radius: 10px;
  transition: all .2s ease;
}

.nav:has(.link:hover) {
  color: #fff;
  background: rgba(255,255,255,.08);
}

.link.active {
  color: #7aa2ff;
  background: rgba(122,162,255,.15);
}

.logout {
  background: none;
  border: none;
  color: #ff6b6b;
  font-size: .9rem;
  font-weight: 500;
  cursor: pointer;
  padding: .4rem .9rem;
  border-radius: 10px;
  transition: all .2s ease;
}

.nav:has(.logout:hover) {
  background: rgba(255,107,107,.15);
  color: #ff8b8b;
}

</style>
