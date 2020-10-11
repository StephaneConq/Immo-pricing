import { NgModule } from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatStepperModule} from "@angular/material/stepper";
import {MatCheckboxModule} from "@angular/material/checkbox";

const material = [
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatAutocompleteModule,
  MatBottomSheetModule,
  MatStepperModule,
  MatCheckboxModule
];

@NgModule({
  imports: material,
  exports: material
})
export class MaterialModule { }
