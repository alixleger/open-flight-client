import PlaceService from "@/services/place.service";
import Place from "@/models/place";

export const flights = {
  namespaced: true,
  state: { departPlaces: [], arrivalPlaces: [] },
  actions: {
    getDepartPlaces({ commit }: unknown, search: string) {
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
    getArrivalPlaces({ commit }: unknown, search: string) {
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
    }
  },
  mutations: {
    getDepartPlacesSuccess(state: any, apiPlaces: Array<Place>) {
      state.departPlaces = apiPlaces;
    },
    getArrivalPlacesSuccess(state: any, apiPlaces: Array<Place>) {
      state.arrivalPlaces = apiPlaces;
    }
  }
};
