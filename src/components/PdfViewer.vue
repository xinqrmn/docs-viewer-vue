<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url'

import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import 'primeicons/primeicons.css'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

const props = defineProps<{
  file: string | null,
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const currentPage = ref(1)
const totalPages = ref(0)
const scale = ref(1.5)

let pdfDoc: pdfjsLib.PDFDocumentProxy | null = null

const roundScale = (val: number) => +(val.toFixed(2))

const renderPage = async (num: number) => {
  if (!pdfDoc || !canvasRef.value) return

  const page = await pdfDoc.getPage(num)
  const viewport = page.getViewport({ scale: scale.value })

  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  if (!context) return

  canvas.width = viewport.width
  canvas.height = viewport.height

  canvas.style.width = `${viewport.width}px`
  canvas.style.height = `${viewport.height}px`

  await page.render({
    canvasContext: context,
    viewport
  }).promise
}

const loadPdf = async () => {
  if (!props.file) return

  const loadingTask = pdfjsLib.getDocument(props.file)
  pdfDoc = await loadingTask.promise
  totalPages.value = pdfDoc.numPages
  currentPage.value = 1
  await renderPage(currentPage.value)
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    renderPage(currentPage.value)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    renderPage(currentPage.value)
  }
}

const goToPage = () => {
  if (currentPage.value >= 1 && currentPage.value <= totalPages.value) {
    renderPage(currentPage.value)
  }
}

const zoomIn = () => {
  if (scale.value < 3) {
    scale.value = roundScale(scale.value + 0.1)
  }
}
const zoomOut = () => {
  if (scale.value > 0.5) {
    scale.value = roundScale(scale.value - 0.1)
  }
}
const resetZoom = () => {
  scale.value = 1.5
}

const handleWheelZoom = (e: WheelEvent) => {
  if (!e.ctrlKey) return
  e.preventDefault()

  const delta = e.deltaY
  if (delta < 0 && scale.value < 3) {
    scale.value = roundScale(scale.value + 0.1)
  } else if (delta > 0 && scale.value > 0.5) {
    scale.value = roundScale(scale.value - 0.1)
  }
}

watch(scale, () => {
  renderPage(currentPage.value)
})

onMounted(() => {
  if (props.file) loadPdf()
})

watch(() => props.file, () => {
  loadPdf()
})
</script>

<template>
  <div class="pdf-viewer-wrapper">
    <div class="pdf-controls">
      <Button icon="pi pi-chevron-left" rounded @click="prevPage" :disabled="currentPage === 1" />
      <span>Страница</span>
      <InputNumber
          v-model="currentPage"
          :min="1"
          :max="totalPages"
          @blur="goToPage"
          showButtons
          buttonLayout="horizontal"
      />
      <span>из {{ totalPages }}</span>
      <Button icon="pi pi-chevron-right" rounded @click="nextPage" :disabled="currentPage === totalPages" />

      <Button icon="pi pi-search-minus" @click="zoomOut" />
      <Button icon="pi pi-search-plus" @click="zoomIn" />
      <Button icon="pi pi-replay" @click="resetZoom" />
    </div>

    <div class="pdf-container" @wheel="handleWheelZoom">
      <div class="canvas-wrapper">
        <canvas ref="canvasRef"></canvas>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pdf-viewer-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.pdf-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.pdf-container {
  max-height: 80vh;
  width: 100%;
  min-width: 800px;
  overflow: auto;
  background: #fafafa;
}

.canvas-wrapper {
  min-width: fit-content;
  display: flex;
  justify-content: center;
}

canvas {
  display: block;
}
</style>
