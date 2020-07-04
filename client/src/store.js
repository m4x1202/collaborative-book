import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userName: null,
        room: null
    },
    mutations: {
        SET_USERNAME(state, userName) {
          state.userName = userName;
        },
        SET_ROOM(state, room) {
            state.room = room;
        }
    },
    actions: {
        login({ commit }, { username, room }) {
          commit('SET_USERNAME', username);
          commit('SET_ROOM', room);
        }
    }
});
