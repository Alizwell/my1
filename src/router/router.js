import { lazy } from 'react'

const routes = [
    {
        path: '/login',
        component: lazy(() => import('../pages/Login'))
    },
    {
        path: '/home',
        // requiresAuth: true,
        component: lazy(() => import('../pages/Home')),
    }
]

export default routes