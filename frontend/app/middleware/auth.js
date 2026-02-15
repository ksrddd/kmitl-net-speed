export default defineNuxtRouteMiddleware(() => {
    const auth = useAuthStore()

    // โหลด token ก่อนเช็ค
    if (!auth.token) {
        auth.load()
    }

    if (!auth.isLoggedIn) {
        return navigateTo("/login")
    }
})
