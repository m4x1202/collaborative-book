import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userName: null,
        socket: {
            isConnected: false,
        },
        room: {
            id: null,
            registered: false,
            users: [],
            state: 0
        }
    },
    mutations: {
        SET_USERNAME(state, userName) {
            state.userName = userName;
        },
        SET_ROOM(state, room) {
            state.room.id = room;
        },
        SOCKET_ONOPEN (state, event)  {
            Vue.prototype.$socket = event.currentTarget
            console.log(event.currentTarget)
            state.socket.isConnected = true
        },
        SOCKET_ONCLOSE (state)  {
            state.socket.isConnected = false
        },
        SOCKET_ONERROR (state, event)  {
            console.error(state, event)
        },
        // default handler called for all methods
        SOCKET_ONMESSAGE (state, message)  {
            console.log(message)
            switch(message.type) {
                case "registration":
                    state.room.registered = message.result == "success" ? true : false
                    console.info("Room registration successful")
                break;
                case "room_update":
                    state.room.users = message.user_list
                break;
                case "round_update":
                break;
                case "show_story":
                break;
                case "close_room":
                break;
                default:
            }
        },
        // mutations for reconnect methods
        SOCKET_RECONNECT(state, count) {
            console.info(state, count)
        },
        SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true;
        },
    },
    actions: {
        registration({ commit }, { username, room }) {
            commit('SET_USERNAME', username);
            commit('SET_ROOM', room);
            if(this.state.socket.isConnected) {
                Vue.prototype.$socket.sendObj({type: 'registration', name: this.state.userName, room: room, payload: ''})
            } else {
                console.error("Websocket not connected!")
            }
        },
        startSession() {
            Vue.prototype.$socket.sendObj({type: 'start_session', name: this.state.userName, room: this.state.room.id, payload: JSON.stringify({ last_stage: 2 })})
        },
        submitStory() {
            Vue.prototype.$socket.sendObj({type: 'submit_story', name: this.state.userName, room: this.state.room.id, payload: ''})
        },
        showStory() {
            Vue.prototype.$socket.sendObj({type: 'show_story', name: this.state.userName, room: this.state.room.id, payload: JSON.stringify({ user_name: this.state.userName, stage: 1 })})
        },
        closeRoom() {
            Vue.prototype.$socket.sendObj({type: 'close_room', name: this.state.userName, room: this.state.room.id, payload: ''})
        },

    }
});
