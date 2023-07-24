import {Component, OnInit} from '@angular/core';
import {AppService} from "../../service/app.service";
import {DataModel} from "../../model/data-model";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  todayDate: string = new Date().toDateString();
  todayTithi: string = '';

  slides: {title: string, data: {name: string, gujaratiName: string}[]}[] = [
    {
      title: '21,000 Tithi',
      data: []
    },
    {
      title: '11,000 Tithi',
      data: []
    }
  ];

  constructor(public appService: AppService) {
    this.appService.getDataFromGoogleSheets(this);
  }

  ngOnInit(): void {}

  reset21kData(respData: DataModel[]): void {
    let today21kTithiData: {name: string, gujaratiName: string}[] = [];
    respData.forEach(value => {
      today21kTithiData.push({
        name: value.name,
        gujaratiName: value.gujaratiName
      })
    });
    this.todayDate = respData[0].date;
    this.todayTithi = respData[0].tithi;
    this.slides[0].data = today21kTithiData;
  }

  reset11kData(respData: DataModel[]): void {
    let today11kTithiData: {name: string, gujaratiName: string}[] = [];
    respData.forEach(value => {
      today11kTithiData.push({
        name: value.name,
        gujaratiName: value.gujaratiName
      })
    });
    this.todayDate = respData[0].date;
    this.todayTithi = respData[0].tithi;
    this.slides[1].data = today11kTithiData;
  }

}
