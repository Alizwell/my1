import { lazy } from "react";

const routes = [
  {
    path: "/login",
    component: lazy(() => import("../pages/Login"))
  },
  {
    path: "/home",
    requiresAuth: true,
    component: lazy(() => import("../pages/Home"))
  },
  {
    path: "/home/self",
    component: lazy(() => import("../pages/Self"))
  },
  {
    path: "/home/service",
    component: lazy(() => import("../pages/Service"))
  },
  {
    path: "/home/payTrace",
    component: lazy(() => import("../pages/PayTrace"))
  },
  {
    path: "/detail",
    requiresAuth: true,
    component: lazy(() => import("../pages/CustomDetail"))
  }
];

export default routes;
