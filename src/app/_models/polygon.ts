import {PriceResult} from "./price-result";

export interface Polygon {
  options?: google.maps.PolygonOptions;
  paths?: google.maps.LatLng[];
  data?: PriceResult;
}
