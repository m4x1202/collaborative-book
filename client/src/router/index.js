import Vue from 'vue'
import Router from 'vue-router'

import Game from '../views/Game.vue'
import Result from '../views/Result.vue'
import Login from '../views/Login.vue'
import Lobby from '../views/Lobby.vue'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', redirect: { name: 'lobby' }},
        {
            path: '/game',
            name: 'game',
            component: Game
        },
        {
            path: '/result',
            name: 'result',
            component: Result
        },
        {
            path: '/lobby',
            name: 'lobby',
            component: Lobby
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
    ]
})
