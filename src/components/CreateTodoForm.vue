<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import FormInput from './FormInput.vue'
import { useCreateTodo } from '@/composables/useCreateTodo'
import { useUsersStore } from '@/stores/useUsers'
import { useFilteredFavouriteTodosStore } from '@/stores/useFilteredFavouriteTodos'

const { createTodo, createTodoError, isLoading, isSuccess } = useCreateTodo()
const filteredTodos = useFilteredFavouriteTodosStore()

const getDefaultFormState = () => ({
  title: '',
  userId: '',
})

const form = ref(getDefaultFormState())
const userError = ref('')
const usersStore = useUsersStore()
const idRange = computed(() => {
  const userIds = usersStore.users.map((user) => user.id)
  return { min: Math.min(...userIds), max: Math.max(...userIds) }
})

const onSubmit = async () => {
  const parsedUserId = Number(form.value.userId)
  const preparedTitle = form.value.title.trim()
  if (!preparedTitle || !parsedUserId) {
    userError.value = 'userId is a number and title is required'
    return
  }

  await createTodo({ title: preparedTitle, userId: parsedUserId })

  if (!createTodoError.value) {
    form.value = getDefaultFormState()
  }

  if (isSuccess.value) {
    filteredTodos.resetFilters()
  }
}

onUnmounted(() => {
  createTodo.abort()
})
</script>

<template>
  <section class="create-card">
    <div class="create-card__header">Create Todo</div>
    <form class="create-card__form" @submit.prevent="onSubmit">
      <FormInput
        v-model="form.title"
        label="Title"
        id="todo-title"
        class="create-card__field"
        @input="userError = ''"
      />
      <FormInput
        v-model="form.userId"
        :min="idRange.min"
        :max="idRange.max"
        label="User ID"
        id="todo-user-id"
        type="number"
        class="create-card__field"
        @input="userError = ''"
      />
      <p v-if="userError" class="create-card__error">
        {{ userError }}
      </p>
      <p v-else-if="createTodoError" class="create-card__error">
        {{ createTodoError }}
      </p>
      <button type="submit" class="create-card__btn" :disabled="isLoading">
        {{ isLoading ? 'Adding...' : 'Add' }}
      </button>
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
