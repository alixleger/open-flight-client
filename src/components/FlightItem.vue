<template>
  <v-container>
    <v-row>
      <v-col cols="8" sm="8" md="8">
        <v-list-item-content>
          <v-list-item-title
            >{{ flight.carrier }} - {{ flight.price }}€</v-list-item-title
          >
          <v-list-item-subtitle
            >De {{ flight.depart_place.name }} ({{
              flight.depart_place.country
            }}) à {{ flight.arrival_place.name }} ({{
              flight.arrival_place.country
            }})</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-col>
      <v-col cols="2" sm="2" md="2">
        <v-text-field
          type="number"
          label="Prix cible"
          v-model="targetPrice"
        ></v-text-field>
      </v-col>
      <v-col cols="2" sm="2" md="2">
        <v-btn icon x-large :color="isFav ? 'red' : 'grey'" @click="favFlight">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Flight from "../models/flight";

@Component
export default class FlightItem extends Vue {
  @Prop() readonly flight!: Flight;

  targetPrice = 0;
  isFav = false;

  public favFlight() {
    if (!this.isFav) {
      this.$store.dispatch("flights/favFlight", {
        flight: this.flight,
        targetPrice: this.targetPrice
      });
    }

    this.isFav = !this.isFav;
  }
}
</script>
