import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/clients",
    name: "clients",
    component: () => import("./components/ClientsList.vue"),
  },
  {
    path: "/clients/:id",
    name: "client-details",
    component: () => import("./components/ClientDetails.vue"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddClient.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
