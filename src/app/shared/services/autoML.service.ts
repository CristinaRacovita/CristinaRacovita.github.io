import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AutoMLService {
  public learningReport = new BehaviorSubject<string>('');
  public testingReport = new BehaviorSubject<string>('');

  public constructor(private http: HttpClient) {}

  public startLearning(): void {}

  public predict(): void {}

  public savePrediction(data: string): void {
    const u8arr = new Blob([data], { type: 'text/plain; charset=utf-8' });
    // saveAs(new File([u8arr], 'test.csv', { type: 'csv' }));
  }
}
