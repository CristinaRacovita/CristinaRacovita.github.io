import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { TrainingResultModel } from 'src/app/shared/models/training-result.model';
import { AutoMLService } from 'src/app/shared/services/autoML.service';
import { CsvService } from 'src/app/shared/services/csv.service';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {
  @Input()
  public metric: number = -1;
  @Input()
  public trainingReport: TrainingResultModel | null = null;
  public data = this.csvService.processB64File(
    this.autoMlService.learningReport.value?.featuresReportFile!!
  );
  public imageBlobUrl: SafeResourceUrl = '';
  public columnToPredict = this.autoMlService.predictedColumn.value;

  public constructor(
    public csvService: CsvService,
    public autoMlService: AutoMLService,
    public imageService: ImageService
  ) {}

  public ngOnInit(): void {
    this.imageBlobUrl = this.imageService.createImageFromBlob(
      this.trainingReport?.featureImportanceImage!!
    );
  }

  public metricZero(): boolean{
    return this.metric === 0;
  }

  public isTrainingMode(): boolean {
    return !(this.trainingReport === null);
  }

  public transformMetric(): string {
    return (this.metric * 100).toFixed(2);
  }

  public ngOnDestroy(): void {
    this.autoMlService.predictedColumn.next(this.columnToPredict);
  }
}
