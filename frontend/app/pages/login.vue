<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"

const email = ref("")
const password = ref("")
const error = ref("")
const loading = ref(false)

const router = useRouter()
const auth = useAuthStore()

/* โหลด session เผื่อ user login อยู่แล้ว */
onMounted(() => {
  auth.load()
  if (auth.isLoggedIn) {
    router.push("/")
  }
})

/* validate email */
const validEmail = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
})

/* form valid */
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

    /* ⭐ สำคัญ — ต้องส่ง email เข้า store */
    auth.login(res.token, email.value)

    /* redirect ไป home */
    router.push("/")

  } catch (err) {
    error.value = err?.data?.msg || "Invalid email or password"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-wrapper">

    <div class="auth-card">

      <h2 class="auth-title">Login</h2>

      <!-- EMAIL -->
      <div class="field">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="student_id@kmitl.ac.th">
        <small v-if="email && !validEmail">Invalid email format</small>
      </div>

      <!-- PASSWORD -->
      <div class="field">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="••••••">
      </div>

      <!-- ERROR -->
      <div v-if="error" class="alert">
        {{ error }}
      </div>

      <!-- BUTTON -->
      <button class="btn-main" @click="login" :disabled="!formValid || loading">
        {{ loading ? "Signing in..." : "Login" }}
      </button>

      <!-- FOOTER -->
      <div class="auth-footer">
        Don't have account?
        <span @click="router.push('/register')">Register</span>
      </div>

    </div>

  </div>
</template>


<style scoped>
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f7fb;
}

/* card */
.auth-card {
  width: 380px;
  background: rgba(255, 255, 255, .75);
  backdrop-filter: blur(18px);
  padding: 40px;
  border-radius: 28px;
  box-shadow:
    0 10px 40px rgba(255, 120, 0, .15),
    inset 0 0 0 1px rgba(255, 255, 255, .4);
  animation: float .5s ease;
}

/* animation */
@keyframes float {
  from {
    opacity: 0;
    transform: translateY(25px) scale(.96);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.auth-title {
  text-align: center;
  font-weight: 800;
  margin-bottom: 6px;
  color: #2b2b2b;
}

.auth-sub {
  text-align: center;
  font-size: 14px;
  margin-bottom: 25px;
  color: #777;
}

/* fields */
.field {
  margin-bottom: 18px;
}

label {
  font-weight: 600;
  font-size: 14px;
}

input {
  width: 100%;
  margin-top: 6px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #e3e3e3;
  transition: .25s;
}

input:focus {
  border-color: #ff7a00;
  box-shadow: 0 0 0 3px rgba(255, 122, 0, .15);
  outline: none;
}

small {
  color: #e00000;
  font-size: 12px;
}

/* button */
.btn-main {
  width: 100%;
  margin-top: 10px;
  padding: 14px;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  background: linear-gradient(135deg, #ff9a3c, #ff6a00);
  transition: .25s;
}

.btn-main:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(255, 120, 0, .35);
}

.btn-main:disabled {
  opacity: .5;
  cursor: not-allowed;
  transform: none;
}

/* error box */
.alert {
  background: #ffe2e2;
  color: #b30000;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 12px;
  font-size: 14px;
}

/* footer */
.auth-footer {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.auth-footer span {
  color: #ff7a00;
  font-weight: 600;
  cursor: pointer;
}

.auth-footer span:hover {
  text-decoration: underline;
}

/* responsive */
@media (max-width:500px) {
  .auth-card {
    width: 92%;
    padding: 30px 22px;
  }
}
</style>
