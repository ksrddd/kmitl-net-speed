<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { useApi } from "@/composables/useApi"

const { getSpeed } = useApi()

const download = ref(0)
const upload = ref(0)
const ping = ref(0)

let interval = null

const fetchSpeed = async () => {
  const res = await getSpeed()
  download.value = res.download
  upload.value = res.upload
  ping.value = res.ping
}

onMounted(() => {
  fetchSpeed()
  interval = setInterval(fetchSpeed, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="speed-wrapper">

    <!-- DOWNLOAD -->
    <div class="meter">
      <div class="label">Download</div>
      <div class="value">{{ download }} Mbps</div>

      <div class="bar">
        <div class="fill download" :style="{ width: download + '%' }"></div>
      </div>
    </div>

    <!-- UPLOAD -->
    <div class="meter">
      <div class="label">Upload</div>
      <div class="value">{{ upload }} Mbps</div>

      <div class="bar">
        <div class="fill upload" :style="{ width: upload + '%' }"></div>
      </div>
    </div>

    <!-- PING -->
    <div class="ping">
      Ping: {{ ping }} ms
    </div>

  </div>
</template>

<style scoped>
.speed-wrapper {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* meter block */
.meter {
  background: #fafafa;
  padding: 18px;
  border-radius: 16px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, .08);
}

/* label */
.label {
  font-size: 13px;
  color: #888;
  margin-bottom: 4px;
}

/* value */
.value {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 10px;
  color: #333;
}

/* bar */
.bar {
  height: 10px;
  border-radius: 20px;
  background: #eee;
  overflow: hidden;
}

/* fill */
.fill {
  height: 100%;
  border-radius: 20px;
  transition: width .7s ease;
}

/* colors */
.download {
  background: linear-gradient(90deg, #22c55e, #4ade80);
}

.upload {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
}

/* ping */
.ping {
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  color: #ff7a00;
  background: #fff5eb;
  padding: 12px;
  border-radius: 14px;
}
</style>
