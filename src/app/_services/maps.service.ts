import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  geocoder: google.maps.Geocoder = null;


  constructor(private http: HttpClient) {
    this.geocoder = new google.maps.Geocoder();
  }

  getPosition() {
    return this.http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=' + environment.mapsApiKey, {});
  }

  geocode(lat, lng): Promise<google.maps.GeocoderResult[]> {
    return new Promise(resolve => {
      this.geocoder.geocode({location: new google.maps.LatLng(lat, lng)}, (results, status) => {
        resolve(results);
      });
    });
  }

  reverseGeocode(address: string): Promise<google.maps.GeocoderResult[]> {
    return new Promise(resolve => {
      this.geocoder.geocode({address}, (results, status) => {
        resolve(results);
      });
    });
  }

  getBounds(latLngs: google.maps.LatLng[]) {
    const bounds = new google.maps.LatLngBounds();
    latLngs.forEach(function (element, index) { bounds.extend(element); });
    return bounds;
  }

}
