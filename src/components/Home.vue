<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/matches" class="info">Explore Matches</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/match/new" class="info">Organize Match</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item
            v-for="match in matches"
            :src="match.imageUrl"
            :key="match.id"
            @click="onLoadMatch(match.id)">
            <div class="title">
              {{ match.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap  class="mt-2">
      <v-flex xs12 class="text-xs-center">
       <p>Join our awesome matches!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      matches () {
        return this.$store.getters.featuredMatches
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadMatch (id) {
        this.$router.push('/matches/' + id)
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
