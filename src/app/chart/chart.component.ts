import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-chart',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #chartContainer class="chart-container" [class.visible]="showChart">
      <ngx-charts-line-chart
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
        (select)="dataPointClick($event)"
        (mouseMove)="onMouseMove($event)">
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
  `
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  @Input() lineChartData: any[] = [];

  chartWidth!: number;
  chartHeight!: number;
  yScaleMax!: number;
  showChart = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.updateView();
  }

  ngAfterViewInit(): void {
    this.showChart = true;

    // const tickElement = this.elementRef.nativeElement.querySelector('.x.axis .tick:nth-child(1)');
    // const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    // rectElement.setAttribute('width', '60');
    // rectElement.setAttribute('height', '32');
    // rectElement.setAttribute('fill', 'lightgray');
    // rectElement.setAttribute('transform', 'translate(-26, 0)');

    // tickElement.parentNode.insertBefore(rectElement, tickElement);
  }

  ngOnChanges(): void {
    this.yScaleMax = this.calculateYScaleMax();
  }

  @HostListener('window:resize')
  updateView() {
    this.chartWidth = this.chartContainer.nativeElement.offsetWidth;
    this.chartHeight = window.innerWidth >= 976 ? 400 : 300;
  }

  calculateYScaleMax(): number {
    const buffer = 1.2;

    const maxValue = Math.max(
      ...this.lineChartData.flatMap((series) =>
        series.series.map((dataPoint: any) => dataPoint.value)
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

  xAxisTickFormatting(value: number) {
    return `Jun ${value}`;
  }

  dataPointHover(_: any) { }

  dataPointClick(_: any) { }

  onMouseMove(event: any) {
    console.log('hi')
  }
}
