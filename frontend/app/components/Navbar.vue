<script setup>
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "vue-router"
import { computed, onMounted, ref } from "vue"

const auth = useAuthStore()
const router = useRouter()
const open = ref(false)

onMounted(() => {
    auth.load()
})

const isLoggedIn = computed(() => auth.isLoggedIn)
const email = computed(() => auth.email || "")

const logout = () => {
    auth.logout()
    router.push("/login")
}

const toggle = () => open.value = !open.value
</script>

<template>
    <nav class="navbar">
        <div class="container nav-inner">

            <!-- LOGO -->
            <NuxtLink to="/" class="brand">
                ⚡ KMITL Net
            </NuxtLink>

            <!-- RIGHT MENU -->
            <div class="menu">

                <!-- GUEST -->
                <template v-if="!isLoggedIn">
                    <NuxtLink to="/login" class="btn">Login</NuxtLink>
                </template>

                <!-- USER -->
                <template v-else>

                    <NuxtLink to="/dashboard" class="btn">
                        Dashboard
                    </NuxtLink>

                    <!-- PROFILE -->
                    <div class="profile">
                        <button class="profile-btn" @click="toggle">
                            {{ email }}
                            <span class="arrow" :class="{ open }">
                                ▾
                            </span>
                        </button>

                        <!-- DROPDOWN -->
                        <transition name="fade">
                            <div v-if="open" class="dropdown">

                                <NuxtLink to="/profile" class="drop-item">
                                    Profile
                                </NuxtLink>

                                <button class="drop-item logout" @click="logout">
                                    Logout
                                </button>

                            </div>
                        </transition>

                    </div>

                </template>

            </div>

        </div>
    </nav>
</template>

<style scoped>
/* NAVBAR */
.navbar {
    background: linear-gradient(90deg, #F36F21, #ff914d);
    padding: 14px 0;
    box-shadow: 0 4px 18px rgba(0, 0, 0, .15);
}

/* INNER */
.nav-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* LOGO */
.brand {
    font-weight: 800;
    font-size: 20px;
    color: white;
    text-decoration: none;
    letter-spacing: .5px;
}

/* MENU */
.menu {
    display: flex;
    align-items: center;
    gap: 14px;
}

/* BUTTON */
.btn {
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 10px;
    font-weight: 600;
    transition: .25s;
}

.btn:hover {
    background: rgba(255, 255, 255, .2);
}

/* PROFILE */
.profile {
    position: relative;
}

.profile-btn {
    border: none;
    background: rgba(255, 255, 255, .2);
    color: white;
    padding: 8px 14px;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: .25s;
}

.profile-btn:hover {
    background: rgba(255, 255, 255, .35);
}

/* ARROW */
.arrow {
    margin-left: 6px;
    display: inline-block;
    transition: .3s;
}

.arrow.open {
    transform: rotate(180deg);
}

/* DROPDOWN */
.dropdown {
    position: absolute;
    right: 0;
    top: 45px;
    background: white;
    border-radius: 14px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, .18);
    overflow: hidden;
    min-width: 160px;
}

/* ITEM */
.drop-item {
    display: block;
    padding: 12px 16px;
    text-decoration: none;
    color: #333;
    font-weight: 600;
    transition: .2s;
}

.drop-item:hover {
    background: #fff3e8;
}

/* LOGOUT */
.logout {
    color: #F36F21;
}

/* ANIMATION */
.fade-enter-active,
.fade-leave-active {
    transition: .2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}

/* MOBILE */
@media(max-width:600px) {
    .brand {
        font-size: 16px;
    }

    .btn {
        padding: 6px 12px;
    }
}
</style>
