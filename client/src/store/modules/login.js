import Vue from 'vue'

const loginPayload = {
    type: 'registration',
    name: null,
    room: null,
    payload: ''
}

const actions = {
    registration({ dispatch, rootState, rootGetters }) {
        // Call action in game module to setup game
        dispatch('user/save', null, { root: true })

        //Prepare payload
        loginPayload.name = rootState.user.userName
        loginPayload.room = rootState.room.id

        // Check wether we are actually connected to the server before sending the socket event
        if(rootGetters.connectedToServer) {
            Vue.prototype.$socket.sendObj(loginPayload)
        } else {
            console.error("Websocket not connected!")
        }
    }
}

export default {
    namespaced: true,
    state: {},
    getters: {},
    actions,
    mutations: {}
}
