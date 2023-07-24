import {Injectable} from '@angular/core';
import {GoogleSheetsDbService} from "ng-google-sheets-db";
import {DataModel} from "../model/data-model";
import {DataComponent} from "../component/data/data.component";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  googleSheetId: string = '11bH6T3qNY2JpeCHhyGhsQIUVOWIH8CaliiOV2dGos74';
  sheetName21k: string = '21k';
  sheetName11k: string = '11k';
  attributesMapping = {
    date: 'Date',
    tithi: 'Tithi',
    name: 'Name',
    gujaratiName: 'Gujarati Name'
  };

  // @ts-ignore
  dataComponent: DataComponent;

  data11kList: { date: string, tithi: string, name: string, gujaratiName: string }[] = [];
  data21kList: { date: string, tithi: string, name: string, gujaratiName: string }[] = [];

  constructor(private googleSheetsDbService: GoogleSheetsDbService) {

  }

  getDataFromGoogleSheets(component: DataComponent): void {
    this.dataComponent = component;
    this.googleSheetsDbService.get<DataModel>(this.googleSheetId, this.sheetName21k, this.attributesMapping)
      .toPromise().then(value => {
      this.data21kList = value;
      component.reset21kData(value.filter(value => {
        return value.date === moment().format('DD/MM/YY')
      }));
    });

    this.googleSheetsDbService.get<DataModel>(this.googleSheetId, this.sheetName11k, this.attributesMapping)
      .toPromise().then(value => {
      this.data11kList = value;
      component.reset11kData(value.filter(value => {
        return value.date === moment().format('DD/MM/YY')
      }));
    });
  }


}
