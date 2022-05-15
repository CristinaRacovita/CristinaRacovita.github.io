import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IIndustry } from 'src/app/shared/models/industry.model';
import { IUseCase } from 'src/app/shared/models/useCase.model';
import { IndustryService } from 'src/app/shared/services/industry.service';

@Component({
  selector: 'app-use-case',
  templateUrl: './use-case.component.html',
  styleUrls: ['./use-case.component.scss'],
})
export class UseCaseComponent implements OnInit {
  public industries$ = new Observable<IIndustry[]>();
  public othersCard!: IIndustry;
  public contactButtonText = 'contact-us';

  constructor(private industryService: IndustryService) {}

  ngOnInit(): void {
    this.industries$ = this.industryService.getIndustries();
    this.populateOthersCard();
  }

  private populateOthersCard(): void {
    const othersUseCase = new IUseCase('others-1');
    this.othersCard = new IIndustry('others', [othersUseCase]);
  }
}
