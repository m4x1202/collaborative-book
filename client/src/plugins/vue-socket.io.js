import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"

import store from '../store'

Vue.use(new VueSocketIO({
    connection: SocketIO('ws://localhost:8081'),
    vuex: {
        store,
        actionPrefix: "SOCKET_",
    }
}))

export default {
}
