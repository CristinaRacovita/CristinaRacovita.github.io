import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { TrainingResultModel } from 'src/app/shared/models/training-result.model';
import { TrainingModel } from 'src/app/shared/models/training.model';
import { AutoMLService } from 'src/app/shared/services/autoML.service';
import { CsvService } from 'src/app/shared/services/csv.service';

@Component({
  selector: 'app-learning-phase',
  templateUrl: './learning-phase.component.html',
  styleUrls: ['./learning-phase.component.scss'],
})
export class LearningPhaseComponent implements OnInit {
  public csvContent = '';
  public file: File | undefined;
  public data = new Observable<any>();
  public columns: string[] = [];
  public isLoading = false;
  public isContent = false;
  public isFileLoaded = false;
  public selectedColumn: string = '';
  public isSmallScreen = false;

  public constructor(
    private csvService: CsvService,
    private router: Router,
    private autoMlService: AutoMLService,
    private service: TranslocoService,
    breakpointObserver: BreakpointObserver
  ) {
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 765px)');
  }

  public ngOnInit(): void {
    this.setLanguage();
  }

  public isFileSelected(): boolean {
    return this.isFileLoaded;
  }

  public existFileContent(): boolean {
    return this.isContent;
  }

  public isFileNotLoadedCompletly(): boolean {
    if (!this.isFileLoaded) {
      return false;
    }

    return !this.existFileContent();
  }

  public eventSelection(event: any) {
    this.selectedColumn = event.value;
  }

  public isButtonDisabled(): boolean {
    return this.selectedColumn === '';
  }

  public getFile(file: File): void {
    this.file = file;
    if (file !== undefined && !this.isFileLoaded) {
      this.isFileLoaded = true;
    }
  }

  public getCsvContent(content: string): void {
    this.csvContent = content;
    this.isContent = true;
    this.data = this.csvService.processFile(content);
    this.columns = content.split('\n')[0].split(',');
  }

  public startLearning(): void {
    this.isLoading = true;
    this.autoMlService.predictedColumn.next(this.selectedColumn);
    this.autoMlService.trainingDatasetName.next(this.file?.name!!);

    this.autoMlService
      .startLearning(
        new TrainingModel(
          this.selectedColumn,
          btoa(this.csvContent),
          this.file?.name!!
        )
      )

      .subscribe((res: TrainingResultModel | null) => {
        if (res) {
          this.autoMlService.learningReport.next(res);
          this.router.navigateByUrl('demo/learning-report');
        }
        this.isLoading = false;
      });
  }

  private setLanguage(): void {
    const activeLanguage = localStorage.getItem('activeLanguage');
    if (activeLanguage) {
      this.service.setActiveLang(activeLanguage.toLowerCase());
    }
  }
}
