<template>
<v-dialog width="350px" slot="activator" persistent v-model="editDialog">
 <!-- <v-btn accent >
  Edit Date
 </v-btn> -->
 <v-card>
  <v-container>
    <v-layout row wrap>
        <v-flex xs12>
          <v-card-title>Edit Meeting Date</v-card-title>
        </v-flex> 
    </v-layout>
    <v-divider></v-divider>
    <v-layout row wrap>
      <v-flex xs12>
        <v-date-picker v-model="editableDate" style="width: 100%" actions>
          <template slot-scope="{save, cancel}">
            <v-btn flat class="blue--text darken-1" flat @click="editDialog = false">Close</v-btn>
            <v-btn flat class="blue--text darken-1" flat @click="onsaveChanges">Save</v-btn>
          </template>
        </v-date-picker>  
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
        editableDate: null
      }
    },
    methods: {
      onsaveChanges () {
        const newDate = new Date(this.meeting.start)
        const newDay = new Date(this.editableDate).getUTCDate()
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        this.$store.dispatch('updateMeetingData', {
          id: this.meeting.id,
          start: newDate
        })
      }
    },
    created () {
      this.editableDate = new Date(this.meeting.start)
    }
  }
</script>
