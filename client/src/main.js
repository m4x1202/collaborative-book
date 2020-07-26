import Vue from 'vue'

import App from './App.vue'

import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import socket from './plugins/vue-socket.io'

router.beforeEach((to, from, next) => {
    if (!store.state.user.isAuthenticated && to.name !== 'login') next({ name: 'login' })
    else if (store.state.user.isAuthenticated && to.name === 'login') next('/')
    else next()
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    socket,
    render: h => h(App)
}).$mount('#app')
