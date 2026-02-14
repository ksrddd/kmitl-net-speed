<script setup>
import { ref, onMounted } from "vue"
import { useApi } from "../composables/useApi"

const { getNetworks } = useApi()
const networks = ref([])

onMounted(async () => {
  networks.value = await getNetworks()
})
</script>

<template>
  <div class="card shadow">
    <div class="card-body">
      <h5>Nearby Networks</h5>

      <ul class="list-group">
        <li v-for="n in networks" :key="n.id" class="list-group-item">
          {{ n.name }} — {{ n.speed }} Mbps
        </li>
      </ul>
    </div>
  </div>
</template>
