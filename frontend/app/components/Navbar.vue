<script setup>
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "vue-router"

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
    auth.logout()
    router.push("/")
}
</script>

<template>
    <nav class="navbar navbar-light bg-light px-4">
        <span class="navbar-brand">KMITL NET</span>

        <div>

            <router-link to="/" class="btn btn-link">
                <span v-if="auth.isLoggedIn">
                    Welcome {{ auth.user?.email }}
                </span>
                <span v-else>
                    Home
                </span>
            </router-link>


            <template v-if="!auth.isLoggedIn">
                <router-link to="/login" class="btn btn-link">Login</router-link>
                <router-link to="/register" class="btn btn-link">Register</router-link>
            </template>

            <template v-else>
                <router-link to="/dashboard" class="btn btn-link">Dashboard</router-link>
                <button @click="logout" class="btn btn-danger btn-sm ms-2">
                    Logout
                </button>
            </template>

        </div>
    </nav>
</template>
