import Place from "./place";

export default class Flight {
  id: number;
  /* eslint-disable @typescript-eslint/camelcase */
  external_id: string;
  price: number;
  carrier: string;
  /* eslint-disable @typescript-eslint/camelcase */
  depart_place_id: number;
  /* eslint-disable @typescript-eslint/camelcase */
  depart_place: Place;
  /* eslint-disable @typescript-eslint/camelcase */
  arrival_place_id: number;
  /* eslint-disable @typescript-eslint/camelcase */
  arrival_place: Place;
  /* eslint-disable @typescript-eslint/camelcase */
  depart_date: Date;

  constructor(
    id: number,
    external_id: string,
    price: number,
    carrier: string,
    depart_place_id: number,
    depart_place: Place,
    arrival_place_id: number,
    arrival_place: Place,
    depart_date: string
  ) {
    this.id = id;
    this.external_id = external_id;
    this.price = price;
    this.carrier = carrier;
    this.depart_place_id = depart_place_id;
    this.depart_place = depart_place;
    this.arrival_place_id = arrival_place_id;
    this.arrival_place = arrival_place;
    this.depart_date = new Date(depart_date);
  }
}
