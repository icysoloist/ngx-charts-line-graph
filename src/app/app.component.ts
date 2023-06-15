import { Component
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lineChartData = [
    {
      name: 'Series 1',
      series: [ {
        "value": 825,
        "name": "1",
        "index": "0"
      },
      {
        "value": 5000,
        "name": "2"
      },
      {
        "value": 7500,
        "name": "3"
      },
      {
        "value": 134,
        "name": "4"
      },
      {
        "value": 12500,
        "name": "5"
      },
      {
        "value": 15000,
        "name": "6"
      },
      {
        "value": 6434,
        "name": "7"
      },
      {
        "value": 6341,
        "name": "8"
      },
      {
        "value": 8568,
        "name": "9"
      },
      {
        "value": 9752,
        "name": "10"
      },
      {
        "value": 13568,
        "name": "11"
      },
      {
        "value": 4500,
        "name": "12"
      },
      {
        "value": 6000,
        "name": "13"
      }]
    },
    {
      name: 'Series 2',
      series: [{
        "value": 15000,
        "name": "17"
      },
      {
        "value": 12500,
        "name": "18"
      },
      {
        "value": 10000,
        "name": "19"
      },
      {
        "value": 7500,
        "name": "20"
      },
      {
        "value": 5000,
        "name": "21"
      },
      {
        "value": 2500,
        "name": "22"
      },
      {
        "value": 1000,
        "name": "23"
      },
      {
        "value": 500,
        "name": "24"
      },
      {
        "value": 1000,
        "name": "25"
      },
      {
        "value": -111,
        "name": "26"
      },
      {
        "value": 5000,
        "name": "27"
      },
      {
        "value": 10000,
        "name": "28"
      },
      {
        "value": 15000,
        "name": "29"
      },
      {
        "value": 17000,
        "name": "30"
      }]
    }
  ];
}
