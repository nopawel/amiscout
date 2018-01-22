<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ match.title }}</h6>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-match-details-dialog></app-edit-match-details-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="match.imageUrl"
            height="400px"
          ></v-card-media>
          <v-card-text>
            <div class="info--text">{{ match.date | date }} - {{ match.location }}</div>
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
        return this.$store.gatters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.match.creatorId
      }
    }
  }
</script>
