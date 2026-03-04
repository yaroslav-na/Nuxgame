<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="page">
    <header class="page__header"></header>
    <main class="page__main">
      <RouterView />
    </main>
    <footer class="page__footer"></footer>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page__header {
  height: 60px;
  background: var(--bg-dark);
}

.page__main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.page__footer {
  height: 270px;
  background: var(--bg-dark);
}
</style>
