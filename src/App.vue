<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            OpenFlight
          </v-list-item-title>
          <v-list-item-subtitle>
            Payez au meilleur moment !
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link @click="$router.push('/settings')">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Paramètres</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push('/home')">
          <v-list-item-action>
            <v-icon>flight_takeoff</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sélection de vols</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push('/prices')">
          <v-list-item-action>
            <v-icon>bar_chart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Analyse des prix</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="logout">
          <v-list-item-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Déconnexion</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="blue darken-1" dark>
      <v-app-bar-nav-icon
        v-if="loggedIn"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
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
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  drawer: unknown = null;

  get loggedIn(): boolean {
    return this.$store.state.auth.status.loggedIn;
  }

  public logout(): void {
    this.$store.dispatch("auth/logout");
    this.$router.push("/login");
  }
}
</script>
