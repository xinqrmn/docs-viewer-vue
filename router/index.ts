import {createRouter, createWebHistory} from "vue-router";
import Main from '../src/components/Main.vue'
import WithTiles from "../src/components/WithTiles.vue";
import WithTree from "../src/components/WithTree.vue";

const routes = [
    {path: '/', component: Main},
    {path: '/tree', component: WithTree},
    {path: '/tiles', component: WithTiles}
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})