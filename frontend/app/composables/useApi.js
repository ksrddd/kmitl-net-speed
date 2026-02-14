const API = "http://localhost:4000/api"

export const useApi = () => {

  const getSpeed = async () => {
    return await $fetch(`${API}/speed`)
  }

  const getUsage = async () => {
    return await $fetch(`${API}/usage`)
  }

  const getNetworks = async () => {
    return await $fetch(`${API}/networks`)
  }

  const sendReport = async (data) => {
    return await $fetch(`${API}/report`, {
      method: "POST",
      body: data
    })
  }

  return { getSpeed, getUsage, getNetworks, sendReport }
}
