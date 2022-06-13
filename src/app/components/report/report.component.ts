import { Component, Input, OnInit } from '@angular/core';
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
export class ReportComponent implements OnInit {
  @Input()
  public metric: number = -1;
  @Input()
  public trainingReport: TrainingResultModel | null = null;
  public data = this.csvService.processB64File(
    this.autoMlService.learningReport.value?.featuresReportFile!!
  );
  public imageBlobUrl: SafeResourceUrl = '';

  public constructor(
    public csvService: CsvService,
    public autoMlService: AutoMLService,
    public imageService: ImageService
  ) {}

  public ngOnInit(): void {
    this.imageBlobUrl = this.imageService.createImageFromBlob(
      this.trainingReport?.featureImportanceImage!!
    );

    // this.imageService.imageBlobUrl.subscribe((url) => {
    //   if (url) {
    //     this.imageBlobUrl = url;
    //   }
    // });
  }

  public isTrainingMode(): boolean {
    return !(this.trainingReport === null);
  }

  public transformMetric(): string {
    return (this.metric * 100).toFixed(2);
  }
}
