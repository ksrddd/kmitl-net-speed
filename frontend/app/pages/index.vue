<script setup>
import { useAuthStore } from "@/stores/auth"
const auth = useAuthStore()
</script>

<template>
  <div class="home-wrapper">

    <!-- HERO -->
    <section class="hero text-center">
      <div class="container">
        <h1 v-if="auth.isLoggedIn">
          Welcome {{ auth.user?.email }}
        </h1>

        <h1 v-else>
          KMITL Fast Network
        </h1>


        <p class="lead text-muted mb-4">
          Smart Network Monitoring Platform for Students & Staff
        </p>

        <div v-if="!auth.isLoggedIn" class="d-flex justify-content-center gap-3">
          <NuxtLink to="/login" class="btn btn-main px-4">
            Login
          </NuxtLink>

          <NuxtLink to="/register" class="btn btn-outline-main px-4">
            Register
          </NuxtLink>
        </div>
      </div>
    </section>


    <!-- FEATURES -->
    <section class="features py-5">
      <div class="container">

        <h2 class="text-center fw-bold mb-5">
          Platform Features
        </h2>

        <div class="row g-4">

          <div class="col-md-4">
            <div class="feature-card text-center p-4">
              ⚡
              <h5 class="mt-3">Speed Monitoring</h5>
              <p>Check real-time internet performance instantly</p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="feature-card text-center p-4">
              👥
              <h5 class="mt-3">Peak Usage Analytics</h5>
              <p>Track user load across network zones</p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="feature-card text-center p-4">
              📡
              <h5 class="mt-3">Nearby Networks</h5>
              <p>Scan available WiFi signals around you</p>
            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- CTA -->
    <section class="cta text-center py-5">
      <div class="container">
        <h3 class="fw-bold mb-3">Start Monitoring Now</h3>
        <NuxtLink to="/login" class="btn btn-main px-5">
          Go to Dashboard
        </NuxtLink>
      </div>
    </section>

  </div>
</template>


<style scoped>
.hero {
  padding: 120px 0;
  background: linear-gradient(135deg, #ffb37a, #ffd9b8);
  color: #5a2e00;
}

/* main button */
.btn-main {
  background: linear-gradient(135deg, #ff9a3c, #ff7a00);
  color: white;
  border: none;
  font-weight: 600;
  border-radius: 12px;
  padding: 10px 24px;
  transition: .25s;
}

.btn-main:hover {
  background: linear-gradient(135deg, #ff7a00, #e86a00);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(255, 122, 0, .25);
}

/* outline button */
.btn-outline-main {
  border: 2px solid #ff9a3c;
  color: #ff7a00;
  font-weight: 600;
  border-radius: 12px;
  padding: 10px 24px;
  transition: .25s;
}

.btn-outline-main:hover {
  background: #ff9a3c;
  color: white;
  box-shadow: 0 6px 18px rgba(255, 122, 0, .2);
}

/* feature cards */
.feature-card {
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff, #fff6ef);
  box-shadow: 0 10px 28px rgba(255, 122, 0, .08);
  transition: .3s;
  font-size: 28px;
  border: 1px solid #ffe2cc;
}

.feature-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 18px 40px rgba(255, 122, 0, .15);
}

/* CTA section */
.cta {
  background: linear-gradient(135deg, #fff2e6, #ffe4cc);
  border-radius: 24px;
  padding: 60px 20px;
}
</style>
