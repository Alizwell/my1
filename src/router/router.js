import { lazy } from 'react'

const routes = [
    {
        path: '/login',
        component: lazy(() => import('../pages/Login'))
    },
    {
        path: '/home',
        requiresAuth: true,
        component: lazy(() => import('../pages/Home')),
        routes: [
            {
              path: "/home/payTrace",
              component: lazy(() => import('../pages/PayTrace')),
            },
            // {
            //   path: "/home/Self",
            //   component: lazy(() => import('../pages/Self')),
            // },
            // {
            //   path: "/home/AfterSaleService",
            //   component: lazy(() => import('../pages/AfterSaleService')),
            // },
          ]
    },
    // {
    //   path: "/home/payTrace",
    //   component: lazy(() => import('../pages/PayTrace')),
    // },
    {
        path: '/detail',
        requiresAuth: true,
        component: lazy(() => import('../pages/CustomDetail')),
    }
]

export default routes