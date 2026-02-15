<script setup>
import { ref } from "vue"
import { useApi } from "../composables/useApi"

const { sendReport } = useApi()

const message = ref("")
const status = ref("")
const loading = ref(false)

const submit = async () => {

  if (!message.value.trim()) {
    status.value = "กรุณาพิมพ์ข้อความก่อนส่ง"
    return
  }

  const ok = confirm("แน่ใจแล้วใช่ไหมว่าต้องการส่งรายงานนี้?")

  if (!ok) {
    status.value = "ยกเลิกการส่ง"
    return
  }

  loading.value = true
  status.value = "กำลังส่งรายงาน..."

  const res = await sendReport({ message: message.value })

  if (res?.success) {
    status.value = "ทำการส่งรายงานเรียบร้อยแล้ว!!"
    message.value = ""
  } else {
    status.value = res?.error || "ส่งรายงานไม่สำเร็จ"
  }

  loading.value = false
}

</script>

<template>
  <div>
    <div class="card-body">

      <textarea v-model="message" class="form-control mb-2" placeholder="Type your report here..."
        :disabled="loading" />

      <button @click="submit" class="btn btn-primary ms-auto d-block" :disabled="loading">
        {{ loading ? "Sending..." : "Send" }}
      </button>

      <p class="mt-2" :class="status.includes('เรียบร้อย') ? 'text-success' : 'text-danger'">
        {{ status }}
      </p>

    </div>
  </div>
</template>
