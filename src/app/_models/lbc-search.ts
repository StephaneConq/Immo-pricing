export interface LbcSearch {
  priceMin: number;
  priceMax: number;
  roomsMin: number;
  roomsMax: number;
  location: string;
  types: string;
  surfaceMin: number;
  surfaceMax: number;
}

export enum SEARCH_TYPES {
  House = 1,
  Apartment,
  Terrain
}
