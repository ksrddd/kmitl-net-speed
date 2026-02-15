<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue"
import { useApi } from "../composables/useApi"

const { getNetworks } = useApi()

const networks = ref([])
const search = ref("")
let timer = null

const fetchNetworks = async () => {
  const data = await getNetworks()
  networks.value = data.sort((a, b) => b.speed - a.speed)
}

onMounted(async () => {
  await fetchNetworks()
  timer = setInterval(fetchNetworks, 2000)
})

onUnmounted(() => clearInterval(timer))

const filtered = computed(() =>
  networks.value.filter(n =>
    n.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const getStatus = speed => {
  if (speed > 80) return { text: "Excellent", color: "#22c55e", icon: "📶", level: 100 }
  if (speed > 40) return { text: "Fair", color: "#f59e0b", icon: "📡", level: 65 }
  return { text: "Poor", color: "#ef4444", icon: "⚠️", level: 30 }
}
</script>

<template>
  <div class="network-box">

    <div class="header">
      <h2>Live Network Overview (ภาพรวมของสัญญาณวายฟาย)</h2>
      <span class="live-badge">LIVE</span>
    </div>

    <input v-model="search" placeholder="Search network..." class="search" />

    <ul class="list">
      <li v-for="(n, i) in filtered" :key="n.id" class="card">

        <div class="name">{{ n.name }}</div>

        <div class="speed">
          {{ n.speed }} <span>Mbps</span>
        </div>

        <!-- STATUS BADGE -->
        <div class="status" :style="{ background: getStatus(n.speed).color }">
          {{ getStatus(n.speed).icon }}
          {{ getStatus(n.speed).text }}
        </div>

        <!-- PROGRESS BAR -->
        <div class="bar">
          <div class="fill" :style="{
            width: getStatus(n.speed).level + '%',
            background: getStatus(n.speed).color
          }" />
        </div>

        <!-- DOT SIGNAL -->
        <div class="signal">
          <span class="dot" :style="{ background: getStatus(n.speed).color }" />
        </div>

      </li>
    </ul>

  </div>
</template>

<style scoped>
.network-box {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h2 {
  font-size: 20px;
  font-weight: 800;
}

.live-badge {
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 999px;
  color: #fff;
  background: linear-gradient(90deg, #ff7a00, #ffb347);
  animation: pulse 1.4s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 122, 0, .6)
  }

  70% {
    box-shadow: 0 0 0 10px rgba(255, 122, 0, 0)
  }

  100% {
    box-shadow: 0 0 0 0 rgba(255, 122, 0, 0)
  }
}

.search {
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid #eee;
  font-size: 14px;
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
  border-radius: 22px;
  background: rgba(255, 255, 255, .7);
  backdrop-filter: blur(10px);
  transition: .35s;
}

.card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 20px 40px rgba(0, 0, 0, .12);
}


.name {
  font-weight: 700;
  font-size: 15px;
}

.speed {
  font-size: 32px;
  font-weight: 800;
  color: #ff7a00;
}

.speed span {
  font-size: 14px;
  margin-left: 4px;
  color: #999;
}

/* STATUS */
.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 999px;
  width: fit-content;
  animation: fade .4s ease;
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(6px)
  }

  to {
    opacity: 1;
    transform: translateY(0)
  }
}

/* BAR */
.bar {
  height: 8px;
  width: 100%;
  background: #eee;
  border-radius: 20px;
  overflow: hidden;
}

.fill {
  height: 100%;
  border-radius: 20px;
  transition: all .6s cubic-bezier(.4, 2, .3, 1);
}

/* DOT */
.signal {
  margin-top: auto
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  animation: blink 1.2s infinite;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1
  }

  50% {
    opacity: .3
  }
}
</style>
