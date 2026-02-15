<script setup>
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "vue-router"
import { onMounted } from "vue"

const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
  auth.load()
})

const logout = () => {
  auth.logout()
  router.push("/")
}
</script>


<template>
  <div>

    <nav class="navbar navbar-expand-lg shadow-sm" style="background:#F36F21;">
      <div class="container">

        <NuxtLink class="navbar-brand fw-bold text-white" to="/">
          KMITL NET
        </NuxtLink>

        <div class="navbar-nav ms-auto">

          <!-- Home -->
          <NuxtLink class="nav-link text-white" to="/">
            <span v-if="auth.isLoggedIn">
              Welcome {{ auth.user?.email }}
            </span>
            <span v-else>
              Home
            </span>
          </NuxtLink>

          <!-- Dashboard -->
          <NuxtLink v-if="auth.isLoggedIn" class="nav-link text-white" to="/dashboard">
            Dashboard
          </NuxtLink>

          <!-- Login -->
          <NuxtLink v-if="!auth.isLoggedIn" class="nav-link text-white" to="/login">
            Login
          </NuxtLink>

          <!-- Logout -->
          <button v-if="auth.isLoggedIn" class="nav-link text-white btn btn-link" @click="logout">
            Logout
          </button>

        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <NuxtPage />
    </div>

  </div>
</template>
