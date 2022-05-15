import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IIndustry } from 'src/app/shared/models/industry.model';
import { IUseCase } from 'src/app/shared/models/useCase.model';
import { IndustryService } from 'src/app/shared/services/industry.service';
import { ContactUsDialogComponent } from '../contact-us-dialog/contact-us-dialog.component';

@Component({
  selector: 'app-use-case',
  templateUrl: './use-case.component.html',
  styleUrls: ['./use-case.component.scss'],
})
export class UseCaseComponent implements OnInit {
  public industries$ = new Observable<IIndustry[]>();
  public othersCard!: IIndustry;
  public contactButtonText = 'contact-us';

  constructor(private industryService: IndustryService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.industries$ = this.industryService.getIndustries();
    this.populateOthersCard();
  }

  public openContactUsDialog(): void{
    this.dialog.open(ContactUsDialogComponent);
  }

  private populateOthersCard(): void {
    const othersUseCase = new IUseCase('others-1');
    this.othersCard = new IIndustry('others', [othersUseCase]);
  }
}
