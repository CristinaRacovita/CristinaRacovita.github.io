import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IndustryCsv } from 'src/app/shared/models/industry-csv.enum';
import { AutoMLService } from 'src/app/shared/services/autoML.service';
import { CsvService } from 'src/app/shared/services/csv.service';

@Component({
  selector: 'app-testing-report',
  templateUrl: './testing-report.component.html',
  styleUrls: ['./testing-report.component.scss'],
})
export class TestingReportComponent implements OnInit {
  public data: Observable<any> = this.csvService.processFileByName(
    IndustryCsv.Manufacturing
  );
  public reportContent = this.autoMlService.learningReport.value;
  public predictedColumn: string = '';

  public constructor(
    private autoMlService: AutoMLService,
    private csvService: CsvService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.predictedColumn = this.autoMlService.predictedColumn.value;
  }

  public save(): void {
    window.print();
    this.autoMlService.downloadCSV('Id,Name\n1,Bogdan');
  }

  public testAgain(): void {
    this.router.navigateByUrl('demo/testing');
  }
}
