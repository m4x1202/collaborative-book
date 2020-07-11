import Vue from 'vue'

const showStoryPayload = {
    type: 'show_story',
    name: null,
    room: null,
    payload: ''
}

const closeRoomPayload = {
    type: 'close_room',
    name: null,
    room: null,
    payload: ''
}

const actions = {
    showStory({ rootState, rootGetters }) {
        //Prepare payload
        showStoryPayload.name = rootState.user.userName
        showStoryPayload.room = rootState.room.id
        showStoryPayload.payload = JSON.stringify({ user_name: rootState.user.userName, stage: 1 })

        if(rootGetters.connectedToServer) {
            Vue.prototype.$socket.sendObj(showStoryPayload)
        } else {
            console.error("Websocket not connected!")
        }
    },
    closeRoom({ rootState, rootGetters }) {
        //Prepare payload
        closeRoomPayload.name = rootState.user.userName
        closeRoomPayload.room = rootState.room.id

        if(rootGetters.connectedToServer) {
            Vue.prototype.$socket.sendObj(closeRoomPayload)
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
