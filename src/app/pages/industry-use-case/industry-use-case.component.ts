import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subscription } from 'rxjs';
import { IndustryCsv } from 'src/app/shared/models/industry-csv.enum';
import { Industry } from 'src/app/shared/models/industry.enum';
import { IUseCase } from 'src/app/shared/models/useCase.model';
import { CsvService } from 'src/app/shared/services/csv.service';
import { IndustryService } from 'src/app/shared/services/industry.service';

@Component({
  selector: 'app-industry-use-case',
  templateUrl: './industry-use-case.component.html',
  styleUrls: ['./industry-use-case.component.scss'],
})
export class IndustryUseCaseComponent implements OnInit, OnDestroy {
  public data: Observable<any> = this.csvService.processFile(
    localStorage.getItem('usecase')!!
  );
  public useCases: IUseCase[] = [];
  public industryName: string = '';
  private subscription = new Subscription();

  public constructor(
    private csvService: CsvService,
    private industryService: IndustryService,
    private service: TranslocoService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.goOnTop();
    this.setLanguage();

    const indexOfUseCase: number = Object.values(IndustryCsv).indexOf(
      localStorage.getItem('usecase') as IndustryCsv
    );

    const keyUseCase = Object.keys(IndustryCsv)[indexOfUseCase];
    const industryName: string | undefined = Object.keys(Industry).find(
      (x) => x == keyUseCase
    );

    if (industryName) {
      if (
        !this.checkIndustryPath(
          industryName,
          this.router.routerState.snapshot.url
        )
      ) {
        localStorage.setItem('usecase', IndustryCsv.Finance);
        this.router.navigateByUrl('usecase');
        return;
      }

      this.industryName = industryName.toLowerCase();
      this.subscribeToUseCases(this.industryName);
    }
  }

  public getFirstUsecase(): string {
    if (this.useCases && this.useCases[0]) {
      return this.useCases[0].name;
    }

    return '';
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

  private checkIndustryPath(industryName: string, activeRoute: string) {
    return activeRoute.includes(industryName.toLowerCase());
  }

  private setLanguage(): void {
    const activeLanguage = localStorage.getItem('activeLanguage');
    if (activeLanguage) {
      this.service.setActiveLang(activeLanguage.toLowerCase());
    }
  }

  private goOnTop(): void {
    window.scroll(0, 0);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
