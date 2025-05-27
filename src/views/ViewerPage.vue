<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import TreeViewer from '../components/TreeViewer.vue'

defineProps({
  selectedFile: {}
})

const route = useRoute()
const router = useRouter()

const file = computed(() => route.query.file as string | null)

const openFile = (path: string) => {
  router.replace({ query: { file: path } })
}
</script>

<template>
  <div class="view-container container">
    <TreeViewer :initial-file="file" @select="openFile" />
  </div>
</template>

<style>
.view-container {
  padding: 50px 0;
  height: 100vh;
}
</style>