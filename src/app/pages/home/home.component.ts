import { BreakpointObserver } from '@angular/cdk/layout';
import { ViewportScroller } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SectionService } from 'src/app/shared/services/section.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('container')
  container!: ElementRef<HTMLElement>;

  public isSmallScreen = false;
  private subscription = new Subscription();

  public constructor(
    private db: AngularFireDatabase,
    breakpointObserver: BreakpointObserver,
    private router: Router,
    private service: TranslocoService,
    private languageService: LanguageService,
    private viewportScroller: ViewportScroller,
    private sectionService: SectionService
  ) {
    this.db.list('homePage').push('Home ' + new Date());
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 765px)');

    // this.subscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     if (event.url.includes(Languages.Romanian.toLowerCase())) {
    //       this.service.setActiveLang(Languages.Romanian.toLowerCase());
    //       this.languageService.activeLanguage.next(Languages.Romanian);
    //     }
    //     if (event.url.includes(Languages.English.toLowerCase())) {
    //       this.service.setActiveLang(Languages.English.toLowerCase());
    //       this.languageService.activeLanguage.next(Languages.English);
    //     }
    //   }
    // });
  }

  public ngOnInit(): void {
    const activeLanguage = localStorage.getItem('activeLanguage');
    if (activeLanguage) {
      this.languageService.activeLanguage.next(activeLanguage);
      this.service.setActiveLang(activeLanguage.toLowerCase());
    }
  }

  public ngAfterViewInit(): void {
    this.viewportScroller.scrollToAnchor(
      this.sectionService.activeSection.getValue()
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
