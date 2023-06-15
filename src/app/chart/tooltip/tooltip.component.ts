import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `
  <div class="custom-series-tooltip">
    <pre>June 04, 2022</pre>
    <pre>{{ model.value }} impressions</pre>
  </div>  
  `
})
export class TooltipComponent implements AfterViewInit {
  @Input() model: any;
  @Output() tooltipRendered: EventEmitter<any> = new EventEmitter();

  ngAfterViewInit(): void {
    this.tooltipRendered.emit(this.model);
  }
}