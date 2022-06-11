import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutoMLService } from 'src/app/shared/services/autoML.service';
import { CsvService } from 'src/app/shared/services/csv.service';

@Component({
  selector: 'app-testing-report',
  templateUrl: './testing-report.component.html',
  styleUrls: ['./testing-report.component.scss'],
})
export class TestingReportComponent {
  public testingReport = this.autoMlService.testingReport.value;
  public predictionFileContent = this.csvService.transformFromb64(
    this.testingReport?.file!!
  );
  public data = this.csvService.processFile(this.predictionFileContent);
  public predictedColumn = this.autoMlService.predictedColumn.value;

  public constructor(
    private autoMlService: AutoMLService,
    private csvService: CsvService,
    private router: Router
  ) {}

  public save(): void {
    this.autoMlService.downloadCSV(this.predictionFileContent);
  }

  public testAgain(): void {
    this.autoMlService.predictedColumn.next(this.predictedColumn);
    this.router.navigateByUrl('demo/testing');
  }
}
