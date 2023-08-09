<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  event: {
    required: true,
  },
})

const router = useRouter()

const register = () => {
  router.push({
    name: 'event-detail',
    params: { id: props.event.id },
  })
}
</script>

<template>
  <p>Register for events here.</p>
  <button @click="register">Register Me</button>
</template>
