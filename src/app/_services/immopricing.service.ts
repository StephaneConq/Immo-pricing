import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PricesInViewportPayload} from "../_models/prices-in-viewport-payload";

@Injectable({
  providedIn: 'root'
})
export class ImmopricingService {

  constructor(private http: HttpClient) {
  }

  search(q: string) {
    return this.http.get(`https://autocomplete-cloud.svc.groupe-seloger.com/api/V3.0/auto/complete/fr/32798?text=${q}`);
  }

  getPolygon(payload) {
    return this.http.post(`https://ws.lacoteimmo.com/api/LocalityV2/GetPolygonWkt`, payload);
  }

  getPrices(localityId) {
    return this.http.post(`https://ws.lacoteimmo.com/api/Map/PolygonsNarrowing`, {
      LocalityId: localityId,
      TransactionType: 13
    });
  }

  getPricesByNarrowing(payload: PricesInViewportPayload) {
    return this.http.post('https://ws.lacoteimmo.com/api/Map/PolygonsInViewPort', payload);
  }
}
