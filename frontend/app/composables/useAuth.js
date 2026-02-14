export const useAuth = () => {

    const token = useState("token", () => null)
    const user = useState("user", () => null)

    const login = (data) => {
        token.value = data.token
        user.value = data.user
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
    }

    const logout = () => {
        token.value = null
        user.value = null
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

    const load = () => {
        const t = localStorage.getItem("token")
        const u = localStorage.getItem("user")

        if (t) token.value = t
        if (u) user.value = JSON.parse(u)
    }

    return { token, user, login, logout, load }
}
