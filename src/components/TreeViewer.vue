<script setup lang="ts">
import PdfViewer from './PdfViewer.vue'
import ImageViewer from './ImageViewer.vue'
import Tree from 'primevue/tree';
import { ref, onMounted, computed } from 'vue';

interface TreeNode {
  key: string | number;
  label?: string;
  data?: string;
  icon?: string;
  ext?: string;
  children?: TreeNode[] | undefined;
}

const nodes = ref<TreeNode[]>([]);
const selectedKey = ref<{ [key: string]: boolean }>({});
const selectedFile = ref<string | null>(null);
const selectedExt = ref<string | null>(null);

onMounted(async () => {
  try {
    const res = await fetch('/file-structure.json')
    nodes.value = await res.json()
  } catch (e) {
    console.error('Ошибка структуры дерева: ', e);
  }
})

const onNodeSelect = (node: TreeNode) => {
  const ext = node.ext?.toLowerCase()
  const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(ext ?? '')

  if (ext === 'pdf' || isImage) {
    selectedFile.value = node.data || null
    selectedExt.value = ext
  } else {
    selectedFile.value = null
    selectedExt.value = null
  }
}

const isPdf = computed(() => selectedExt.value === 'pdf')
const isImage = computed(() => ['jpg', 'jpeg', 'png', 'gif'].includes(selectedExt.value ?? ''))
</script>

<template>
  <div class="container aside">
    <Tree
        v-model:selectionKeys="selectedKey"
        selectionMode="single"
        :value="nodes"
        :metaKeySelection="false"
        @node-select="onNodeSelect"
        :filter="true"
        filterMode="strict"
        class="tree md:w-[30rem]"
        :pt="{
        node: {
          class: ({ context }: any) => context.node.data?.filetype
        }
      }"
    >
      <template #node="slotProps">
        <div class="flex align-items-center gap-2">
          <i :class="slotProps.node.icon" />
          <span>{{ slotProps.node.label }}</span>
        </div>
      </template>
    </Tree>

    <div class="viewer">
      <PdfViewer v-if="isPdf && selectedFile" :file="selectedFile" />
      <ImageViewer v-else-if="isImage && selectedFile" :file="selectedFile" />
      <div v-else class="empty-viewer">
        Выберите файл для просмотра
      </div>
    </div>
  </div>
</template>

<style scoped>
.aside {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.tree {
  width: 350px;
  min-width: 350px;
  max-width: 350px;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.viewer {
  width: 80%;
  height: 100%;
  position: relative;
}

.empty-viewer {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 1.2rem;
}
</style>
