<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const error = ref("")
const loading = ref(false)

const router = useRouter()

// validate email
const validEmail = computed(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
})

// validate password strength
const strongPassword = computed(() => {
    return password.value.length >= 6
})

// match password
const matchPassword = computed(() => {
    return password.value === confirmPassword.value
})

// form valid
const formValid = computed(() => {
    return validEmail.value && strongPassword.value && matchPassword.value
})

const register = async () => {
    error.value = ""

    if (!formValid.value) {
        error.value = "Please fill form correctly"
        return
    }

    loading.value = true

    try {
        await $fetch("http://localhost:4000/api/auth/register", {
            method: "POST",
            body: {
                email: email.value,
                password: password.value
            }
        })

        router.push("/login")

    } catch (err) {
        error.value = err.data?.message || "Register failed"
    }
    finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="d-flex justify-content-center align-items-center vh-100">

        <div class="card shadow-lg p-4" style="width:380px;border-radius:18px">

            <h3 class="text-center mb-4 fw-bold">Create Account</h3>

            <!-- EMAIL -->
            <label class="form-label">Email</label>
            <input v-model="email" type="email" class="form-control mb-2" placeholder="example@email.com">
            <small v-if="email && !validEmail" class="text-danger">
                Invalid email format
            </small>


            <!-- PASSWORD -->
            <label class="form-label mt-3">Password</label>
            <input v-model="password" type="password" class="form-control mb-2" placeholder="At least 6 characters">
            <small v-if="password && !strongPassword" class="text-danger">
                Password must be at least 6 characters
            </small>


            <!-- CONFIRM -->
            <label class="form-label mt-3">Confirm Password</label>
            <input v-model="confirmPassword" type="password" class="form-control mb-2">
            <small v-if="confirmPassword && !matchPassword" class="text-danger">
                Password does not match
            </small>


            <!-- ERROR -->
            <div v-if="error" class="alert alert-danger mt-3 py-2">
                {{ error }}
            </div>


            <!-- BUTTON -->
            <button @click="register" :disabled="!formValid || loading" class="btn btn-primary w-100 mt-3">
                <span v-if="loading">Creating...</span>
                <span v-else>Create Account</span>
            </button>


            <!-- LOGIN LINK -->
            <div class="text-center mt-3">
                <small>
                    Already have account?
                    <a href="#" @click.prevent="router.push('/login')">
                        Login
                    </a>
                </small>
            </div>

        </div>

    </div>
</template>
