import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

import store from '../store'

Vue.use(VueNativeSock, 'ws://localhost:8081', {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
    store: store,
    format: 'json'
})

export default {
}
