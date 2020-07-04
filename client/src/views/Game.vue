<template>
    <v-container>
        <v-row no-gutter justify="start" class="mt-10">
            <v-col cols="2">
                <v-card>
                    <v-card-text>
                        <v-list disabled dense height="300">
                            <v-subheader>Players</v-subheader>
                            <v-list-item  v-for="user in users" :key="user">
                                <v-list-item-content>
                                    <v-list-item-title v-text="user" />
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                    <v-divider />
                    <v-btn class="mt-2 mx-auto" color="yellow darken-1" @click="startSession">Start Session</v-btn>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-subtitle>
                        <div id="room_display_text">{{room}}</div>
                        <div id="round_display_text">{{currentStage}}/{{lastStage}}</div>
                    </v-card-subtitle>
                    <v-card-text>
                        <v-form id="submit-story-form" @submit.prevent="submitStory">
                            <v-textarea>{{output}}</v-textarea>
                            <v-textarea v-model="input"></v-textarea>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                    <v-btn type="submit" width="200" class="mx-auto" color="yellow darken-1" form="submit-story-form">Submit Story</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-btn class="mt-2 mx-auto" color="yellow darken-1" @click="showStory">Show Story</v-btn>
        <v-btn class="mt-2 mx-auto" color="yellow darken-1" @click="closeRoom">Close Room</v-btn>
    </v-container>
</template>

<script>
export default {
  name: 'game',
  data: () => ({
    input: null,
    output: "bla",
    currentStage: 1,
    lastStage: 1
  }),
  computed: {
      room () {
          return this.$store.state.room.id
      },
      users () {
          return this.$store.state.room.users.map(x => x.user_name)
      }
  },
  methods: {
    async submitStory() {
        await this.$store
            .dispatch('submitStory')
    },
    async startSession() {
        await this.$store
            .dispatch('startSession')
    },
    async showStory() {
        await this.$store
            .dispatch('showStory')
    },
    async closeRoom() {
        await this.$store
            .dispatch('closeRoom')
    }
  }
};
</script>
