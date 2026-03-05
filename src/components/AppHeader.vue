<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuth'

const authStore = useAuthStore()
</script>

<template>
  <header class="header">
    <p v-if="authStore.authenticatedUser" class="header__content">
      id: {{ authStore.authenticatedUser.id }} /name: {{ authStore.authenticatedUser.name }} /
      email: {{ authStore.authenticatedUser.email }} / phone:
      {{ authStore.authenticatedUser.phone }}
    </p>
  </header>
</template>

<style scoped>
.header {
  min-height: 60px;
  background: var(--bg-dark);
  display: flex;
  align-items: center;
  justify-content: center;
}
.header__content {
  font-size: 18px;
  color: var(--txt-bright);
}
</style>
