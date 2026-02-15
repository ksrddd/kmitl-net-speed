<script setup>
import { useAuthStore } from "@/stores/auth"
import { computed, onMounted, onUnmounted, ref } from "vue"

const auth = useAuthStore()

const networks = ref([])
let timer = null

async function loadNetworks() {
  const res = await fetch("/api/networks")
  networks.value = await res.json()
}

onMounted(() => {
  auth.load()

  loadNetworks() // โหลดครั้งแรก

  timer = setInterval(loadNetworks, 1000) // realtime
})

onUnmounted(() => {
  clearInterval(timer)
})

const email = computed(() => auth.user?.email || "")
</script>



<template>
  <div class="home-wrapper">

    <!-- HERO -->
    <!-- HERO -->
    <section class="hero text-center">
      <div class="container">

        <!-- LOGIN STATE -->
        <div v-if="auth.isLoggedIn" class="welcome-pro">

          <img src="/kmitl-logo.png" class="welcome-logo" />

          <h1>Welcome back!!</h1>

          <div class="user-chip">
            <span class="dot"></span>
            {{ auth.email }}
          </div>

        </div>


        <!-- GUEST STATE -->
        <h1 v-else>
          <img src="/kmitl-logo.png" class="welcome-logo" />
          <br>
          KMITL Fast Network
        </h1>

        <p class="lead text-muted mb-3 mt-4">
          KMITL Smart Network Dashboard helps you check internet speed, see network usage, and find Wi-Fi easily around campus.
        </p>


        <div v-if="!auth.isLoggedIn" class="d-flex justify-content-center gap-3">
          <NuxtLink to="/login" class="btn btn-main px-3.5">
            Login
          </NuxtLink>

          <NuxtLink to="/register" class="btn btn-outline-main px-3.5">
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
              <p>Check internet speed in real time to see how fast your connection is on campus.</p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="feature-card text-center p-4">
              👥
              <h5 class="mt-3">Peak Usage Analytics</h5>
              <p>See when the network is busy so you can choose the best time to go online.</p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="feature-card text-center p-4">
              📡
              <h5 class="mt-3">Nearby Wi-fi Networks</h5>
              <p>This system helps students check internet speed, see network usage, and find Wi-Fi easily around
                campus.</p>
            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- CTA -->
    <section class="cta text-center py-5">
      <div class="container">
        <h3 class="fw-bold mb-3">Start Monitoring Now</h3>
        <NuxtLink to="/dashboard" class="btn btn-primary">
          Go to Dashboard
        </NuxtLink>
      </div>
    </section>

  </div>
</template>


<style scoped>
/* ================= HERO ================= */
.hero {
  position: relative;
  padding: 140px 20px;
}

/* glass container */
.hero .container {
  position: relative;
  z-index: 2;

  max-width: 720px;
  margin: auto;

  padding: 60px 40px;

  background: rgba(255, 255, 255, .25);
  backdrop-filter: blur(18px);

  border-radius: 28px;

  box-shadow:
    0 20px 60px rgba(0, 0, 0, .08),
    inset 0 1px rgba(255, 255, 255, .4);
}

/* glow orbs */
.hero::before {
  content: "";
  position: absolute;
  width: 300px;
  height: 300px;
  background: #ff7a00;
  border-radius: 50%;
  filter: blur(90px);
  opacity: .35;
  top: -80px;
  left: -80px;
}

.hero::after {
  content: "";
  position: absolute;
  width: 260px;
  height: 260px;
  background: #ffb347;
  border-radius: 50%;
  filter: blur(90px);
  opacity: .35;
  bottom: -100px;
  right: -80px;
}

/* title */
.hero h1 {
  font-size: 42px;
  font-weight: 900;
  background: linear-gradient(90deg, #ff7a00, #ffb347);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* subtitle */
.hero p {
  font-size: 18px;
  opacity: .8;
}

/* ================= BUTTONS ================= */

.btn-main {
  background: linear-gradient(135deg, #ff9a3c, #ff7a00);
  color: white;
  border: none;
  font-weight: 600;
  border-radius: 14px;
  padding: 12px 28px;
  box-shadow: 0 6px 18px rgba(255, 122, 0, .25);
}

.btn-main:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(255, 122, 0, .35);
}

.btn-outline-main {
  border: 2px solid #ff9a3c;
  color: #ff7a00;
  font-weight: 600;
  border-radius: 14px;
  padding: 12px 28px;
  background: white;
}

.btn-outline-main:hover {
  background: #ff9a3c;
  color: white;
  transform: translateY(-3px);
}

/* ================= FEATURES ================= */

.features {
  padding: 100px 0;
}

.feature-card {
  border-radius: 24px;
  background: rgba(255, 255, 255, .7);
  backdrop-filter: blur(12px);
  box-shadow: 0 18px 50px rgba(255, 122, 0, .1);
  transition: .35s;
  font-size: 32px;
  border: 1px solid rgba(255, 140, 60, .2);
}

.feature-card:hover {
  transform: translateY(-12px) scale(1.03);
  box-shadow: 0 30px 80px rgba(255, 122, 0, .18);
}

.feature-card h5 {
  font-weight: 700;
  color: #5a2e00;
}

.feature-card p {
  font-size: 15px;
  opacity: .7;
}

/* ================= CTA ================= */

.cta {
  margin: 80px auto;
  max-width: 800px;
  background: linear-gradient(135deg, #fff2e6, #ffe4cc);
  border-radius: 32px;
  padding: 70px 30px;
  box-shadow: 0 25px 80px rgba(255, 122, 0, .12);
}

.cta h3 {
  font-weight: 800;
  color: #5a2e00;
}

/* ================= MOBILE ================= */

@media(max-width:768px) {

  .hero {
    padding: 100px 20px;
  }

  .hero .container {
    padding: 40px 25px;
  }

  .hero h1 {
    font-size: 30px;
  }

  .feature-card {
    font-size: 28px;
  }
}

/* ===== WELCOME PRO ===== */

.welcome-pro h1 {
  font-size: 42px;
  font-weight: 900;
  background: linear-gradient(90deg, #ff7a00, #ffb347);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}

.user-chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 12px 22px;
  border-radius: 40px;

  background: white;
  color: #ff7a00;

  font-weight: 600;
  font-size: 15px;

  box-shadow:
    0 10px 30px rgba(255, 122, 0, .18),
    inset 0 1px rgba(255, 255, 255, .6);

  border: 1px solid rgba(255, 140, 60, .25);

  transition: .3s;
}

.user-chip:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 14px 40px rgba(255, 122, 0, .25);
}

/* online dot */
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 10px #22c55e;
}

.welcome-logo {
  width: 90px;
  margin-bottom: 18px;
  animation: floatLogo 3s ease-in-out infinite;
  filter: drop-shadow(0 8px 20px rgba(255, 122, 0, .35));
}

@keyframes floatLogo {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}
</style>
