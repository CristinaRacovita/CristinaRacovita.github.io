import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AutoMLService {
  public learningReport = new BehaviorSubject<string>('');
  public testingReport = new BehaviorSubject<string>('');
  public predictedColumn = new BehaviorSubject<string>('');
  public trainingDatasetName = new BehaviorSubject<string>('');

  public constructor(private http: HttpClient) {}

  public startLearning(): void {}

  public predict(): void {}

  downloadCSV(fileContent: string) {
    const data: Blob = new Blob([fileContent], {
      type: 'text/csv;charset=utf-8',
    });

    saveAs(data, this.trainingDatasetName.value.replace('.csv', '') + '_solution.csv');
  }
}
