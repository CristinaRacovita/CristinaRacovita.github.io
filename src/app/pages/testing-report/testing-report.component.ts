import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IndustryCsv } from 'src/app/shared/models/industry-csv.enum';
import { AutoMLService } from 'src/app/shared/services/autoML.service';
import { CsvService } from 'src/app/shared/services/csv.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-testing-report',
  templateUrl: './testing-report.component.html',
  styleUrls: ['./testing-report.component.scss'],
})
export class TestingReportComponent {
  public data: Observable<any> = this.csvService.processFileByName(
    IndustryCsv.Manufacturing
  );
  public reportContent = this.autoMlService.learningReport.value;

  public constructor(
    private autoMlService: AutoMLService,
    private csvService: CsvService
  ) {}

  public save(): void {
    window.print();
    // this.autoMlService.savePrediction('Id,Name\n1,Bogdan');
  }
}
