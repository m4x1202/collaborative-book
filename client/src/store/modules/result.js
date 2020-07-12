import Vue from 'vue'

export const SET_STORIES = 'SET_STORIES'

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

const state = () => ({
    stories: [],
})

const mutations = {
    [SET_STORIES](state, stories) {
        state.stories = stories
    },
}

const actions = {
    displayStory({ commit }, { stories, userName }) {
        console.log(userName)
        commit(SET_STORIES, stories)
    },
    showStory({ rootState, rootGetters }, { player, stage}) {
        //Prepare payload
        showStoryPayload.name = rootState.user.userName
        showStoryPayload.room = rootState.room.id
        showStoryPayload.payload = JSON.stringify({ user_name: player, stage: stage })

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
    state,
    getters: {},
    actions,
    mutations
}
