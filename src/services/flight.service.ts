import axios from "axios";
import Place from "@/models/place";
import Flight from "@/models/flight";

class FlightService {
  getFlights(departPlace: Place, arrivalPlace: Place, departDate: Date) {
    return axios.get(`${process.env.VUE_APP_API_URL}flights`, {
      params: {
        departPlaceID: departPlace.id,
        arrivalPlaceID: arrivalPlace.id,
        departDate: Math.round(departDate.getTime() / 1000)
      }
    });
  }

  favFlight(flight: Flight, targetPrice: number) {
    /* eslint-disable @typescript-eslint/camelcase */
    return axios.post(`${process.env.VUE_APP_API_URL}auth/favflight`, {
      flight_id: flight.id,
      target_price: Math.floor(targetPrice)
    });
  }
}

export default new FlightService();
