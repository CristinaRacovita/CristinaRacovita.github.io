import { BreakpointObserver } from '@angular/cdk/layout';
import { ViewportScroller } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router, NavigationEnd } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Languages } from 'src/app/shared/models/languages.enum';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SectionService } from 'src/app/shared/services/section.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('container')
  container!: ElementRef<HTMLElement>;

  public isSmallScreen = false;

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
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes(Languages.Romanian.toLowerCase())) {
          this.service.setActiveLang(Languages.Romanian.toLowerCase());
          this.languageService.activeLanguage.next(Languages.Romanian);
        }
        if (event.url.includes(Languages.English.toLowerCase())) {
          this.service.setActiveLang(Languages.English.toLowerCase());
          this.languageService.activeLanguage.next(Languages.English);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.viewportScroller.scrollToAnchor(this.sectionService.activeSection.getValue());
  }
}
