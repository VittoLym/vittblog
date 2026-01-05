<script setup>
  import { onMounted} from "vue"
  import { useRouter } from "vue-router"

  const router = useRouter()

  onMounted(() => {
    const token = localStorage.getItem("token")
    if (!token && router.currentRoute.value.meta.requiresAuth) {
      router.push("/login")
    }
  })
</script>

<template>
  <div class="layout">
    <header class="header">
      <div class="header-inner">
        <h1 class="logo">vitt<span>.</span></h1>

        <nav class="nav">
          <RouterLink to="/" active-class="active">Inicio</RouterLink>
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
  color: var(--muted);
  text-decoration: none;
  font-size: 0.95rem;
  margin-left: 1.5rem;
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
</style>
