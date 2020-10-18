import {Component, OnInit, ViewChild} from '@angular/core';
import {MapsService} from "./_services/maps.service";
import {ImmopricingService} from "./_services/immopricing.service";
import {SearchResult} from "./_models/search-result";
import {PolygonResult} from "./_models/polygon-result";
import {UtilsService} from "./_services/utils.service";
import {GoogleMap} from "@angular/google-maps";
import {PriceResult} from "./_models/price-result";
import {Address} from "./_models/address";
import {Place} from "./_models/place";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {PricingDataComponent} from "./_bottomsheet/pricing-data/pricing-data.component";
import {NeighborhoodDataComponent} from "./_bottomsheet/neighborhood-data/neighborhood-data.component";
import {SearchComponent} from "./_components/search/search.component";
import {PricesInViewportPayload} from "./_models/prices-in-viewport-payload";
import {Polygon} from "./_models/polygon";
import {BottomsheetCommand} from "./_models/bottomsheet-command";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(GoogleMap) map: GoogleMap;
  @ViewChild(SearchComponent) searchComponent: SearchComponent;

  constructor(
    private mapsService: MapsService,
    private immoPricingService: ImmopricingService,
    private utilsService: UtilsService,
    private bottomSheet: MatBottomSheet
  ) {
  }

  multipleResultsCurrent: {
    results?: PriceResult[],
    option?: Address | Place
  } = {};
  polygons: Polygon[] = [];

  center = null;
  zoom = 10;
  mapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    zoomControl: false,
  };
  bottomsheetIsOpened = false;

  ngOnInit(): void {
    this.mapsService.getPosition().subscribe((res: { location: { lat: number, lng: number } }) => {
      this.center = new google.maps.LatLng(res.location.lat, res.location.lng);
      this.mapsService.geocode(res.location.lat, res.location.lng).then(res => {
        if (res.length > 0) {
          const geocodeResult = res[0];
          this.immoPricingService.search(geocodeResult.formatted_address.replace(', France', '')).subscribe((searchResult: SearchResult) => {
            if (searchResult.Addresses.length > 0) {
              const address = searchResult.Addresses[0];
              this.findResultsByAddress(address);
            }
          })
        }
      })
    })
  }


  findResultsByAddress(option: Address | Place) {
    this.bottomSheet.dismiss();
    this.polygons = [];
    this.bottomsheetIsOpened = false;
    const payload = {
      LocalityType: this.getLocalityType(option.Type),
      LocalityId: option.Params['ExternalId'] ? option.Params['ExternalId'] : option.Params['ci']
    };
    this.immoPricingService.getPolygon(payload).subscribe((resPolygon: PolygonResult) => {
      this.polygons = [{paths: this.utilsService.parsePolygon(resPolygon.wkt)}];
      this.map.fitBounds(this.mapsService.getBounds(this.polygons[0].paths));
      this.loadPrices(resPolygon.localityId, option, payload.LocalityType);
    });
  }

  loadPrices(localityId, option, localityTypeId) {
    this.immoPricingService.getPrices(localityId).subscribe(async (data: PriceResult[]) => {
      if (data.length === 0) {
        return this.loadPricesAround(localityTypeId, localityId);
      }
      this.polygons = [];
      data.forEach(r => {
        const options: google.maps.PolygonOptions = {};
        const polygon: Polygon = {
          paths: this.utilsService.parsePolygon(r.Wkt),
          options
        };
        delete r.Wkt;
        polygon.data = r;
        this.polygons.push(polygon);
      });
      if (data.length === 1) {
        this.selectResult(data[0], option)
      } else {
        this.multipleResultsCurrent = {
          results: data,
          option
        };
        this.showAllResults(data, option);
      }
    });
  }

  async loadPricesAround(localityTypeId, localityId) {
    await new Promise(resolve => {
      setTimeout(() => resolve(), 500);
    });
    const currentBounds = this.map.getBounds();
    const payload: PricesInViewportPayload = {
      localityTypeId,
      transactionTypeId: 13,
      minLat: currentBounds.getNorthEast().lat(),
      minLong: currentBounds.getNorthEast().lng(),
      maxLat: currentBounds.getSouthWest().lat(),
      maxLong: currentBounds.getSouthWest().lng(),
    };
    this.immoPricingService.getPricesByNarrowing(payload).subscribe((data: PriceResult[]) => {
      const found = data.find(r => r.LocalityID === localityId);
      if (found) {
        this.selectResult(found, null);
      }
    });
  }

  async selectResult(res: PriceResult, option: Address | Place, action = BottomsheetCommand.CLOSE) {
    this.searchComponent.searchResults = [];
    res.Label = res.Label.length === 0 ? option.Display : res.Label;
    const results = await this.mapsService.reverseGeocode(res.Label);
    if (results.length === 0) {
      if ('Meta' in option) {
        const zip = option.Meta.Zips.find(z => option.Display.includes(z));
        res.AddressComponent = {
          postalCode: zip,
          city: option.Tag
        };
      }
    } else {
      res.AddressComponent = this.buildAddressComponent(results[0]);
    }
    this.bottomsheetIsOpened = true;
    this.bottomSheet.open(PricingDataComponent, {
      data: {res, action},
      hasBackdrop: false
    }).afterDismissed().subscribe((command: BottomsheetCommand) => {
      this.bottomsheetIsOpened = false;
      if (command === BottomsheetCommand.CLOSE) {
        this.polygons = [];
      } else if (command === BottomsheetCommand.PREVIOUS) {
        this.polygons = this.polygons.map(p => {
          p.options = {};
          return p;
        });
        this.findResultsByAddress(this.multipleResultsCurrent.option);
      }
    });
  }

  showAllResults(res: PriceResult[], option) {
    this.searchComponent.searchResults = [];
    this.bottomsheetIsOpened = true;
    this.bottomSheet.open(NeighborhoodDataComponent, {
      data: res,
      hasBackdrop: false
    }).afterDismissed().subscribe((selectedRes: PriceResult) => {
      this.bottomsheetIsOpened = false;
      if (selectedRes) {
        this.selectResult(selectedRes, option, BottomsheetCommand.PREVIOUS);
        this.selectPolygon(selectedRes);
      }
    });
  }

  selectPolygon(selectedRes: PriceResult) {
    const polygon = this.polygons.find(p => p.data?.LocalityID === selectedRes.LocalityID);
    if (polygon) {
      polygon.options = {
        fillColor: '#ff0000'
      };
      this.map.fitBounds(this.mapsService.getBounds(polygon.paths));
    }
  }

  clickOnPolygon(polygon: Polygon) {
    for (let i = 0; i < this.polygons.length; i++) {
      const tmp = {...this.polygons[i]};
      tmp.options = {};
      this.polygons[i] = {...tmp};
    }
    this.selectPolygon(polygon.data);
    this.selectResult(polygon.data, this.multipleResultsCurrent.option, BottomsheetCommand.PREVIOUS);
  }

  buildAddressComponent(geocodeResult: google.maps.GeocoderResult) {
    return {
      postalCode: geocodeResult.address_components.find(c => c.types.indexOf('postal_code') > -1).long_name,
      city: geocodeResult.address_components.find(c => c.types.indexOf('locality') > -1).long_name,
    };
  }

  getLocalityType(type) {
    switch (type) {
      case 'Address':
        return 1;
      case 'Quartier':
        return 3;
      case 'Ville':
        return 4;
    }
  }
}
