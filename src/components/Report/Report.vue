<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ report.title }}</h6>
          </v-card-title>
          <v-card-media
            :src="report.imageUrl"
            height="400px"
          ></v-card-media>
          <v-card-text>
            <div class="info--text">{{ report.date | date }} - {{ report.location }}</div>
            <div>{{ report.description }}</div>
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
      report () {
        return this.$store.getters.loadedReport(this.id)
      }
    }
  }
</script>
