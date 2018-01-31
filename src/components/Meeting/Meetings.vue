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
<!--     <v-layout row wrap v-for="meeting in meetings" :key="meeting.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  :src="meeting.imageUrl"
                  height="130px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{ meeting.title }}</h5>
                    <div>{{ meeting.start | dataf }}</div>
                    <div>{{ meeting.end | dataf }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/meetings/' + meeting.id">
                    <v-icon left light>arrow_forward</v-icon>
                    View Meeting
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout> -->
   <modal height="auto" name="hello-world">
       <v-btn fab accent slot="activator">
  <v-icon>edit</v-icon>
 </v-btn>
 <v-card>
  <v-container>
    <v-layout row wrap>
          <v-flex xs12>
        <v-card-title>Edit Meeting</v-card-title>
        </v-flex> 
    </v-layout>
    <v-divider></v-divider>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card-text>
          <v-text-field
                  name="title"
                    label="Title"
                    id="title"
                    required></v-text-field>
                  <v-text-field
                    name="description"
                    label="Description"
                    id="description"
                    multi-line 
                    required></v-text-field>
                </v-card-text>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap>
        <v-card-actions>
          <v-btn flat class="blue--text darken-1" v-on:click="hide" >Close</v-btn>
          <v-btn flat class="blue--text darken-1">Save</v-btn>
        </v-card-actions>

      </v-layout>
    </v-container>  
  </v-card>
    </modal>
    <v-layout row>
      <v-btn @click="refreshEvents">Refresh</v-btn>
        <full-calendar ref="calendar" :event-sources="eventSources" @event-selected="eventSelected" @event-created="eventCreated" :config="config"></full-calendar>

    </v-layout row>
  </v-container>
</template>

<script>
  import moment from 'moment'
  
  export default {
    props: ['id'],
    data () {
      return {
        events: [
          {
            title: 'testowy chuj',
            allDay: true,
            start: moment(),
            end: moment().add(1, 'd'),
            description: 'Test 1'
          },
          {
            title: 'another test',
            start: moment().add(2, 'd'),
            end: moment().add(2, 'd').add(2, 'h'),
            description: 'Test 2',
            customRender: true
          }
        ],
        config: {
          defaultView: 'month',
          eventClick: (event, jsEvent, view) => {
            alert('Event: ' + event.title)
            alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY)
            alert('View: ' + view.name)
        // change the border color just for fun
          },
          dayClick: (date, jsEvent, view) => {
        // change the border color just for fun
            this.$modal.show('hello-world')
            // console.info(this.$modal('hello-world'))
            // this.$modal.hide('hello-world')
          },
          eventRender (event, element) {
            element.prop('title', event.description)
            console.info(event.description)
          }
        }
      }
    },
    methods: {
      hide () {
        console.info(this.$modal.hide('hello-world'))
        this.$modal.hide('hello-world')
      },
      eventSelected (event) {
        this.selected = event
        // alert(this.selected.description)
      },
      eventCreated (...test) {
        // console.log(test)
      },
      refreshEvents () {
        this.$refs.calendar.$emit('refetch-events')
      },
      removeEvent () {
        this.$refs.calendar.$emit('remove-event', this.selected)
        this.selected = {}
      }
    },
    computed: {
      meeting () {
        return this.$store.getters.loadedMeeting(this.id)
      },
      loading () {
        return this.$store.getters.loading
      },
      eventSources () {
        const self = this
        return [
          {
            events (start, end, timezone, callback) {
              setTimeout(() => {
                callback(self.events.filter(() => Math.random() > 0.5))
              }, 1000)
            }
          }
        ]
      }
    }
         // eventRender: function (event, element) {
      //   element.qtip({
      //     content: event.description + '<br />' + event.start,
      //     style: {
      //       background: 'black',
      //       color: '#FFFFFF'
      //     },
      //     position: {
      //       corner: {
      //         target: 'center',
      //         tooltip: 'bottomMiddle'
      //       }
      //     }
      //   })
      // }
}
</script>
