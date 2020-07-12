export const SET_USERNAME = 'SET_USERNAME'
export const SET_USER_ADMIN = 'SET_USER_ADMIN'
export const SET_USER_AUTHENTICATED = 'SET_USER_AUTHENTICATED'
export const SET_USER_STATUS = 'SET_USER_STATUS'

const state = () => ({
    userName: '',
    isAuthenticated: false,
    isAdmin: false,
    status: 'waiting'
})

const mutations = {
    [SET_USERNAME](state, userName) {
        state.userName = userName
    },
    [SET_USER_ADMIN](state, value) {
        state.isAdmin = value
    },
    [SET_USER_AUTHENTICATED](state, value) {
        state.isAuthenticated = value
    },
    [SET_USER_STATUS](state, status) {
        state.status = status
    }
}

const actions = {
    save({ state }) {
        //Save username for convenience to localStorage
        localStorage.setItem("name", state.userName)
    },
    reset({ commit }) {
        commit(SET_USER_ADMIN, false),
        commit(SET_USER_AUTHENTICATED, false),
        commit(SET_USER_STATUS, 'waiting')
    }
}

export default {
    namespaced: true,
    state,
    getters: {},
    actions,
    mutations
}
