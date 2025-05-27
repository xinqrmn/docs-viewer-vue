import { createRouter, createWebHistory } from 'vue-router'
import ViewerPage from '../views/ViewerPage.vue'

const routes = [
    {
        path: '/',
        name: 'Viewer',
        component: ViewerPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
