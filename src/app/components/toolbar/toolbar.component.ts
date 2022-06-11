import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { Languages } from 'src/app/shared/models/languages.enum';
import { RequestDemoDialogComponent } from '../dialogs/request-demo-dialog/request-demo-dialog.component';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SectionService } from 'src/app/shared/services/section.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public isSmallScreen = false;
  public languageOption: string = '';
  public languages = Object.values(Languages);
  private subscription = new Subscription();
  private activeRoute = '';

  public constructor(
    public dialog: MatDialog,
    private db: AngularFireDatabase,
    breakpointObserver: BreakpointObserver,
    private router: Router,
    private service: TranslocoService,
    private languageService: LanguageService,
    private sectionService: SectionService
  ) {
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 765px)');
  }

  public ngOnInit(): void {
    this.subscribeToActiveLanguage();
    this.activeRoute = this.router.routerState.snapshot.url;
  }

  public goToSection(section: string) {
    if (`/${section}` !== this.router.routerState.snapshot.url) {
      this.sectionService.activeSection.next(section);
      window.location.hash = section;
    }
  }

  public openDialog(): void {
    this.db.list('demo').push('Press demo ' + new Date());
    this.dialog.open(RequestDemoDialogComponent);
  }

  public isOnHomePage(): boolean {
    return this.activeRoute === '/' || this.activeRoute === '/ro';
  }

  public chooseLanguage(option: string): void {
    this.service.setActiveLang(option.toLowerCase());
    this.languageService.activeLanguage.next(option);
    localStorage.setItem('activeLanguage', option);
  }

  public startDemo(): void {
    this.router.navigateByUrl('demo');
  }

  public isDemoButtonActive(): boolean {
    return !this.activeRoute.startsWith('/demo');
  }

  private subscribeToActiveLanguage(): void {
    this.subscription = this.languageService.activeLanguage.subscribe(
      (lang) => (this.languageOption = lang)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
