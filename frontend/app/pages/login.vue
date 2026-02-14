<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"

const email = ref("")
const password = ref("")
const error = ref("")
const loading = ref(false)

const router = useRouter()
const auth = useAuthStore()

// validate email
const validEmail = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
})

// form valid
const formValid = computed(() => {
  return validEmail.value && password.value.length > 0
})

const login = async () => {
  error.value = ""

  if (!formValid.value) {
    error.value = "Please enter valid email and password"
    return
  }

  loading.value = true

  try {
    const res = await $fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value
      }
    })

    // ⭐ เปลี่ยนตรงนี้
    auth.login(res.token, {
      email: email.value
    })


    router.push("/dashboard")

  } catch (err) {
    error.value = err.data?.msg || "Login failed"
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100">

    <div class="card shadow-lg p-4" style="width:380px;border-radius:18px">

      <h3 class="text-center mb-4 fw-bold">Login</h3>

      <!-- EMAIL -->
      <label class="form-label">Email</label>
      <input v-model="email" type="email" class="form-control mb-2" placeholder="example@email.com">
      <small v-if="email && !validEmail" class="text-danger">
        Invalid email format
      </small>

      <!-- PASSWORD -->
      <label class="form-label mt-3">Password</label>
      <input v-model="password" type="password" class="form-control">

      <!-- ERROR -->
      <div v-if="error" class="alert alert-danger mt-3 py-2">
        {{ error }}
      </div>

      <!-- BUTTON -->
      <button @click="login" :disabled="!formValid || loading" class="btn btn-primary w-100 mt-3">
        <span v-if="loading">Logging in...</span>
        <span v-else>Login</span>
      </button>

      <!-- REGISTER LINK -->
      <div class="text-center mt-3">
        <small>
          Don't have account?
          <a href="#" @click.prevent="router.push('/register')">
            Register
          </a>
        </small>
      </div>

    </div>

  </div>
</template>
