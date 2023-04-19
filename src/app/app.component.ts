import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Color, LineChartComponent } from '@swimlane/ngx-charts';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <div style="width: 800px; margin: 4rem auto;">
      <ngx-charts-line-chart #lineChart
        [results]="lineChartData"
        [scheme]="colorScheme"
        [view]="[800, 400]"
        [tooltipDisabled]="false"
        [xAxis]="true"
        [yAxis]="true"
        [xAxisTicks]="[1, 13, 30]"
        [yAxisTickFormatting]="yAxisTickFormatting"
        (activate)="onActivate($event)"
        (deactivate)="onDeactivate($event)"
        (select)="onDataPointClick($event)"
        (mouseMove)="onMouseMove($event)">
        <ng-template #xAxisTickTemplate let-value="value" let-index="index">
          <span>Label</span>
        </ng-template>
      </ngx-charts-line-chart>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // The ! modifier asserts that the lineChart will be initialized before it is used
  @ViewChild('lineChart') lineChart!: LineChartComponent;
  @ViewChild('xAxisTickTemplate', { read: TemplateRef }) xAxisTicks!: TemplateRef<any>;

  constructor(private sanitizer: DomSanitizer, private viewContainerRef: ViewContainerRef) {}

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
        "value": -1,
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

  colorScheme = { domain: ['#0276b1'] } as Color;

  yAxisTickFormatting(value: any) {
    return value + '?';
  }

  xAxisTickFormatting(value: any)  {
    // const styles = 'font-weight: bold; font-size: 16px;';
    // const formattedValue = `<span style="${styles}">Apr. ${value}</span>`;
    // return this.sanitizer.bypassSecurityTrustHtml(formattedValue);

    // return `<span style="font-weight: bold; font-size: 16px;">Apr. ${value}</span>`;
    return 'Apr. ' + value; 
  }

  onActivate(event: any) {
    // console.log(event);
  }

  onDeactivate(event: any) {
    // console.log(event);
  }

  onMouseMove(event: any) {

  }

  onDataPointClick(data: any) {
    // console.log(data);
    const viewRef = this.viewContainerRef.createEmbeddedView(this.xAxisTicks);
    const innerHtml = viewRef.rootNodes[0].innerHTML;
    console.log(innerHtml); // Outputs: "Hello World"
  }
}
