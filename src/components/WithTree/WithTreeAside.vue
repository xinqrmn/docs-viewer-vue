<script setup lang="ts">
import Tree from 'primevue/tree';
import {ref, onMounted} from "vue";

interface TreeNode {
  key: string | number;
  label?: string;
  data?: string;
  icon?: string;
  children?: TreeNode[] | undefined;
}

const nodes = ref<TreeNode[]>([]);
const selectedKey = ref<{ [key: string]: boolean }>({});

const testNodes = () => {
  return [
    {
      key: '0',
      label: 'Documents',
      icon: 'pi pi-fw pi-folder',
      data: 'Documents folder',
      children: [
        {
          key: '0-1',
          label: 'pws-500.doc',
          icon: 'pi pi-fw pi-file',
          data: 'PWS-500',
        },
        {
          key: '0-2',
          label: 'pws-600.doc',
          icon: 'pi pi-fw pi-file',
          data: 'PWS-600',
        },
        {
          key: '0-3',
          label: 'pws-700.doc',
          icon: 'pi pi-fw pi-file',
          data: 'PWS-700',
        },
        {
          key: '0-4',
          label: 'pws-800.doc',
          icon: 'pi pi-fw pi-file',
          data: 'PWS-800',
        }
      ]
    },
    {
      key: '1',
      label: 'Passport',
      icon: 'pi pi-fw pi-image',
      data: 'Passport List',
    },
    {
      key: '2',
      label: 'Three',
      icon: 'pi pi-fw pi-image',
      data: 'asdas',
    },
    {
      key: '3',
      label: 'Four',
      icon: 'pi pi-fw pi-image',
      data: 'asdas',
    },
    {
      key: '4',
      label: 'Five',
      icon: 'pi pi-fw pi-image',
      data: 'asdas',
    },
  ]
}

onMounted(async () => {
  const res = await fetch('/files');
  nodes.value = await res.json();
  console.log(nodes.value);
})
nodes.value = testNodes()

const onNodeSelect = (node: any) => {
  console.log('selected', node)
}

</script>

<template>
  <div class="aside">
    <Tree
        v-model:selectionKeys="selectedKey"
        selectionMode="single"
        :value="nodes"
        :metaKeySelection="false"
        @node-select="onNodeSelect"
        :filter="true"
        filterMode="strict"
        class="w-full md:w-[30rem]"
        :pt="{
        node: {
          class: ({ context }: any) => context.node.data?.filetype
        }
      }"
    >
      <template #node="slotProps">
        <div class="flex align-items-center gap-2">
          <i :class="slotProps.node.icon"/>
          <span>{{ slotProps.node.label }}</span>
        </div>
      </template>
    </Tree>
  </div>
</template>

<style scoped>
.aside {
  width: 30%;
  height: 100%;
}

:deep(.pdf) {
  color: #e74c3c;
}

:deep(.image) {
  color: #3498db;
}

:deep(.folder) {
  color: #f39c12;
}
</style>