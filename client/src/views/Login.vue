<template>
    <v-app>
        <v-main>
            <v-container fluid>
                <v-layout align-center justify-center>
                    <v-card max-width="400" class="mx-auto mt-10">
                        <v-card-title>
                            <h1 class="display-1">Enter Room</h1>
                        </v-card-title>
                        <v-card-text>
                            <v-form id="login-form" @submit.prevent="registration">
                                <v-text-field
                                    prepend-icon="mdi-account-circle"
                                    label="Name"
                                    v-model="username"
                                ></v-text-field>
                                <v-text-field
                                    prepend-icon="mdi-google-classroom"
                                    label="Room"
                                    v-model="room"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn type="submit" width="200" class="mx-auto" color="yellow darken-1" form="login-form">Enter Room</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        username: '',
        room: ''
    }),
    methods: {
        async registration() {
            await this.$store
                .dispatch('registration', { username: this.username, room: this.room })
                .then(() => this.$router.push('/'))
        }
    }
};
</script>
