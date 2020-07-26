import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

import store from '../store'

Vue.use(VueNativeSock, 'ws://' + (process.env.SERVER_HOST || localStorage.getItem("SERVER_HOST")) + ':' + (process.env.SERVER_PORT || localStorage.getItem("SERVER_PORT")), {
    reconnection: true,
    reconnectionDelay: 3000,
    store: store,
    format: 'json',
    passToStoreHandler: function(eventName, event) {
        if (!eventName.startsWith('SOCKET_')) { return }
        let target = eventName.toUpperCase()
        let msg = event
        if (this.format === 'json' && event.data) {
            msg = JSON.parse(event.data)
        }
        this.store['dispatch'](target, msg)
    }
})

export default {
}
