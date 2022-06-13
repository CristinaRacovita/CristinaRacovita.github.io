import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as saveAs from 'file-saver';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/components/dialogs/error-dialog/error-dialog.component';
import { TestingResultDto } from '../dtos/testing-result.dto';
import { TestingDto } from '../dtos/testing.dto';
import { TrainingResultDto } from '../dtos/training-result.dto';
import { TrainingDto } from '../dtos/training.dto';
import { TestingResultModel } from '../models/testing-result.model';
import { TestingModel } from '../models/testing.model';
import { TrainingResultModel } from '../models/training-result.model';
import { TrainingModel } from '../models/training.model';

@Injectable()
export class AutoMLService {
  private baseUrl = 'http://127.0.0.1:8000/backend/';//'https://odin-ai-backend-on.azurewebsites.net/backend/';
  public learningReport = new BehaviorSubject<TrainingResultModel | null>(null);
  public testingReport = new BehaviorSubject<TestingResultModel | null>(null);
  public predictedColumn = new BehaviorSubject<string>('');
  public trainingDatasetName = new BehaviorSubject<string>('');

  public constructor(private http: HttpClient, private dialog: MatDialog) {}

  public startLearning(
    trainingModel: TrainingModel
  ): Observable<TrainingResultModel | null> {
    trainingModel.targetColumn = trainingModel.targetColumn.replace('\r', '');

    return this.http
      .post<TrainingResultDto>(
        `${this.baseUrl}train/`,
        this.trainingModelToTrainingDto(trainingModel)
      )
      .pipe(
        map((res: TrainingResultDto) =>
          this.trainingResultDtoToTrainingResultModel(res)
        ),
        catchError((err) => {
          this.dialog.open(ErrorDialogComponent, {
            data: { isTest: false },
          });
          return of(null);
        })
      );
  }

  public predict(
    testingModel: TestingModel
  ): Observable<TestingResultModel | null> {
    testingModel.targetColumn = testingModel.targetColumn.replace('\r', '');
    return this.http
      .post<TestingResultDto>(
        `${this.baseUrl}test/`,
        this.testingModelToTestingDto(testingModel)
      )
      .pipe(
        map((res: TestingResultDto) =>
          this.testingResultDtoToTestingResultModel(res)
        ),
        catchError((err) => {
          this.dialog.open(ErrorDialogComponent, {
            data: { isTest: true },
          });
          return of(null);
        })
      );
  }

  public downloadCSV(fileContent: string): void {
    const data: Blob = new Blob([fileContent], {
      type: 'text/csv;charset=utf-8',
    });

    saveAs(
      data,
      this.trainingDatasetName.value.replace('.csv', '') + '_solution.csv'
    );
  }

  private trainingModelToTrainingDto(
    trainingModel: TrainingModel
  ): TrainingDto {
    return new TrainingDto(
      trainingModel.targetColumn,
      trainingModel.fileContent,
      trainingModel.filename,
      trainingModel.lang
    );
  }

  private trainingResultDtoToTrainingResultModel(
    trainingResultDto: TrainingResultDto
  ): TrainingResultModel {
    return new TrainingResultModel(
      trainingResultDto.score,
      trainingResultDto.shape,
      trainingResultDto.useless_columns,
      trainingResultDto.duplicated_rows,
      trainingResultDto.features_report_file,
      trainingResultDto.feature_importance_image
    );
  }

  private testingModelToTestingDto(testingModel: TestingModel): TestingDto {
    return new TestingDto(
      testingModel.targetColumn,
      testingModel.fileContent,
      testingModel.filename,
      testingModel.trainFilename
    );
  }

  private testingResultDtoToTestingResultModel(
    testingResultDto: TestingResultDto
  ): TestingResultModel {
    return new TestingResultModel(
      testingResultDto.score,
      testingResultDto.file
    );
  }
}
