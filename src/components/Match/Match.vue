<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ match.title }}</h6>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-match-details-dialog :match="match"></app-edit-match-details-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="match.imageUrl"
            height="400px"
          ></v-card-media>
          <v-card-text>
            <div class="info--text">{{ match.date | dataf }} - {{ match.location }}</div>
            <div><app-edit-match-data-dialog :match="match" v-if="userIsCreator">  
            </app-edit-match-data-dialog>
            </div>
            <div>{{ match.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      match () {
        return this.$store.getters.loadedMatch(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== undefined && this.$store.getters.user !== null
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.match.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
