export const useApi = () => {
  const base = "http://localhost:4000/api"

  return {
    speed: () => $fetch(`${base}/speed`),
    usage: () => $fetch(`${base}/usage`),
    networks: (l) => $fetch(`${base}/networks?location=${l}`),
    report: (d) => $fetch(`${base}/report`, {
      method: "POST",
      body: d
    })
  }
}
