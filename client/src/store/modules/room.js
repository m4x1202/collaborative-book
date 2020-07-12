export const SET_ROOM_ID = 'SET_ROOM_ID'
export const SET_ROOM_USERS = 'SET_ROOM_USERS'

const state = () => ({
    id: '',
    users: []
})

const mutations = {
    [SET_ROOM_ID](state, roomId) {
        state.id = roomId
    },
    [SET_ROOM_USERS](state, users) {
        state.users = users
    }
}

const actions = {
    reset({ commit }) {
        commit(SET_ROOM_ID, ''),
        commit(SET_ROOM_USERS, [])
    }
}


export default {
    namespaced: true,
    state,
    getters: {},
    actions,
    mutations
}
