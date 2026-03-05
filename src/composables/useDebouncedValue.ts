import { readonly, ref, watch, type Ref } from 'vue'

export const useDebouncedValue = <T>(source: Ref<T>, delay = 300) => {
  const debounced = ref(source.value)
  let timer: number | null = null

  watch(source, (value) => {
    if (timer !== null) clearTimeout(timer)
    timer = setTimeout(() => {
      debounced.value = value
    }, delay)
  })

  return readonly(debounced)
}
