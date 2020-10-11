import { Injectable } from '@angular/core';
import {LbcSearch} from "../_models/lbc-search";

@Injectable({
  providedIn: 'root'
})
export class LeboncoinService {

  constructor() { }

  generateUrl(filters: LbcSearch) {
    return `https://www.leboncoin.fr/recherche/?category=9&locations=${filters.location}&real_estate_type=${filters.types}&price=${filters.priceMin}-${filters.priceMax}&square=${filters.surfaceMin}-${filters.surfaceMax}&rooms=${filters.roomsMin}-${filters.roomsMax}`;
  }
}
