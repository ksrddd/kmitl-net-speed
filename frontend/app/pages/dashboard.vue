<script setup>
import SpeedTest from "../components/SpeedTest.vue"
import PeakUsers from "../components/PeakUsers.vue"
import NearbyNetworks from "../components/NearbyNetworks.vue"
import ReportForm from "../components/ReportForm.vue"

definePageMeta({
  middleware: "auth"
})
</script>

<template>
  <div class="dashboard-wrapper">

    <h2 class="title">Dashboard</h2>

    <div class="grid">

      <div class="item">
        <SpeedTest />
      </div>

      <div class="item">
        <PeakUsers />
      </div>

      <div class="item">
        <NearbyNetworks />
      </div>

      <div class="item">
        <ReportForm />
      </div>

    </div>

  </div>
</template>

<style scoped>
.dashboard-wrapper {
  min-height: 100vh;
  padding: 40px 20px;
  background: #f8f9fb;
}

/* title */
.title {
  text-align: center;
  font-weight: 700;
  margin-bottom: 35px;
  color: #2d2d2d;
}

/* grid layout */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 1100px;
  margin: auto;
}

/* widget card */
.item {
  background: white;
  padding: 22px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, .06);
  transition: .25s;
}

.item:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, .08);
}

/* responsive */
@media(max-width:768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
