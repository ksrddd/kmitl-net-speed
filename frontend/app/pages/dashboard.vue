<script setup>
import SpeedTest from "../components/SpeedTest.vue"
import PeakUsers from "../components/PeakUsers.vue"
import NearbyNetworks from "../components/NearbyNetworks.vue"
import ReportForm from "../components/ReportForm.vue"
import { useAuthStore } from "@/stores/auth"
import LiveOverview from "@/components/LiveOverview.vue"

const auth = useAuthStore()

definePageMeta({
  middleware: "auth"
})
</script>

<template>
  <div class="dashboard-wrapper">

    <!-- HEADER -->
    <div class="dashboard-header">
      <h2>Dashboard</h2>
      <p>Monitor your network performance & report issues</p>
    </div>

    <!-- GRID -->
    <div class="grid">

      <!-- NEARBY + LIVE -->
      <div class="card-block wide">
        <div class="card-head">📡 Nearby Wi-fi Networks (สัญญาณวายฟายใกล้ฉัน)</div>

        <div class="nearby-row">
          <div class="panel">
            <LiveOverview />
          </div>

          <div class="panel">
            <NearbyNetworks />
          </div>
        </div>
      </div>


      <!-- SPEED + PEAK (ROW) -->
      <div class="card-block full">
        <div class="dual-row">

          <div class="inner-card">
            <div class="card-head">⚡ Speed Monitoring (ความเร็วสัญญาณวายฟาย) </div>
            <SpeedTest />
          </div>

          <div class="inner-card">
            <div class="card-head">👥 Peak Users Timing (ช่วงเวลาที่มีผู้ใช้งานสูงสุด)</div>
            <PeakUsers />
          </div>

        </div>
      </div>


      <!-- REPORT -->
      <div class="card-block full">
        <div class="card-head flex">
          <span>📝 Report Problem (รายงานปัญหา)</span>
        </div>
        <ReportForm />
      </div>

    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  min-height: 100vh;
  padding: 60px 20px;
  font-family: 'Inter', system-ui;
  background: #f6f7fb;
  animation: fade .5s ease;
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(10px)
  }

  to {
    opacity: 1;
    transform: translateY(0)
  }
}

/* HEADER */
.dashboard-header {
  text-align: center;
  margin-bottom: 40px;
}

.dashboard-header h2 {
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(90deg, #ff8c00, #ff5e00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dashboard-header p {
  color: #777;
  font-size: 15px;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px;
  max-width: 1250px;
  margin: auto;
}

/* CARD */
.card-block {
  background: #fff;
  border-radius: 22px;
  padding: 26px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, .06);
  border: 1px solid rgba(255, 140, 0, .08);
  transition: .35s;
  display: flex;
  flex-direction: column;
}

.card-block:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, .12);
  border: 1px solid rgba(255, 140, 0, .25);
}

/* SIZE */
.wide {
  grid-column: 1/-1
}

.full {
  grid-column: 1/-1
}

/* HEAD */
.card-head {
  font-weight: 700;
  margin-bottom: 18px;
  font-size: 17px;
  color: #222;
}

/* NEARBY */
.nearby-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.panel {
  background: #fafafa;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid #eee;
  min-width: 0;
  overflow: hidden;
}

/* SPEED + PEAK ROW */
.dual-row {
  display: flex;
  gap: 24px;
}

.inner-card {
  flex: 1;
  background: #fff;
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, .05);
  border: 1px solid rgba(255, 140, 0, .08);
}

/* MOBILE */
@media(max-width:800px) {
  .dual-row {
    flex-direction: column
  }

  .nearby-row {
    grid-template-columns: 1fr
  }

  .grid {
    grid-template-columns: 1fr
  }
}
</style>
