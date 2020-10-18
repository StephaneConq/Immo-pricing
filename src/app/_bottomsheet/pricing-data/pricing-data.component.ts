import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {PriceResult} from "../../_models/price-result";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {LbcSearch, SEARCH_TYPES} from "../../_models/lbc-search";
import {LeboncoinService} from "../../_services/leboncoin.service";
import {BottomsheetCommand} from "../../_models/bottomsheet-command";

@Component({
  selector: 'app-pricing-data',
  templateUrl: './pricing-data.component.html',
  styleUrls: ['./pricing-data.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class PricingDataComponent implements OnInit {

  raised = false;
  model = {
    types: {
      appartment: true,
      house: true,
      terrain: false,
    },
    price: {
      max: 100_000,
      min: 0,
    },
    surface: {
      max: 100,
      min: 0
    },
    rooms: {
      max: 4,
      min: 0
    }
  };

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { res: PriceResult, action: BottomsheetCommand },
    private _bottomSheetRef: MatBottomSheetRef<PricingDataComponent>,
    private lbcService: LeboncoinService
  ) { }

  ngOnInit(): void {
  }

  close() {
    document.getElementById('search-input').blur();
    this.raised ? this.raised = false : this._bottomSheetRef.dismiss(this.data.action);
  }

  search() {
    const filters: LbcSearch = {
      priceMin: this.model.price.min,
      priceMax: this.model.price.max,
      surfaceMin: this.model.surface.min,
      surfaceMax: this.model.surface.max,
      roomsMin: this.model.rooms.min,
      roomsMax: this.model.rooms.max,
      types: this.getTypes(),
      location: `${this.data.res.AddressComponent.city}_${this.data.res.AddressComponent.postalCode}`
    };
    const url = this.lbcService.generateUrl(filters);
    window.open(url, '_blank');
  }

  getTypes() {
    return [
      this.model.types.house ? SEARCH_TYPES.House : null,
      this.model.types.appartment ? SEARCH_TYPES.Apartment : null,
      this.model.types.terrain ? SEARCH_TYPES.Terrain : null,
    ].filter(t => t !== null).join(',');
  }

}
