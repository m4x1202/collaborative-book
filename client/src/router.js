import Vue from 'vue';
import Router from 'vue-router';

import Game from './views/Game.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
    routes: [
        { path: '/', redirect: '/game' },
        {
          path: '/game',
          name: 'game',
          component: Game
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        },
    ]
});
