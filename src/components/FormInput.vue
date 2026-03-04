<script setup lang="ts">
import type { ClassValue, StyleValue } from 'vue'

defineOptions({ inheritAttrs: false })

const model = defineModel<string>({ default: '' })

const props = withDefaults(
  defineProps<{
    label: string
    id: string
    type?: string
    class?: ClassValue
    style?: StyleValue
  }>(),
  { type: 'text' },
)
</script>

<template>
  <div class="form-input" :class="props.class" :style="props.style">
    <input
      v-bind="$attrs"
      v-model="model"
      :type="props.type"
      :id="props.id"
      :name="props.id"
      class="form-input__field input"
      placeholder=""
    />
    <label :for="props.id" class="form-input__label">{{ props.label }}</label>
  </div>
</template>

<style scoped>
.form-input {
  position: relative;
}

.form-input__label {
  font-size: 18px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  pointer-events: none;
  transition: opacity 0.2s;
}

.form-input__field:focus ~ .form-input__label,
.form-input__field:not(:placeholder-shown) ~ .form-input__label {
  opacity: 0;
}
</style>
