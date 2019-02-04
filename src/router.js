import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import auth from './utils/auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/squatter',
      name: 'squatter',
      component: () => import('./views/Squatter.vue')
    },
    {
    path: '/squat/:id',
    name: 'squat',
    component: () => import('./views/Annonce.vue')
    },    
    {
      path: '/recevoir',
      name: 'recevoir',
      component: () => import('./views/Recevoir.vue')
    },
    {
      path: '/update/:id',
      name: 'update',
      component: () => import('./views/Update_annonce.vue')
    },
    {
      path: '/top',
      name: 'top',
      component: () => import('./views/Top.vue')
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: () => import('./views/Connexion.vue'),
      beforeEnter: (to, from, next) => {
        if (auth.getLocalToken()) next("/account");
        else next();
      }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('./views/Account.vue'),
      beforeEnter: (to, from, next) => {
        if (!auth.getLocalToken()) next("/connexion");
        else next();
      },
      children: [
        {
          path: 'infos',
          name: 'infos',
          component: () => import('./views/account_children/Infos.vue') 
        },
        {
          path: 'my-created',
          name: 'my-created',
          component: () => import('./views/account_children/Squat_created.vue') 
        },
        {
          path: 'my-signed',
          name: 'my-signed',
          component: () => import('./views/account_children/Squat_signed.vue') 
        }
      ]
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('./views/User.vue')
    }
  ]
})
