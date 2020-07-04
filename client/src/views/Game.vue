<template>
    <v-container>
        <v-row no-gutter justify="start" class="mt-10">
            <v-col cols="2">
                <v-card>
                    <v-card-text>
                        <v-simple-table height="300">
                            <v-slot>
                                <thead>
                                    <tr>
                                        <th class="text-center">Players</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{ user }}</td>
                                    </tr>
                                </tbody>
                            </v-slot>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-subtitle>
                        <div id="room_display_text">{{room}}</div>
                        <div id="round_display_text">{{currentStage}}/{{lastStage}}</div>
                    </v-card-subtitle>
                    <v-card-text>
                        <v-form id="submit-story-form" @submit.prevent="onSubmit">
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
    </v-container>
</template>

<script>
export default {
  name: 'game',
  data: () => ({
    input: null,
    users: ["1", "12", "123"]
  }),
  methods: {
    onSubmit() {
      let story = {
        input: this.input,
      }
      this.$emit('submit-story', story)
      this.input = null
    }
  }
};
</script>
