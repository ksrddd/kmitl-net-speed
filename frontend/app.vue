<script setup>
import Navbar from "@/components/Navbar.vue"
import { useAuthStore } from "@/stores/auth"
const auth = useAuthStore()
auth.load()
</script>

<template>
  <div>

    <nav class="navbar navbar-expand-lg shadow-sm" style="background:#F36F21;">
      <div class="container">
        <NuxtLink class="navbar-brand fw-bold text-white" to="/">
          KMITL NET
        </NuxtLink>

        <div class="navbar-nav ms-auto">
          <NuxtLink class="nav-link text-white" to="/">Home</NuxtLink>
          <NuxtLink class="nav-link text-white" to="/dashboard">Dashboard</NuxtLink>
          <NuxtLink class="nav-link text-white" to="/login">Login</NuxtLink>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <NuxtPage />
    </div>

  </div>
</template>



<style>
:root {
  --primary: #F36F21;
  --primary-soft: #FFF3EB;
  --cream: #FFF8F3;
  --text-dark: #2b2b2b;
}

body {
  background: var(--cream);
  color: var(--text-dark);
}

.btn-primary {
  background: var(--primary) !important;
  border: none !important;
}

.card {
  border-radius: 18px !important;
}
</style>
