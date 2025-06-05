<script setup lang="ts">
import { ref, watch } from 'vue'
import Button from 'primevue/button'

const props = defineProps<{
  file: string | null
}>()

const imageSrc = ref<string | undefined>(undefined)
const scale = ref(1)

watch(() => props.file, (newFile) => {
  if (newFile) {
    imageSrc.value = newFile
    resetView()
  }
})

const resetView = () => {
  scale.value = 1
}

const handleWheel = (e: WheelEvent) => {
  if (!e.ctrlKey) return
  e.preventDefault()
  const delta = e.deltaY * -0.001
  scale.value = Math.min(Math.max(0.5, scale.value + delta), 3)
}

const downloadFile = () => {
  if (!props.file) return

  const link = document.createElement('a')
  link.href = props.file
  link.download = props.file.split('/').pop() || 'document.pdf'
  link.click()
}
</script>

<template>
  <div class="image-viewer-wrapper">
    <div class="controls">
      <Button icon="pi pi-search-minus" @click="scale = Math.max(0.5, scale - 0.1)"/>
      <Button icon="pi pi-search-plus" @click="scale = Math.min(3, scale + 0.1)"/>
      <Button icon="pi pi-replay" @click="resetView"/>
      <Button icon="pi pi-download" label="Скачать" @click="downloadFile" />
    </div>

    <div
        class="image-container"
        @wheel="handleWheel"
    >
      <img
          :src="imageSrc"
          :style="{
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }"
          class="image-content"
      />
    </div>
  </div>
</template>

<style scoped>
.image-viewer-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 0.5rem;
  border-radius: 4px;
}

.image-container {
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-content {
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.1s;
}
</style>
