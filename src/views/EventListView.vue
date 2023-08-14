<script setup>
import { ref, watchEffect, computed } from 'vue'
import EventService from '../services/EventService.js'
import EventCard from '@/components/EventCard.vue'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import NProgress from 'nprogress'
const props = defineProps({
  page: {
    required: true,
  },
})

const router = useRouter()
const totalEvents = ref(0)
const events = ref(null)
onBeforeRouteUpdate((to, from, next) => {
  NProgress.start()
  setTimeout(() => {
    EventService.getEvents(2, parseInt(to.query.page) || 1)
      .then((res) => {
        next((comp) => {
          comp.events.value = res.data
          comp.totalEvents.value = res.headers['x-total-count']
          console.log(comp)
        })
      })
      .catch(() => {
        next({
          name: 'network-error',
        })
      })
      .finally(() => {
        NProgress.done()
      })
  }, 3000)
})

watchEffect(() => {
  EventService.getEvents(2, props.page)
    .then((res) => {
      events.value = res.data
      totalEvents.value = res.headers['x-total-count']
    })
    .catch(() => {
      router.push({
        name: 'network-error',
      })
    })
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return props.page < totalPages
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous</RouterLink
      >
      <RouterLink
        id="page-next"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
