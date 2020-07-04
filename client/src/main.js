import Vue from 'vue';

import App from './App.vue';

import store from './store';
import router from './router';

import vuetify from './plugins/vuetify';
import socket from './plugins/vue-native-websocket'

router.beforeEach(async (to, from, next) => {
    if (store.state.userName == null && to.name !== 'login') {
    router.push('/login');
    }
    if (store.state.userName != null && to.name === 'login') {
    router.push('/');
    }
    next();
});

new Vue({
    router,
    store,
    vuetify,
    socket,
    render: h => h(App)
}).$mount('#app');
