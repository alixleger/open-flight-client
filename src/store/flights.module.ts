import PlaceService from "@/services/place.service";
import Place from "@/models/place";
import FlightService from "@/services/flight.service";
import Flight from "@/models/flight";

const getDefaultState = () => {
  return {
    departPlaces: [],
    arrivalPlaces: [],
    flights: null,
    favFlights: [],
    flightPrices: new Map()
  }
}

export const flights = {
  namespaced: true,
  state: getDefaultState(),
  actions: {
    getDepartPlaces({ commit }: any, search: string) {
      return PlaceService.getPlaces(search).then(
        response => {
          const apiPlaces = response.data.places;
          commit("getDepartPlacesSuccess", apiPlaces);
          return Promise.resolve(apiPlaces);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    getArrivalPlaces({ commit }: any, search: string) {
      return PlaceService.getPlaces(search).then(
        response => {
          const apiPlaces = response.data.places;
          commit("getArrivalPlacesSuccess", apiPlaces);
          return Promise.resolve(apiPlaces);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    getFlights({ commit }: any, body: any) {
      const departPlace: Place = body.departPlace;
      const arrivalPlace: Place = body.arrivalPlace;
      const departDate: Date = body.departDate;

      return FlightService.getFlights(
        departPlace,
        arrivalPlace,
        departDate
      ).then(
        response => {
          const apiFlights = response.data.flights;
          commit("getFlightsSuccess", apiFlights);
          return Promise.resolve(apiFlights);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    clear({ commit }: any) {
      commit("clearState");
    },
    favFlight({ commit }: any, body: any) {
      const flight: Flight = body.flight;
      const targetPrice: number = body.targetPrice;

      return FlightService.favFlight(flight, targetPrice);
    },
    fetchFavFlights({ commit }: any) {
      FlightService.getFavFlights().then(
        response => {
          const apiFavFlights = response.data.fav_flights;
          commit("fetchFavFlightsSuccess", apiFavFlights);
          return Promise.resolve(apiFavFlights);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    fetchFlightPrices({ commit }: any) {
      FlightService.getFlightPrices().then(
        response => {
          const apiFlightPrices = response.data[0].Series[0];
          const flightPrices = new Map();
          for (let i = 0; i < apiFlightPrices.values.length; i++) {
            const key = apiFlightPrices.values[i][1];
            if (!flightPrices.has(key)) {
              flightPrices.set(key, []);
            }
            flightPrices.get(key).push(apiFlightPrices.values[i][2]);
          }
          commit("fetchFlightPricesSuccess", flightPrices);
          return Promise.resolve(apiFlightPrices);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    getDepartPlacesSuccess(state: any, apiPlaces: Array<Place>) {
      state.departPlaces = apiPlaces;
    },
    getArrivalPlacesSuccess(state: any, apiPlaces: Array<Place>) {
      state.arrivalPlaces = apiPlaces;
    },
    getFlightsSuccess(state: any, apiFlights: Array<Flight>) {
      state.flights = apiFlights;
    },
    clearState(state: any) {
      Object.assign(state, getDefaultState());
    },
    fetchFavFlightsSuccess(state: any, apiFavFlights: any) {
      state.favFlights = apiFavFlights;
    },
    fetchFlightPricesSuccess(state: any, flightPrices: any) {
      state.flightPrices = flightPrices;
    }
  }
};
