import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TestingModel } from 'src/app/shared/models/testing.model';
import { AutoMLService } from 'src/app/shared/services/autoML.service';
import { CsvService } from 'src/app/shared/services/csv.service';

@Component({
  selector: 'app-testing-phase',
  templateUrl: './testing-phase.component.html',
  styleUrls: ['./testing-phase.component.scss'],
})
export class TestingPhaseComponent implements OnInit {
  public csvContent = '';
  public file: File | undefined;
  public data = new Observable<any>();
  public columns: string[] = [];
  public isLoading = false;
  public predictedColumn: string = '';

  public constructor(
    private csvService: CsvService,
    private router: Router,
    private autoMlService: AutoMLService
  ) {}

  public ngOnInit(): void {
    this.predictedColumn = this.autoMlService.predictedColumn.value;
  }

  public isFileSelected(): boolean {
    return !(this.file === undefined);
  }

  public isFileContentNotExists(): boolean {
    return this.isFileSelected() && this.csvContent == '';
  }

  public getFile(file: File): void {
    this.file = file;
  }

  public getCsvContent(content: string): void {
    this.csvContent = content;
    this.data = this.csvService.processFile(content);
    this.columns = content.split('\n')[0].split(',');
  }

  public startTesting(): void {
    this.isLoading = true;
    const trainingDataset = this.autoMlService.trainingDatasetName.value;
    this.autoMlService.trainingDatasetName.next(trainingDataset);

    this.autoMlService
      .predict(
        new TestingModel(
          this.predictedColumn,
          btoa(this.csvContent),
          this.file?.name!!,
          trainingDataset
        )
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.isLoading = false;
          this.router.navigateByUrl('demo/testing-report');
        },
        (err) => console.log(err)
      );
  }
}
