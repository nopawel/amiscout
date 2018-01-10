<template>
  <v-container>
    <v-layout row wrap v-for="report in reports" :key="report.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  :src="report.imageUrl"
                  height="130px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{ report.title }}</h5>
                    <div>{{ report.date | date }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/reports/' + report.id">
                    <v-icon left light>arrow_forward</v-icon>
                    View Report
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      reports () {
        return this.$store.getters.loadedReports
      }
    }
  }
</script>
