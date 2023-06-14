import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="card">
      <div #container class="chart-container">
        <ngx-charts-line-chart
          [@chartAnimation]
          [animations]="false"
          [results]="lineChartData"
          [scheme]="{ domain: ['#0276b1'] }"
          [view]="[chartWidth, chartHeight]"
          [xAxis]="true"
          [xAxisTicks]="[1, 13, 30]"
          [xAxisTickFormatting]="xAxisTickFormatting"
          [yAxis]="true"
          [yAxisTickFormatting]="yAxisTickFormatting"
          [yScaleMax]="yScaleMax"
          (activate)="dataPointHover($event)"
          (select)="dataPointClick($event)">
          <ng-template #tooltipTemplate let-model="model">
            <div class="custom-tooltip">
              <pre>More details...</pre>
            </div>
          </ng-template>
          <ng-template #seriesTooltipTemplate let-model="model[0]">
            <div class="custom-series-tooltip">
              <pre>June 04, 2022</pre>
              <pre>{{ model.value }} impressions</pre>
            </div>  
          </ng-template>
        </ngx-charts-line-chart>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('chartAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  // Values which must be computed prior to render
  chartWidth!: number;
  chartHeight!: number;
  yScaleMax!: number;

  // Todo - pass this in as input
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

  constructor(private readonly changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    // Prevent data points from exceeding the top grid line
    this.yScaleMax = this.calculateYScaleMax();

    // Constrain the graph to it's viewport
    this.updateView();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateView();
  }

  updateView() {
    const maxWidth = 1168;
    const margin = 24; 

    this.chartWidth = Math.min(window.innerWidth, maxWidth) - margin * 2;
    this.chartHeight = window.innerWidth >= 768 ? 400 : 300;
  }

  detectChanges(): void {
    this.changeDetector.detectChanges();
  }

  calculateYScaleMax(): number {
    const buffer = 1.2;

    const maxValue = Math.max(
      ...this.lineChartData.flatMap((series) =>
        series.series.map((dataPoint) => dataPoint.value)
      )
    );

    return maxValue * buffer;
  }

  yAxisTickFormatting(value: number) {
    if (value < 1000) {
      return value.toString();
    }

    const suffixes = ['K', 'M', 'B'];
    const scale = Math.floor(Math.log(value) / Math.log(1000));
    const wholeNumber = value / Math.pow(1000, scale);
    const decimalPlaces = Math.min(scale, 2);
    const suffix = suffixes[scale - 1];

    return wholeNumber.toFixed(decimalPlaces) + suffix;
  }

  xAxisTickFormatting(value: number)  {
    return `Jun ${value}`;
  }

  dataPointHover(_: any) {}

  dataPointClick(_: any) {}
}
