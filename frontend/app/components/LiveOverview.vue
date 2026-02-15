<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { useApi } from "../composables/useApi"

const { getNetworks } = useApi()

const total = ref(0)
const avg = ref(0)
const fastest = ref("")
const slowest = ref("")

let timer = null

const load = async () => {
    const data = await getNetworks()

    if (!data || !data.length) return

    total.value = data.length

    const speeds = data.map(n => n.speed)
    avg.value = Math.round(speeds.reduce((a, b) => a + b, 0) / speeds.length)

    const sorted = [...data].sort((a, b) => b.speed - a.speed)

    fastest.value = sorted[0].name
    slowest.value = sorted[sorted.length - 1].name
}

onMounted(async () => {
    await load()
    timer = setInterval(load, 2000)
})

onUnmounted(() => clearInterval(timer))
</script>


<template>
    <div class="overview">

        <div class="card">
            <span>Total Networks</span>
            <h2>{{ total }}</h2>
        </div>

        <div class="card">
            <span>Average Speed</span>
            <h2>{{ avg }} Mbps</h2>
        </div>

        <div class="card">
            <span>Fastest</span>
            <h3>{{ fastest }}</h3>
        </div>

        <div class="card">
            <span>Slowest</span>
            <h3>{{ slowest }}</h3>
        </div>

    </div>
</template>


<style scoped>
.overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 18px;
}

.card {
    background: linear-gradient(145deg, #ffffff, #fafafa);
    border-radius: 20px;
    padding: 22px 18px;
    text-align: center;
    border: 1px solid #eee;
    transition: .25s;
    min-height: 130px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.card:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 35px rgba(0, 0, 0, .08);
}

.card span {
    font-size: 13px;
    color: #888;
    margin-bottom: 6px;
}

.card h2 {
    font-size: 30px;
    font-weight: 800;
    color: #ff7a00;
    line-height: 1.1;
}

.card h3 {
    font-size: 18px;
    font-weight: 700;
    color: #ff7a00;
    line-height: 1.3;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
