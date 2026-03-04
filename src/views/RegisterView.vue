<script setup lang="ts">
import FormInput from '@/components/FormInput.vue'
</script>

<template>
  <div class="auth container">
    <div class="auth__content">
      <h1 class="auth__title">description</h1>
      <form class="auth__form" action="">
        <p class="auth__form-description">description</p>
        <FormInput id="username" class="auth__username-field" label="Username" />
        <FormInput id="phone" class="auth__phone-field" label="Phone Number" />
        <p class="auth__form-error">login error</p>
        <button class="auth__form-button">Register</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-block: 32px;
}

.auth__content {
  max-width: 448px;
  width: 100%;
  background: var(--bg-card);
  border-radius: 4px;
  overflow: hidden;
}

.auth__title {
  font: inherit;
  text-align: center;
  color: var(--txt-muted);
  height: 52px;
  line-height: 52px;
  background: var(--bg-card-dark);
}

.auth__form {
  padding: 16px 24px 32px;
}

.auth__username-field {
  margin-top: 14px;
}

.auth__phone-field {
  margin-top: 20px;
}

.auth__form-error {
  margin-top: 8px;
  color: var(--error);
}

.auth__form-button {
  border: 0;
  margin-top: 24px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  background: var(--primary);
  width: 100%;
  padding: 0 20px;
  cursor: pointer;
  transition: background 0.2s;
  color: var(--on-primary);
  font-weight: 600;
  font-size: 18px;
}

.auth__form-button:hover {
  background: var(--primary-hover);
}
</style>
