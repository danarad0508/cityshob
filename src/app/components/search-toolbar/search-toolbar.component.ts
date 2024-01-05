import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeoObjectDto } from '../../models/dto/geo.object.dto';
import { GeoObjectService } from '../../services/geo-object.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-search-toolbar',
  standalone: true,
  imports: [JsonPipe, CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './search-toolbar.component.html',
  styleUrl: './search-toolbar.component.scss'
})
export class SearchToolbarComponent {
  public searchGeoObjectsFG: FormGroup = this.formBuilder.group({
    geoObjType: [0, [Validators.required]],
    searchText: [null, [Validators.required]]
  });
  public searchResults: GeoObjectDto[] = [];

  constructor(
    private getObjectService: GeoObjectService,
    private readonly formBuilder: FormBuilder,
    private translateService: TranslateService
  ) {
    this.translateService.use("en");
  }

  //#region Props
  get geoObjType() {
    return this.searchGeoObjectsFG.controls["geoObjType"];
  }

  get searchText() {
    return this.searchGeoObjectsFG.controls["searchText"];
  }
  //#endregion

  //#region Public Methods
  searchGeoObjects() {
    this.getObjectService.searchGeoObjects(this.geoObjType.value, this.searchText.value)
      .subscribe((res: GeoObjectDto[]) => {
        this.searchResults = res;
      });
  }
  //#endregion
}
