<template>
    <v-main>
        <v-container>
            <v-row no-gutter justify="start" class="mt-10">
                <v-col cols="2">
                    <v-card>
                        <v-container>
                            <v-list disabled dense height="300">
                                <v-subheader>Players</v-subheader>
                                <v-list-item  v-for="user in players" :key="user">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="user" />
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-container>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card color="yellow darken-1">
                        <v-row>
                            <v-col>
                                Room: {{roomId}}
                            </v-col>
                            <v-col>
                                Stage: {{currentStage}}/{{lastStage}}
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card class="mt-n1">
                        <v-card-text>
                            <v-form id="submit-story-form" @submit.prevent="submitStory">
                                <v-textarea readonly outlined no-resize placeholder="The last book line will appear here once created" :value="output"></v-textarea>
                                <v-textarea :disabled="!(userStatus == 'writing')" no-resize clearable autofocus v-model="input"></v-textarea>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn :disabled="!(userStatus == 'writing')" type="submit" width="200" class="mx-auto" color="yellow darken-1" form="submit-story-form">Submit Story</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { SET_INPUT } from '../store/modules/game'

export default {
    name: 'game',
    mounted() {
        this.input = localStorage.getItem("input") || ''
    },
    computed: {
        input: {
            get() {
                return this.$store.state.game.input
            },
            set(value) {
                this.$store.commit('game/' + SET_INPUT, value)
            }
        },
        ...mapState({
            userStatus: state => state.user.status,
            currentStage: state => state.game.currentStage,
            lastStage: state => state.game.lastStage,
            output: state => state.game.output,
            roomId: state => state.room.id,
            players: state => state.room.users.map(x => x.user_name)
        })
    },
    methods: mapActions('game', [
        'submitStory'
    ])
}
</script>
