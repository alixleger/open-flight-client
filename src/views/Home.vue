<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="10">
        <v-alert v-if="flights && !flights.length" type="error" dismissible
          >Aucun vol trouvé pour cette recherche :'(</v-alert
        >
        <v-card>
          <v-card-title
            class="headline blue lighten-1 font-weight-regular white--text"
          >
            Trouvez un vol !
          </v-card-title>
          <v-card-text>
            Recherchez ici le vol le moins cher pour votre destination.
          </v-card-text>
          <v-card-text>
            <v-form v-model="valid">
              <v-autocomplete
                v-model="departPlace"
                :items="departPlaceItems"
                :search-input.sync="departPlaceSearch"
                hide-no-data
                hide-selected
                item-text="description"
                item-value="id"
                label="De"
                placeholder="Ville, pays, aéroport, ..."
                prepend-icon="mdi-database-search"
                required
                return-object
              ></v-autocomplete>
              <v-autocomplete
                v-model="arrivalPlace"
                :items="arrivalPlaceItems"
                :search-input.sync="arrivalPlaceSearch"
                hide-no-data
                hide-selected
                item-text="description"
                item-value="id"
                label="À"
                placeholder="Ville, pays, aéroport, ..."
                prepend-icon="mdi-database-search"
                required
                return-object
              ></v-autocomplete>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="computedDateFormatted"
                    label="Date de départ"
                    prepend-icon="event"
                    readonly
                    required
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                  locale="fr-fr"
                ></v-date-picker>
              </v-menu>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn :disabled="!(departPlace || arrivalPlace)" @click="clear">
              Clear
              <v-icon right>mdi-close-circle</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" :disabled="!valid" @click="searchFlights"
              >Rechercher</v-btn
            >
          </v-card-actions>
          <v-divider></v-divider>
          <v-expand-transition>
            <v-list v-if="flights">
              <v-list-item v-for="(flight, i) in flights" :key="i">
                <FlightItem :flight="flight" />
              </v-list-item>
            </v-list>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Place from "@/models/place";
import FlightItem from "@/components/FlightItem.vue";

@Component({
  components: {
    FlightItem
  }
})
export default class Home extends Vue {
  type = false;
  valid = true;
  menu = false;
  date = new Date().toISOString().substr(0, 10);
  departPlace: Place = new Place(0, "", "", "");
  arrivalPlace: Place = new Place(0, "", "", "");
  departPlaceSearch = null;
  arrivalPlaceSearch = null;

  get computedDateFormatted() {
    return this.formatDate(this.date);
  }

  formatDate(date: string) {
    if (!date) return null;

    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  get flights() {
    return this.$store.state.flights.flights;
  }

  get departPlaces(): Array<Place> {
    return this.$store.state.flights.departPlaces;
  }

  get arrivalPlaces(): Array<Place> {
    return this.$store.state.flights.arrivalPlaces;
  }

  get departPlaceItems() {
    return this.departPlaces.map(place => {
      const description = `${place.name} (${place.country})`;

      return Object.assign({}, place, { description });
    });
  }

  get arrivalPlaceItems() {
    return this.arrivalPlaces.map(place => {
      const description = `${place.name} (${place.country})`;

      return Object.assign({}, place, { description });
    });
  }

  @Watch("departPlaceSearch")
  departPlaceSearchChanged(newVal: string) {
    if (this.departPlace.id > 0) return;

    this.$store.dispatch("flights/getDepartPlaces", newVal);
  }

  @Watch("arrivalPlaceSearch")
  arrivalPlaceSearchChanged(newVal: string) {
    if (this.arrivalPlace.id > 0) return;

    this.$store.dispatch("flights/getArrivalPlaces", newVal);
  }

  public searchFlights(): void {
    this.$store.dispatch("flights/getFlights", {
      departPlace: this.departPlace,
      arrivalPlace: this.arrivalPlace,
      departDate: new Date(this.date)
    });
  }

  public clear(): void {
    this.$store.dispatch("flights/clear");
    this.date = new Date().toISOString().substr(0, 10);
    this.departPlace = this.arrivalPlace = new Place(0, "", "", "");
  }
}
</script>
