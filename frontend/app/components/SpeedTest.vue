<script setup>
import { ref, onMounted } from "vue"
import { useApi } from "../composables/useApi"

const { getSpeed } = useApi()
const speed = ref(null)

onMounted(async () => {
  speed.value = await getSpeed()
})
</script>

<template>
  <div class="card shadow">
    <div class="card-body">
      <h5>Speed Test</h5>

      <div v-if="!speed">Loading...</div>

      <div v-else>
        <p>Download: {{ speed.download }} Mbps</p>
        <p>Upload: {{ speed.upload }} Mbps</p>
        <p>Ping: {{ speed.ping }} ms</p>
      </div>
    </div>
  </div>
</template>
