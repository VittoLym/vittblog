import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import EditArticle from "../views/EditArticle.vue"
import Login from "../views/Login.vue"
import NewArticle from "../views/NewArticle.vue"

const routes = [
  {
    path: "/",
    component: Home
  },{
    path: "/article/edit/:id",
    component: EditArticle,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path:"/article/new",
    component:NewArticle,
    meta: { requiresAuth: true }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")

  if (to.meta.requiresAuth && !token) {
    next("/login")
  } else {
    next()
  }
})
export default router
