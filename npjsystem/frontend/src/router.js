import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/dashboard/Login'),
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        {
          name: 'Painel',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        {
          name: 'Processos',
          path: 'pages/processos',
          component: () => import('@/views/dashboard/Processes'),
        },
        {
          name: 'Processo Detalhado',
          path: 'pages/processDetailed/:processNumber',
          component: () => import('@/views/dashboard/ProcessDetailed'),
        },
        {
          name: 'Atendimentos',
          path: 'pages/atendimentos',
          component: () => import('@/views/dashboard/Consultations'),
        },
        // Pages
        {
          name: 'Perfil do Usuário',
          path: 'pages/usuario',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Perfil do Cliente',
          path: 'pages/cliente',
          component: () => import('@/views/dashboard/pages/Customer'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
      ],
    },
  ],
})
