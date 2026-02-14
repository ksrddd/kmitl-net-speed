import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: null,
        user: null
    }),

    getters: {
        isLoggedIn: (state) => !!state.token
    },

    actions: {
        login(token, user) {
            this.token = token
            this.user = user

            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
        },

        load() {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem("token")
                const user = localStorage.getItem("user")

                if (token) this.token = token

                if (user && user !== "undefined") {
                    try {
                        this.user = JSON.parse(user)
                    } catch {
                        this.user = null
                    }
                }
            }
        }
        ,
        logout() {
            this.token = null
            this.user = null

            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    }
})
