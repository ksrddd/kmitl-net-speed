import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: null,
        email: null
    }),

    getters: {
        isLoggedIn: (state) => !!state.token
    },

    actions: {
        login(token, email) {
            this.token = token
            this.email = email
            localStorage.setItem("token", token)
            localStorage.setItem("email", email)
        },

        logout() {
            this.token = null
            this.email = null
            localStorage.removeItem("token")
            localStorage.removeItem("email")
        },

        load() {
            if (process.client) {
                this.token = localStorage.getItem("token")
                this.email = localStorage.getItem("email")
            }
        }

    }
})
