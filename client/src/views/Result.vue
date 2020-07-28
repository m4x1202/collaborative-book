<template>
    <v-main>
        <v-container>
            <v-row no-gutter justify="start" class="mt-10">
                <v-col cols="2">
                    <v-card>
                        <v-container>
                            <v-list :disabled="!userIsAdmin" dense height="300">
                                <v-subheader>Players</v-subheader>
                                <v-list-item-group v-model="owner" color="yellow darken-1">
                                    <v-list-item  v-for="user in players" :key="user">
                                        <v-list-item-content>
                                            <v-list-item-title v-text="user" />
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-container>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card color="yellow darken-1">
                        <v-card-title>
                            Room: {{roomId}}
                        </v-card-title>
                    </v-card>
                    <v-card class="mt-n1">
                        <v-card-text>
                            <v-textarea v-for="story in stories" :key="story" readonly outlined auto-grow :value="story"></v-textarea>
                        </v-card-text>
                    </v-card>
                    <div v-if="userIsAdmin">
                        <v-btn color="yellow darken-1" @click="increment">More</v-btn>
                        <v-btn color="yellow darken-1" @click="closeRoom">Close Room</v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'result',
    data: () => ({
        selected: null,
        stage: 1
    }),
    computed: {
        owner: {
            get() {
                return this.selected
            },
            set(value) {
                this.selected = value
                this.stage = 1
                this.$store.dispatch('result/showStory', { player: this.players[value], stage: this.stage })
            }
        },
        ...mapState({
            userIsAdmin: state => state.user.isAdmin,
            roomId: state => state.room.id,
            players: state => state.room.users.map(x => x.user_name).sort(),
            stories: state => state.result.stories
        })
    },
    methods: {
        increment() {
            this.stage++
            this.$store.dispatch('result/showStory', { player: this.players[this.owner], stage: this.stage })
        },
        ...mapActions('result', [
            'closeRoom'
        ])
    }
}
</script>
