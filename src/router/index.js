import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import LayoutView from '../views/event/LayoutView.vue'
import DetailView from '../views/event/DetailView.vue'
import RegisterView from '../views/event/RegisterView.vue'
import EditView from '../views/event/EditView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: (router) => ({ page: parseInt(router.query.page) || 1 }),
    },
    {
      path: '/about-us',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/about',
      redirect: { name: 'about' },
    },
    {
      path: '/events/:id/',
      name: 'event-layout',
      props: true,
      component: LayoutView,
      children: [
        {
          path: '',
          name: 'event-detail',
          component: DetailView,
        },
        {
          path: 'register',
          name: 'event-register',
          component: RegisterView,
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EditView,
        },
      ],
    },
    {
      path: '/event/:id',
      redirect: () => {
        return { name: 'event-layout' }
      },
      children: [
        { path: 'register', redirect: () => ({ name: 'event-register' }) },
        { path: 'edit', redirect: () => ({ name: 'event-edit' }) },
      ],
    },
  ],
})

export default router
