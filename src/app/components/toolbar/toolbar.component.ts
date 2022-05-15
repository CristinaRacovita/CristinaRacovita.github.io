import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { Languages } from 'src/app/shared/models/languages.enum';
import { RequestDemoDialogComponent } from '../request-demo-dialog/request-demo-dialog.component';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy{
  public isSmallScreen = false;
  public languageOption: string = '';
  public languages = Object.values(Languages);
  private subscription= new Subscription();

  public constructor(
    public dialog: MatDialog,
    private db: AngularFireDatabase,
    breakpointObserver: BreakpointObserver,
    private router: Router,
    private service: TranslocoService,
    private languageService: LanguageService
  ) {
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 765px)');
  }
 
  public ngOnInit(): void {
    this.subscribeToActiveLanguage();
  }

  public goToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }

  public openDialog(): void {
    this.db.list('demo').push('Press demo ' + new Date());
    this.dialog.open(RequestDemoDialogComponent);
  }

  public chooseLanguage(option: string): void {
    this.service.setActiveLang(option.toLowerCase());
    this.languageService.activeLanguage.next(option);
    this.router.navigateByUrl(`/${option.toLowerCase()}`);
  }

  private subscribeToActiveLanguage(): void{
    this.subscription = this.languageService.activeLanguage.subscribe(lang => this.languageOption = lang);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
