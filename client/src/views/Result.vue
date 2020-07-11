<template>
    <v-main>
        <v-container>
            <v-btn color="yellow darken-1" @click="showStory">Show Story</v-btn>
            <v-btn color="yellow darken-1" @click="closeRoom">Close Room</v-btn>
        </v-container>
    </v-main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'result',
    computed: {
        ...mapState({
            userIsAdmin: state => state.user.isAdmin,
            roomId: state => state.room.id,
            players: state => state.room.users.map(x => x.user_name)
        })
    },
    methods: {
        ...mapActions('result', [
            'showStory',
            'closeRoom'
        ])
    }
}
</script>
