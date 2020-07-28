<template>
    <v-main>
        <v-responsive max-width="400" class="mt-10 mx-auto">
            <v-container>
                <v-dialog hide-overlay persistent max-width="400" v-model="showLoadingDialog">
                    <v-card loading loader-height="2">
                        <v-card-text class="mt-2">
                            Waiting for all players to arrive
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <v-card>
                    <v-card-title>
                        <h1 class="display-1">Room: {{ roomId }}</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-list disabled min-height="300">
                            <v-subheader>Players</v-subheader>
                            <v-list-item  v-for="user in players" :key="user">
                                <v-list-item-content>
                                    <v-list-item-title v-text="user" />
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                    <div v-if="userIsAdmin">
                        <v-divider />
                        <v-container>
                            <v-form id="stagesForm" ref="stagesForm" v-model="valid" lazy-validation @submit.prevent="validate">
                                <v-row no-gutters>
                                    <v-col>
                                        <v-text-field
                                            v-model.number="stages"
                                            :rules="[v => (v > 0)]"
                                            type="number"
                                            autofocus
                                            required
                                            :suffix="stages > 1 ? 'stages' : 'stage'"
                                            solo
                                            dense
                                            hide-details
                                        ></v-text-field>
                                    </v-col>
                                    <v-spacer />
                                    <v-col>
                                        <v-btn :disabled="!valid" type="submit" color="yellow darken-1" form="stagesForm">Start Session</v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </div>
                </v-card>
            </v-container>
        </v-responsive>
    </v-main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { SET_LAST_STAGE } from '../store/modules/game'

export default {
    name: 'lobby',
    data: () => ({
        valid: true,
    }),
    computed: {
        stages: {
            get() {
                return this.$store.state.game.lastStage
            },
            set(value) {
                this.$store.commit('game/' + SET_LAST_STAGE, value)
            }
        },
        showLoadingDialog() {
            return this.userIsAdmin == false
        },
        ...mapState({
            userIsAdmin: state => state.user.isAdmin,
            roomId: state => state.room.id,
            players: state => state.room.users.map(x => x.user_name).sort()
        })
    },
    methods: {
        validate() {
            if(this.$refs.stagesForm.validate()) {
                this.startSession()
            }
        },
        ...mapActions('lobby', [
            'startSession'
        ])
    }
}
</script>
