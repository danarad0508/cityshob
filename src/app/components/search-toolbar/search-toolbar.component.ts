import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { Observable, Subject, debounceTime, filter, map, switchMap } from 'rxjs';
import { GeoObjectGroupDm } from '../../models/dm/geo.object.group.dm';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { GeoObjectService } from '../../services/geo-object.service';
import { TranslateService } from '../../services/translate.service';
import { GeoObjectTransformer } from '../../transformers/geo.object.transformer';

@Component({
  selector: 'app-search-toolbar',
  standalone: true,
  imports: [JsonPipe, CommonModule, ReactiveFormsModule, TranslatePipe, DropdownModule, InputTextModule, AccordionModule, ListboxModule],
  templateUrl: './search-toolbar.component.html',
  styleUrl: './search-toolbar.component.scss'
})
export class SearchToolbarComponent implements OnInit {
  public searchGeoObjectsFG: FormGroup = this.formBuilder.group({
    geoObjType: [0, [Validators.required]],
    searchText: [null, [Validators.required]]
  });
  public geoObjectTypes = [
    { label: 'Site', value: '0' },
    { label: 'Zone', value: '1' },
    { label: 'Layer', value: '3' },
    { label: 'Placemark', value: '4' },
  ];
  public geoObjectsGroups$!: Observable<GeoObjectGroupDm[]>;
  private searchText$ = new Subject<string>();

  constructor(
    private getObjectService: GeoObjectService,
    private readonly formBuilder: FormBuilder,
    private translateService: TranslateService
  ) {
    this.translateService.use("en");
  }

  ngOnInit() {
    this.initObservables();
  }

  //#region Props
  get geoObjType() {
    return this.searchGeoObjectsFG.controls["geoObjType"];
  }

  get searchText() {
    return this.searchGeoObjectsFG.controls["searchText"];
  }

  get activeIndex() {
    return this.geoObjType.value ? this.geoObjectTypes.findIndex(geoObjectType => geoObjectType.value === this.geoObjType.value) : 0;
  }
  //#endregion

  //#region Public Methods
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  search(getObject: string) {
    if (this.geoObjType.value)
      this.searchText$.next(getObject);
  }
  //#endregion

  //#region Private Methods
  private initObservables() {
    this.geoObjectsGroups$ = this.searchText$
      .pipe(
        filter(searchText => !!searchText),
        debounceTime(200),
        switchMap(searchText => this.getObjectService.searchGeoObjects(this.geoObjType.value, searchText)),
        map(res => GeoObjectTransformer.groupAndTransform(res)));
  }
  //#endregion
}
