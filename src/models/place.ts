export default class Place {
  id: number;
  /* eslint-disable @typescript-eslint/camelcase */
  external_id: string;
  name: string;
  country: string;

  constructor(id: number, external_id: string, name: string, country: string) {
    this.id = id;
    this.external_id = external_id;
    this.name = name;
    this.country = country;
  }
}
