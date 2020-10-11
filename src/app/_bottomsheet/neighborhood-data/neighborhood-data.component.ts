import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {PriceResult} from "../../_models/price-result";

@Component({
  selector: 'app-neighborhood-data',
  templateUrl: './neighborhood-data.component.html',
  styleUrls: ['./neighborhood-data.component.scss']
})
export class NeighborhoodDataComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: PriceResult[],
    public _bottomSheetRef: MatBottomSheetRef<NeighborhoodDataComponent>
  ) { }
}
