import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {SearchResult} from "../../_models/search-result";
import {Address} from "../../_models/address";
import {ImmopricingService} from "../../_services/immopricing.service";
import {Place} from "../../_models/place";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() selectSearchOptionEvent = new EventEmitter<Address>();


  constructor(
    private immoPricingService: ImmopricingService
  ) { }

  searchResults: (Place | Address)[] = [];
  displayAutocomplete = true;

  ngOnInit(): void {
  }

  search(input: string) {
    if (input.length === 0) {
      this.searchResults = [];
      return;
    }
    this.immoPricingService.search(input).subscribe((res: SearchResult) => {
      if (res.Addresses.length > res.Places.length) {
        this.searchResults = [
          ...res.Places,
          ...res.Addresses
        ];
      } else {
        this.searchResults = [
          ...res.Addresses,
          ...res.Places
        ];
      }
    })
  }

  displayFn(address: Address): string {
    return address && address.Display ? address.Display : '';
  }

  selectResult(address: Address) {
    document.getElementById('search-input').blur();
    this.searchResults = [];
    this.selectSearchOptionEvent.emit(address);
  }

}
