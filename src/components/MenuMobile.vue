<script setup>
    import { defineEmits } from "vue"
    import { useRouter,useRoute } from "vue-router"
    import { isLogged, logout } from "../stores/auth.js"
    const emits = defineEmits(["selectMenu"])
    const route = useRoute()
    const router = useRouter()
    const props = defineProps({isOpen:Boolean})
    const onSelect = () =>{
        emits("selectMenu")
    }
    const onLogout = () => {
        logout()
        onSelect()
        router.push("/login")
    }
    const goPortfolio = () => {
        window.open("https://devitto.netlify.app/", "_blank")
    }

</script>
<template>
    <transition name="slide">
        <div class="mobile-menu" v-if="isOpen">
            <aside class="options">
                <img src="../assets/Jotchua.jpg" alt="Un perrito muy amable" title="Un perrito muy amable" @click="goPortfolio">
                <RouterLink to="/" v-if="route.path !== '/'" @click="onSelect">Home</RouterLink>
                <RouterLink to="/login" v-if="route.path !=='/login' && !isLogged" @click="onSelect">Login</RouterLink>
                <RouterLink to="/login" v-if="isLogged && route.path !=='/login'" @click="onLogout">Logout</RouterLink>
            </aside>
        </div>
    </transition>
</template>
<style scoped>
.mobile-menu {
  position: fixed;
  top: 90px;
  right: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-top: 2rem;
  z-index: 909;
  height: calc(100dvh - 90px);
}
.slide-enter-active,
.slide-leave-active {
  transition: transform .3s ease, opacity .3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.options{
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}
.options img{
    border-radius: 100%;
    height: 90px;
    width: 90px;
    margin-bottom: 5vh;
}
.options a{
    text-decoration: none;
    font-weight: 500;
    color: #fff;
    width: 100%;
    padding: 4vh 0;
    text-align: center;
    border-top: 1px solid #1f1f27;
    border-bottom: 1px solid #1f1f27;
}

.options a[href="/logout"]:hover {
  background: rgba(255,107,107,.2);
  color: #ff6b6b;
}
</style>