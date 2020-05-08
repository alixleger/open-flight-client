<template>
  <v-app>
    <v-app-bar app color="blue darken-1" dark>
      <v-toolbar-title class="font-weight-bold">OpenFlight</v-toolbar-title>
      <div class="d-flex align-center">
        <v-icon>flight</v-icon>
        <v-icon>bar_chart</v-icon>
        <v-icon>euro</v-icon>
      </div>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  data: () => ({
    //
  })
});
</script>
