import {Address} from "./address";
import {Place} from "./place";

export interface SearchResult {
  Places: Place[];
  Addresses: Address[];
}
