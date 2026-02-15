<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { useApi } from "../composables/useApi"
import { Line } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  LineElement, CategoryScale,
  LinearScale, PointElement, Filler
} from "chart.js"

ChartJS.register(
  Title, Tooltip, Legend,
  LineElement, CategoryScale,
  LinearScale, PointElement, Filler
)

const { getUsage } = useApi()

const chartData = ref({
  labels: [],
  datasets: []
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Time (HH:MM)"
      }
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Number of Users"
      }
    }
  }
}


let timer

async function loadData() {
  const usage = await getUsage()

  if (!usage || usage.length === 0) return

  // ⭐ สำคัญ: ต้อง replace object ใหม่
  chartData.value = {
    labels: usage.map(u => u.time),
    datasets: [{
      label: "Users",
      data: usage.map(u => u.users),
      borderWidth: 3,
      tension: 0.4,
      fill: true,
      borderColor: "#ff7a00",
      backgroundColor: "rgba(255,122,0,0.15)",
      pointRadius: 3
    }]
  }
}

onMounted(async () => {
  await loadData()
  timer = setInterval(loadData, 1500) // realtime refresh
})

onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div style="height:300px">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
