import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "../layout/default.vue";
//生成vue3路由
const routes = [
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "/home",
    children: [
      { path: "/home", component: () => import("../views/home.vue") },
      {
        path: "/comps",
        component: () => import("../views/btns.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
