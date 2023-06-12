import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="width: 800px; margin: 4rem auto;">
      <ngx-charts-line-chart
        [@chartAnimation]
        [animations]="false"
        [results]="lineChartData"
        [scheme]="colorScheme"
        [view]="[800, 400]"
        [xAxis]="true"
        [yAxis]="true"
        [xAxisTicks]="[1, 13, 30]"
        [xAxisTickFormatting]="xAxisTickFormatting"
        [yAxisTickFormatting]="yAxisTickFormatting"
        (activate)="onActivate($event)"
        (deactivate)="onDeactivate($event)"
        (select)="onDataPointClick($event)"
        (mouseMove)="onMouseMove($event)">
        <ng-template #tooltipTemplate let-model="model">
          <div class="custom-tooltip">
            <pre>{{ model | json }}</pre>
          </div>
        </ng-template>
        <ng-template #seriesTooltipTemplate let-model="model">
          <div class="custom-series-tooltip">
            <pre>{{ model | json }}</pre>
          </div>  
        </ng-template>
      </ngx-charts-line-chart>
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
export class AppComponent {

  @ViewChild('tooltipTemplate', { static: false}) tooltipTemplate!: TemplateRef<any>;
  @ViewChild('seriesTooltipTemplate', { static: false}) seriesTooltipTemplate!: TemplateRef<any>;

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

  colorScheme = { domain: ['#0276b1'] };

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

  xAxisTickFormatting(value: any)  {
    return `Jun ${value}`;
  }

  onActivate(event: any) {
    // console.log('Hovered over', event.value);
  }

  onDeactivate(event: any) {
    // console.log(event);
  }

  onMouseMove(event: any) {

  }

  onDataPointClick(data: any) {
    console.log(data);
  }
}
