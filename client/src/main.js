import Vue from 'vue';

import App from './App.vue';

import store from './store';
import router from './router';

import vuetify from './plugins/vuetify';

router.beforeEach(async (to, from, next) => {
    if (!store.getters.isAuthenticated && to.name !== 'login') {
    router.push('/login');
    }
    if (store.getters.isAuthenticated && to.name === 'login') {
    router.push('/');
    }
    next();
});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
