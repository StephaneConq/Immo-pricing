import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  replaceAll(str, find, replace) {
    return str.split(find).join(replace);
  }

  parsePolygon(stringPolygon) {

    let polygonString = this.replaceAll(stringPolygon, 'POLYGON', '');
    polygonString = this.replaceAll(polygonString, '(', '');
    polygonString = this.replaceAll(polygonString, ')', '');
    return polygonString.split(',').map(coord => {
      return new google.maps.LatLng(
        parseFloat(coord.split(' ')[1]),
        parseFloat(coord.split(' ')[0]),
      )
    });
  }
}
