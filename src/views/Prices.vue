<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col xl="6" lg="6" md="12" sm="12" xs="12">
        <v-card tile>
          <v-list>
            <v-subheader>Vols favoris</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in favFlights"
                :key="i"
                @click="setCurrentFlightID(item.Flight.external_id)"
              >
                <v-list-item-content>
                  <v-list-item-title>{{
                    item.Flight.external_id
                  }}</v-list-item-title>
                  <v-list-item-subtitle
                    >Prix cible : {{ item.target_price }}€</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col xl="6" lg="6" md="12" sm="12" xs="12">
        <v-card tile>
          <v-card-title>
            <v-row align="start" justify="center">
              <div class="caption grey--text text-uppercase">
                Prix actuel
              </div>
              <div>
                <span
                  class="display-2 font-weight-black"
                  v-text="last > 0 ? last : '—'"
                ></span>
                <strong v-if="last > 0">€</strong>
              </div>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-sheet>
              <v-sparkline
                :value="value"
                :gradient="gradient"
                :padding="value.length + 5"
                stroke-linecap="round"
                :gradient-direction="gradientDirection"
                :fill="fill"
                :type="type"
                :auto-line-width="autoLineWidth"
                auto-draw
                smooth
              >
                <template v-slot:label="item"> {{ item.value }}€ </template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text>
            <div>{{ currentFlightID }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];

@Component
export default class Prices extends Vue {
  lineCap = "round";
  gradient = gradients[5];
  value = [];
  gradientDirection = "top";
  gradients = gradients;
  fill = false;
  type = "trend";
  autoLineWidth = true;
  last = -1;

  get favFlights() {
    return this.$store.state.flights.favFlights;
  }

  get flightPrices() {
    return this.$store.state.flights.flightPrices;
  }

  created() {
    this.$store.dispatch("flights/fetchFavFlights");
    this.$store.dispatch("flights/fetchFlightPrices");
  }

  public setCurrentFlightID(id: string) {
    if (!this.flightPrices.has(id)) {
      return;
    }
    this.value = this.flightPrices.get(id);
    this.last = this.value.slice(-1).pop();
  }
}
</script>
