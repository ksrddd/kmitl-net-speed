<script setup>
import { ref, onMounted } from "vue"
import { useApi } from "../composables/useApi"

const { getUsage } = useApi()
const usage = ref([])

onMounted(async () => {
  usage.value = await getUsage()
})
</script>

<template>
  <div class="card shadow">
    <div class="card-body">
      <h5>Peak Users</h5>

      <ul class="list-group">
        <li v-for="u in usage" :key="u.time" class="list-group-item">
          {{ u.time }} — {{ u.users }} users
        </li>
      </ul>
    </div>
  </div>
</template>
