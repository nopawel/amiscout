<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Create a new Meeting</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeeting">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
              @change="onFilePicked">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="description"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
            <v-checkbox
                name="description"
                label="All day meeting"
                id="allday"
                v-model="allday">
                </v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs3 sm6 offset-sm2>
              <h5>Choose meeting start Data & Time</h5>
            </v-flex>
            <v-flex xs3 sm6>
              <h5>Choose meeting end Data & Time</h5>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs3 sm6 offset-sm2>
              <v-date-picker v-model="start"></v-date-picker>
            </v-flex>
            <v-flex xs3 sm6>
              <v-date-picker v-model="end"></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs3 sm6 offset-sm2>
              <v-time-picker v-model="starttime" format="24hr"></v-time-picker>
            </v-flex>  
              <v-flex xs6 sm6>
              <v-time-picker v-model="endtime" format="24hr"></v-time-picker>
            
            </v-flex>
          </v-layout>
          <v-layout row>  
            <v-flex xs6 sm6 offset-sm10>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">Create Meeting</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        start: new Date(),
        starttime: new Date(),
        end: new Date(),
        endtime: new Date(),
        allday: false,
        image: null
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
          this.location !== '' &&
          this.imageUrl !== '' &&
          this.description !== ''
      },
      submittableStartTime () {
        const start = new Date(this.start)
        if (typeof this.starttime === 'string') {
          let hours = this.starttime.match(/^(\d+)/)[1]
          const minutes = this.starttime.match(/:(\d+)/)[1]
          start.setHours(hours)
          start.setMinutes(minutes)
        } else {
          start.setHours(this.starttime.getHours())
          start.setMinutes(this.starttime.getMinutes())
        }
        return start
      },
      submittableEndTime () {
        const end = new Date(this.end)
        if (typeof this.endtime === 'string') {
          let hours = this.endtime.match(/^(\d+)/)[1]
          const minutes = this.endtime.match(/:(\d+)/)[1]
          end.setHours(hours)
          end.setMinutes(minutes)
        } else {
          end.setHours(this.endtime.getHours())
          end.setMinutes(this.endtime.getMinutes())
        }
        return end
      }
    },
    methods: {
      onCreateMeeting () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        const meetingData = {
          title: this.title,
          location: this.location,
          image: this.image,
          description: this.description,
          allday: this.allday,
          start: this.submittableStartTime,
          end: this.submittableEndTime
        }
        this.$store.dispatch('createMeeting', meetingData)
        this.$router.push('/meetings')
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>
