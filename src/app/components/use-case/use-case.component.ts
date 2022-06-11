import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IndustryCsv } from 'src/app/shared/models/industry-csv.enum';
import { Industry } from 'src/app/shared/models/industry.enum';
import { IIndustry } from 'src/app/shared/models/industry.model';
import { IUseCase } from 'src/app/shared/models/useCase.model';
import { IndustryService } from 'src/app/shared/services/industry.service';
import { ContactUsDialogComponent } from '../dialogs/contact-us-dialog/contact-us-dialog.component';

@Component({
  selector: 'app-use-case',
  templateUrl: './use-case.component.html',
  styleUrls: ['./use-case.component.scss'],
})
export class UseCaseComponent implements OnInit {
  public industries$ = new Observable<IIndustry[]>();
  public othersCard!: IIndustry;
  public contactButtonText = 'contact-us';

  constructor(
    private industryService: IndustryService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.industries$ = this.industryService.getIndustries();
    this.populateOthersCard();
  }

  public goToUseCase(industryName: string): void {
    if (industryName == 'others') {
      this.openContactUsDialog();
    } else {
      switch (industryName) {
        case Industry.Finance:
          this.navigateToUseCase(IndustryCsv.Finance, industryName);
          return;
        case Industry.Manufacturing:
          this.navigateToUseCase(IndustryCsv.Manufacturing, industryName);
          return;
        case Industry.Marketing:
          this.navigateToUseCase(IndustryCsv.Marketing, industryName);
          return;
        case Industry.Transport:
          this.navigateToUseCase(IndustryCsv.Transport, industryName);
          return;
        default:
          this.navigateToUseCase(IndustryCsv.Finance, industryName);
          return;
      }
    }
  }

  private navigateToUseCase(csv: string, industryName: string) {
    localStorage.setItem('usecase', csv);
    this.router.navigateByUrl(`usecase/${industryName}`);
  }

  private openContactUsDialog(): void {
    this.dialog.open(ContactUsDialogComponent);
  }

  private populateOthersCard(): void {
    const othersUseCase = new IUseCase('others-1');
    this.othersCard = new IIndustry('others', [othersUseCase]);
  }
}
