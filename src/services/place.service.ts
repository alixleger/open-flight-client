import axios from "axios";

class PlaceService {
  getPlaces(search: string) {
    return axios.get(`${process.env.VUE_APP_API_URL}places`, {
      params: {
        query: search
      }
    });
  }
}

export default new PlaceService();
