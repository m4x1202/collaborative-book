import Vue from 'vue'
import Vuex from 'vuex'

import conn from './modules/conn'
import user from './modules/user'
import room from './modules/room'
import login from './modules/login'
import lobby from './modules/lobby'
import game from './modules/game'
import result from './modules/result'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        conn,
        user,
        room,
        login,
        lobby,
        game,
        result
    }
})
