<script setup lang="ts">
import { computed } from 'vue'

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Uncompleted', value: 'uncompleted' },
  { label: 'Favourites', value: 'favourites' },
]

const userIdOptions = computed(() => {
  return [{ label: 'All users', value: '' }]
})
</script>

<template>
  <section class="filters-bar">
    <input class="filters-bar__search input input--sm" type="text" placeholder="Search todos..." />

    <div class="filters-bar__filter">
      <label for="filter-status" class="filters-bar__label">Status</label>
      <select id="filter-status" class="filters-bar__select">
        <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>

    <div class="filters-bar__filter">
      <label for="filter-user" class="filters-bar__label">User</label>
      <select id="filter-user" class="filters-bar__select">
        <option v-for="opt in userIdOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>
  </section>
</template>

<style scoped>
.filters-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.filters-bar__search {
  flex: 0 0 100%;
}

.filters-bar__filter {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 1 140px;
}

.filters-bar__label {
  font-size: 14px;
  color: var(--txt-bright);
  white-space: nowrap;
}

.filters-bar__select {
  background: var(--bg-card-bright);
  border: 0;
  height: 32px;
  padding: 0 8px;
  border-radius: 4px;
  font: inherit;
  font-size: 14px;
  cursor: pointer;
  flex-grow: 1;
}

.filters-bar__select:focus {
  outline: 1px solid var(--primary);
}

@media (min-width: 420px) {
  .filters-bar__search {
    flex: 0 1 200px;
  }

  .filters-bar__filter {
    flex: 0 1 auto;
  }
}
</style>
