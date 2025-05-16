<script setup lang="ts">
import Button from "primevue/button"
</script>

<template>
  <div class="container">
    <nav class="nav">
      <Button as-child v-slot="slotProps" severity="info" rounded>
        <router-link :class="slotProps.class" to="/tree">1-ый Вариант</router-link>
      </Button>
      <Button as-child v-slot="slotProps" severity="success" rounded>
        <router-link :class="slotProps.class" to="/">Главная</router-link>
      </Button>
      <Button as-child v-slot="slotProps" severity="info" rounded>
        <router-link :class="slotProps.class" to="/tiles">2-ый Вариант</router-link>
      </Button>
    </nav>
  </div>
</template>

<style scoped>

</style>