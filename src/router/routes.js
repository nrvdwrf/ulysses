
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'index', path: '', component: () => import('pages/Index.vue') },
      { name: 'login', path: 'login', component: () => import('pages/login.vue') },
      { name: 'buckets', path: 'buckets', component: () => import('pages/buckets.vue') },
      { name: 'buckets.edit', path: 'buckets/:id', component: () => import('pages/buckets_show.vue') },
      { name: 'productions', path: 'productions', component: () => import('pages/productions.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
