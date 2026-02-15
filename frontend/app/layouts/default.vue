<script setup>
import { useAuthStore } from "@/stores/auth"
import { useRoute, navigateTo } from "#imports"
import { computed } from "vue"

const auth = useAuthStore()
const route = useRoute()

const email = computed(() => auth.user?.email || "")

const logout = async () => {
  await auth.logout()
  navigateTo("/")
}

/* active menu */
const isActive = (path) => route.path === path
</script>


<template>
  <div class="layout">

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg custom-nav">
      <div class="container">

        <!-- Logo -->
        <NuxtLink class="navbar-brand fw-semibold brand d-flex align-items-center gap-2" to="/">
          <img src="/kmitl-logo.png" class="nav-logo"/>
          KMITL Fast Network
        </NuxtLink>


        <!-- Toggle -->
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menu -->
        <div class="collapse navbar-collapse" id="nav">
          <ul class="navbar-nav ms-auto align-items-center gap-2">

            <li>
              <NuxtLink class="nav-btn" to="/">
                Home
              </NuxtLink>
            </li>

            <li v-if="auth.isLoggedIn">
              <NuxtLink class="nav-btn" to="/dashboard">
                Dashboard
              </NuxtLink>
            </li>

            <!-- logout -->
            <li v-if="auth.isLoggedIn">
              <button class="nav-btn danger" @click="logout">
                Logout
              </button>
            </li>

            <!-- login -->
            <li v-if="!auth.isLoggedIn">
              <NuxtLink class="nav-btn primary" to="/login">
                Login
              </NuxtLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>


    <!-- Content -->
    <main class="container main-content">
      <slot />
    </main>


    <!-- Footer -->
    <footer class="footer">
      © Integrated Thinking Semester 2/2568 - KMITL Fast Network Project
    </footer>

  </div>
</template>


<style scoped>
/* layout */
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 30px;
}

/* navbar */
.custom-nav {
  background: linear-gradient(90deg, #ff7a00, #ffb347);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(255, 255, 255, .2);
  padding: 12px 0;
}

/* logo */
.brand {
  color: white;
  font-size: 1.2rem;
}

/* email */
.user-email {
  color: white;
  font-size: .9rem;
  opacity: .9;
}

/* nav buttons */
.nav-btn {
  border: none;
  background: transparent;
  color: white;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: .9rem;
  text-decoration: none;
  transition: .2s;
}

/* hover */
.nav-btn:hover {
  background: rgba(255, 255, 255, .2);
}

/* login button */
.primary {
  background: white;
  color: #ff7a00;
  font-weight: 600;
}

.primary:hover {
  background: #fff3e6;
}

/* logout */
.danger {
  background: #fff;
  color: #e53935;
  font-weight: 600;
}

.danger:hover {
  background: #ffeaea;
}

/* footer */
.footer {
  text-align: center;
  padding: 16px;
  background: #111;
  color: #aaa;
  font-size: .85rem;
}

.nav-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, .25));
}
</style>
