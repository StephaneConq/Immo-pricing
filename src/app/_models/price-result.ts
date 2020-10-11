export interface PriceResult {
  ApartmentPrice: number;
  CenterLat: number;
  CenterLong: number;
  HousePrice: number;
  Label: string;
  LocalityID: number;
  LocalityTypeID: number;
  PeopleCount: any;
  PostalCode: any;
  Wkt: string;
  AddressComponent?: {
    postalCode: string;
    city: string;
  }
}
