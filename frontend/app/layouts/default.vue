<script setup>
import { useAuthStore } from "@/stores/auth"
import { onMounted } from "vue"

const auth = useAuthStore()

onMounted(() => {
  auth.load()
})
</script>

<template>
  <div>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div class="container">
        <a class="navbar-brand fw-bold">KMITL Fast Network</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="nav">
          <ul class="navbar-nav ms-auto gap-3">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/">Home</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/dashboard">Dashboard</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Content -->
    <main class="page-wrapper">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-light text-center py-3">
      © 2026 My Project
    </footer>

  </div>
</template>

<style scoped>
.page-wrapper {
  min-height: calc(100vh - 120px);
}
</style>
