import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  @Input()
  public metric: number = -1;

  constructor() {}

  ngOnInit(): void {}

  public existsMetric(): boolean {
    return this.metric !== -1;
  }

  public transformMetric(): number {
    return this.metric * 100;
  }
}
