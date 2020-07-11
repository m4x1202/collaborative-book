<template>
    <v-main>
        <v-responsive max-width="400" class="mt-10 mx-auto">
            <v-container>
                <v-card>
                    <v-card-title>
                        <h1 class="display-1">Enter Room</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-form id="loginForm" ref="loginForm" v-model="valid" lazy-validation @submit.prevent="validate">
                            <v-text-field
                                prepend-icon="mdi-account-circle"
                                label="Name"
                                v-model="username"
                                :rules="nameRules"
                                autofocus
                                required
                            ></v-text-field>
                            <v-text-field
                                prepend-icon="mdi-google-classroom"
                                label="Room"
                                v-model="room"
                                :rules="roomRules"
                                required
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-divider />
                    <v-card-actions>
                        <v-btn :disabled="!valid" type="submit" width="200" class="mx-auto" color="yellow darken-1" form="loginForm">Enter Room</v-btn>
                    </v-card-actions>
                </v-card>
                <v-card class="mt-5">
                    <v-card-text>
                        <v-row no-gutters>
                            <v-col>
                                Connection to server:
                            </v-col>
                            <v-col>
                                <v-icon v-if="connectedToServer">mdi-lan-check</v-icon>
                                <v-icon v-else>mdi-lan-disconnect</v-icon>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-responsive>
    </v-main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { SET_USERNAME } from '../store/modules/user'
import { SET_ROOM_ID } from '../store/modules/room'

export default {
    name: 'login',
    data: () => ({
        valid: true,
        nameRules: [
            v => !!v || 'Name is required',
            v => (v.length >= 3 && v.length <= 10) || 'Name must be between 3 and 10 characters',
        ],
        roomRules: [
            v => !!v || 'Room is required',
            v => (v.length >= 3 && v.length <= 10) || 'Room must be between 3 and 10 characters',
        ],
    }),
    mounted() {
        this.username = localStorage.getItem("name") || ''
    },
    computed: {
        username: {
            get() {
                return this.$store.state.user.userName
            },
            set(value) {
                this.$store.commit('user/' + SET_USERNAME, value)
            }
        },
        room: {
            get() {
                return this.$store.state.room.id
            },
            set(value) {
                this.$store.commit('room/' + SET_ROOM_ID, value)
            }
        },
        ...mapGetters([
            'connectedToServer'
        ])
    },
    methods: {
        validate() {
            if(this.$refs.loginForm.validate()) {
                this.registration()
            }
        },
        ...mapActions('login', [
            'registration'
        ])
    }
}
</script>
