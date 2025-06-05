import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Viewer',
        component:() => import('../views/ViewerPage.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
