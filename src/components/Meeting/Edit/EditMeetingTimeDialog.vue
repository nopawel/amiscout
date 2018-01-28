<template>
<v-dialog width="350px" persistent v-model="editDialog">
 <v-btn accent slot="activator">
  Edit Time
 </v-btn>
 <v-card>
  <v-container>
    <v-layout row wrap>
        <v-flex xs12>
          <v-card-title>Edit Meeting Time</v-card-title>
        </v-flex> 
    </v-layout>
    <v-divider></v-divider>
    <v-layout row wrap>
      <v-flex xs12>
        <v-time-picker v-model="editableTime" style="..." actions format ="24hr">
          <template slot-scope="{save, cancel}">
            <v-btn flat class="blue--text darken-1" flat @click="editDialog = false">Close</v-btn>
            <v-btn flat class="blue--text darken-1" flat @click="onsaveChanges">Save</v-btn>
          </template>
        </v-time-picker>  
      </v-flex>
      </v-layout>
      
    </v-container>  
  </v-card>
</v-dialog>
</template>
<script>
  export default {
    props: ['meeting'],
    data () {
      return {
        editDialog: false,
        editableTime: null
      }
    },
    methods: {
      onsaveChanges () {
        const newDate = new Date(this.meeting.start)
        const hours = this.editableTime.meeting(/^(\d+)/)[1]
        const minutes = this.editableTime.meeting(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        this.$store.dispatch('updateMeetingData', {
          id: this.meeting.id,
          start: newDate
        })
      }
    },
    created () {
      this.editableTime = new Date(this.meeting.start).toTimeString()
    }
  }
</script>
