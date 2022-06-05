import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Languages } from 'src/app/shared/models/languages.enum';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent {
  public isSmallScreen = false;

  public constructor(
    breakpointObserver: BreakpointObserver,
    private translocoService: TranslocoService
  ) {
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 765px)');
  }

  public isEnglishActive(): boolean {
    return this.translocoService.getActiveLang() === 'en';
  }
}
