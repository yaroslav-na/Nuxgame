<script setup lang="ts">
import FormInput from './FormInput.vue'
</script>

<template>
  <section class="create-card">
    <div class="create-card__header">Create Todo</div>
    <form class="create-card__form">
      <FormInput label="Title" id="todo-title" class="create-card__field" />
      <FormInput label="User ID" id="todo-user-id" type="number" class="create-card__field" />
      <p class="create-card__error">login error</p>
      <button type="submit" class="create-card__btn">Add</button>
    </form>
  </section>
</template>

<style scoped>
.create-card {
  background: var(--bg-card);
  border-radius: 4px;
  overflow: hidden;
}

.create-card__header {
  text-align: center;
  color: var(--txt-muted);
  height: 52px;
  line-height: 52px;
  background: var(--bg-card-dark);
  font-weight: 600;
}

.create-card__form {
  display: flex;
  gap: 16px;
  padding: 16px 24px;
  flex-wrap: wrap;
}

.create-card__field {
  flex: 1 1 200px;
}

.create-card__error {
  flex: 0 0 100%;
  margin-top: -8px;
  color: var(--error);
}

.create-card__btn {
  border: 0;
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
  flex: 0 0 100%;
}

.create-card__btn:hover {
  background: var(--primary-hover);
}
</style>
