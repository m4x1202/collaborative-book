import Vue from 'vue'

const startSessionPayload = {
    type: 'start_session',
    name: null,
    room: null,
    payload: ''
}

const actions = {
    startSession({ rootState, rootGetters }) {
        //Prepare payload
        startSessionPayload.name = rootState.user.userName
        startSessionPayload.room = rootState.room.id
        startSessionPayload.payload = JSON.stringify({ last_stage: rootState.game.lastStage })

        // Check wether we are actually connected to the server before sending the socket event
        if(rootGetters.connectedToServer) {
            Vue.prototype.$socket.sendObj(startSessionPayload)
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
