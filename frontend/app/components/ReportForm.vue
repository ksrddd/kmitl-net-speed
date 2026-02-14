<script setup>
import { ref } from "vue"
import { useApi } from "../composables/useApi"

const { sendReport } = useApi()

const message = ref("")
const status = ref("")

const submit = async () => {
  await sendReport({ message: message.value })
  status.value = "ส่งรายงานแล้ว ✅"
  message.value = ""
}
</script>

<template>
  <div class="card shadow">
    <div class="card-body">
      <h5>Report Problem</h5>

      <textarea v-model="message" class="form-control mb-2" />

      <button @click="submit" class="btn btn-primary">
        Send
      </button>

      <p class="mt-2 text-success">{{ status }}</p>
    </div>
  </div>
</template>
