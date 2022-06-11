import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutoMLService } from 'src/app/shared/services/autoML.service';

@Component({
  selector: 'app-learning-report',
  templateUrl: './learning-report.component.html',
  styleUrls: ['./learning-report.component.scss'],
})
export class LearningReportComponent {
  public trainingReport = this.autoMlService.learningReport.value;

  public constructor(
    private router: Router,
    private autoMlService: AutoMLService
  ) {}

  public startTest(): void {
    this.router.navigateByUrl('demo/testing');
  }
}
