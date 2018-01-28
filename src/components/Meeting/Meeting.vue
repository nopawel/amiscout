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
            <h6 class="primary--text">{{ meeting.title }}</h6>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meeting-details-dialog :meeting="meeting"></app-edit-meeting-details-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="meeting.imageUrl"
            height="400px"
          ></v-card-media>
          <v-card-text>
            <div class="info--text">{{ meeting.start | dataf }} - {{ meeting.location }}</div>
             <div class="info--text">{{ meeting.end | dataf }} - {{ meeting.location }}</div>
            <div><app-edit-meeting-data-dialog :meeting="meeting" v-if="userIsCreator">  
            </app-edit-meeting-data-dialog>
            <app-edit-meeting-time-dialog :meeting="meeting" v-if="userIsCreator">
            </app-edit-meeting-time-dialog>
            </div>
            <div>{{ meeting.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Donate meeting</v-btn>
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
      meeting () {
        return this.$store.getters.loadedMeeting(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== undefined && this.$store.getters.user !== null
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.meeting.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
