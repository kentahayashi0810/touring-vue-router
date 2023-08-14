<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  event: {
    required: true,
  },
})

const GStore = inject('GStore')

const router = useRouter()

const register = () => {
  GStore.flashMessage =
    'You are successfully registered for ' + props.event.title

  setTimeout(() => {
    GStore.flashMessage = ''
  }, 3000)

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
