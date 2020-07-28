import Vue from 'vue'

export const SET_INPUT = 'SET_INPUT'
export const SET_OUTPUT = 'SET_OUTPUT'
export const SET_CURRENT_STAGE = 'SET_CURRENT_STAGE'
export const SET_LAST_STAGE = 'SET_LAST_STAGE'

const submitStoryPayload = {
    type: 'submit_story',
    name: null,
    room: null,
    payload: ''
}

const state = () => ({
    input: '',
    output: '',
    currentStage: 0,
    lastStage: 1,
})

const mutations = {
    [SET_INPUT](state, input) {
        localStorage.setItem("input", input)
        state.input = input
    },
    [SET_OUTPUT](state, output) {
        state.output = output
    },
    [SET_CURRENT_STAGE](state, stage) {
        state.currentStage = stage
    },
    [SET_LAST_STAGE](state, stage) {
        state.lastStage = stage
    }
}

const actions = {
    roundUpdate({ commit }, { current, last, text }) {
        commit(SET_OUTPUT, text)
        commit(SET_CURRENT_STAGE, current)
        commit(SET_LAST_STAGE, last)
        var audio = new Audio('http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3');
        audio.play();
    },
    submitStory({ state, commit, rootState, rootGetters }) {
        //Prepare payload
        submitStoryPayload.name = rootState.user.userName
        submitStoryPayload.room = rootState.room.id
        submitStoryPayload.payload = state.input

        if(rootGetters.connectedToServer) {
            Vue.prototype.$socket.sendObj(submitStoryPayload)
        } else {
            console.error("Websocket not connected!")
        }

        localStorage.removeItem('input')
        commit(SET_INPUT, '')
    }
}

export default {
    namespaced: true,
    state,
    getters: {},
    actions,
    mutations
}
