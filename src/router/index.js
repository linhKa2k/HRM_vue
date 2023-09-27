import { createRouter, createWebHistory } from "vue-router";

import { routerA } from "./routerA";
import { routerB } from "./routerB";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routerA, ...routerB],
});

export default router;
