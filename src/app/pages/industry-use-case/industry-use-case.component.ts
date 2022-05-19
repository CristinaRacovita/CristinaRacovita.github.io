import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CsvService } from 'src/app/shared/services/csv.service';

@Component({
  selector: 'app-industry-use-case',
  templateUrl: './industry-use-case.component.html',
  styleUrls: ['./industry-use-case.component.scss'],
})
export class IndustryUseCaseComponent {
  public data: Observable<any> = this.csvService.processFile(
    'targeted_advertisement_demo'
  );

  public constructor(private csvService: CsvService) {}
}
