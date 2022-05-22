import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IndustryCsv } from 'src/app/shared/models/industry-csv.enum';
import { Industry } from 'src/app/shared/models/industry.enum';
import { IUseCase } from 'src/app/shared/models/useCase.model';
import { CsvService } from 'src/app/shared/services/csv.service';
import { IndustryService } from 'src/app/shared/services/industry.service';
import { SectionService } from 'src/app/shared/services/section.service';

@Component({
  selector: 'app-industry-use-case',
  templateUrl: './industry-use-case.component.html',
  styleUrls: ['./industry-use-case.component.scss'],
})
export class IndustryUseCaseComponent implements OnInit, OnDestroy {
  public data: Observable<any> = this.csvService.processFile(
    this.sectionService.activeUseCase.value
  );
  public useCases: IUseCase[] = [];
  public industryName: string = '';
  private subscription = new Subscription();

  public constructor(
    private csvService: CsvService,
    private sectionService: SectionService,
    public industryService: IndustryService
  ) {}

  public ngOnInit(): void {
    const indexOfUseCase: number = Object.values(IndustryCsv).indexOf(
      this.sectionService.activeUseCase.value as IndustryCsv
    );

    const keyUseCase = Object.keys(IndustryCsv)[indexOfUseCase];
    const industryName: string | undefined = Object.keys(Industry).find(
      (x) => x == keyUseCase
    );

    if (industryName) {
      this.industryName = industryName.toLowerCase();
      this.subscribeToUseCases(this.industryName);
    }
  }

  private subscribeToUseCases(industryName: string): void {
    this.subscription = this.industryService
      .getUseCasesByIndustryName(industryName.toLowerCase())
      .subscribe((useCases: IUseCase[] | undefined) => {
        if (useCases) {
          this.useCases = useCases;
        }
      });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
