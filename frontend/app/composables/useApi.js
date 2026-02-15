export const useApi = () => {

  const config = useRuntimeConfig()
  const API = config.public.apiBase

  const handleError = (name, err) => {
    console.error(`API ERROR [${name}]`, err)
    return null
  }

  const getNetworks = async () => {
    try {
      return await $fetch(`${API}/networks`)
    } catch (err) {
      return handleError("getNetworks", err) || []
    }
  }

  const getSpeed = async () => {
    try {
      return await $fetch(`${API}/speed`)
    } catch (err) {
      return handleError("getSpeed", err)
    }
  }

  const getUsage = async () => {
    try {
      return await $fetch(`${API}/usage`)
    } catch (err) {
      return handleError("getUsage", err)
    }
  }

  /* ⭐ REPORT SYSTEM */
  const sendReport = async (data) => {
    try {
      const res = await $fetch(`${API}/report`, {
        method: "POST",
        body: {
          message: data.message,
          createdAt: new Date().toISOString()
        },
        timeout: 8000
      })

      return {
        success: true,
        data: res
      }

    } catch (err) {

      console.error("REPORT ERROR:", err)

      return {
        success: false,
        error: err?.data?.message || "Cannot send report"
      }
    }
  }

  return { getSpeed, getUsage, getNetworks, sendReport }
}
