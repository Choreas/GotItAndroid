import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'idle', component: () => import('pages/Idle.vue') },
      { path: 'code', component: () => import('pages/Code.vue') },
      { path: 'finish', component: () => import('pages/Finish.vue') },
      { path: 'question', component: () => import('pages/Question.vue') },
      { path: 'rate', component: () => import('pages/Rate.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
