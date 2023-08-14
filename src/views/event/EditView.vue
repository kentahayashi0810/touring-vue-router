<script setup>
import { ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
// defineProps({
//   event: {
//     required: true,
//   },
// })

const unsavedChange = ref(false)
onBeforeRouteLeave((to, from) => {
  if (unsavedChange.value) {
    const answer = window.confirm(
      'You have unsaved changes. Do you really want to leave?'
    )

    return answer
  }
})
const toggleUnsavedChange = () => {
  unsavedChange.value = !unsavedChange.value
  console.log('Unsaved Change: ' + unsavedChange.value)
}
</script>

<template>
  <p>Edit event here.</p>
  <button @click="toggleUnsavedChange">Toggle unsaved change status</button>
</template>
