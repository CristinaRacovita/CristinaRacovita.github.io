import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CsvService } from 'src/app/shared/services/csv.service';

@Component({
  selector: 'app-learning-phase',
  templateUrl: './learning-phase.component.html',
  styleUrls: ['./learning-phase.component.scss'],
})
export class LearningPhaseComponent {
  public data: Observable<any> = this.csvService.processFile(
    localStorage.getItem('usecase')!!
  );
  constructor(private csvService: CsvService) {}
}
