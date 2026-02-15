<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const error = ref("")
const loading = ref(false)

const router = useRouter()

const validEmail = computed(() =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
)

const strongPassword = computed(() =>
    password.value.length >= 6
)

const matchPassword = computed(() =>
    password.value === confirmPassword.value
)

const formValid = computed(() =>
    validEmail.value && strongPassword.value && matchPassword.value
)

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
    <div class="auth-bg">

        <div class="auth-card">

            <h2>Register</h2>

            <!-- EMAIL -->
            <label>Email</label>
            <input v-model="email" type="email" placeholder="student_id@kmitl.ac.th">
            <small v-if="email && !validEmail" class="error">
                Invalid email format
            </small>

            <!-- PASSWORD -->
            <label>Password</label>
            <input v-model="password" type="password" placeholder="At least 6 characters">
            <small v-if="password && !strongPassword" class="error">
                Password must be at least 6 characters
            </small>

            <!-- CONFIRM -->
            <label>Confirm Password</label>
            <input v-model="confirmPassword" type="password" placeholder="••••••">
            <small v-if="confirmPassword && !matchPassword" class="error">
                Password does not match
            </small>

            <!-- ERROR -->
            <div v-if="error" class="alert">
                {{ error }}
            </div>

            <!-- BUTTON -->
            <button @click="register" :disabled="!formValid || loading">
                {{ loading ? "Creating..." : "Create Account" }}
            </button>

            <!-- LOGIN -->
            <p class="switch">
                Already have account?
                <span @click="router.push('/login')">Login</span>
            </p>

        </div>

    </div>
</template>

<style scoped>
.auth-bg {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f6f7fb;
}

/* card */
.auth-card {
    width: 360px;
    padding: 36px;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 12px 35px rgba(0, 0, 0, .12);
    animation: fade .5s ease;
}

/* animation */
@keyframes fade {
    from {
        opacity: 0;
        transform: translateY(15px)
    }

    to {
        opacity: 1;
        transform: translateY(0)
    }
}

/* titles */
h2 {
    text-align: center;
    font-weight: 800;
    margin-bottom: 4px;
}

.subtitle {
    text-align: center;
    color: #777;
    font-size: 14px;
    margin-bottom: 22px;
}

/* form */
label {
    font-weight: 600;
    margin-top: 14px;
}

input {
    width: 100%;
    padding: 11px;
    border-radius: 12px;
    border: 1px solid #ddd;
    margin-top: 6px;
    transition: .2s;
}

input:focus {
    outline: none;
    border-color: #ff7a18;
    box-shadow: 0 0 0 3px rgba(255, 122, 24, .15);
}

/* button */
button {
    width: 100%;
    margin-top: 26px;
    padding: 13px;
    border: none;
    border-radius: 14px;
    background: #ff7a18;
    color: white;
    font-weight: 700;
    cursor: pointer;
    transition: .25s;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, .2);
}

button:disabled {
    opacity: .6;
    cursor: not-allowed;
}

/* error */
.error {
    color: #d10000;
    font-size: 12px;
}

.alert {
    margin-top: 14px;
    background: #ffe3e3;
    color: #b30000;
    padding: 10px;
    border-radius: 12px;
    font-size: 14px;
}

/* switch */
.switch {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
}

.switch span {
    color: #ff7a18;
    font-weight: 700;
    cursor: pointer;
}
</style>
