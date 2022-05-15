import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NavigationEnd, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Languages } from './shared/models/languages.enum';
import { LanguageService } from './shared/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public schema = {
    '@context': 'https://odin-ai.net',
    '@type': 'WebSite',
    name: 'odin-ai',
    url: 'https://odin-ai.net',
  };

  public isSmallScreen = false;

  public constructor(
    private db: AngularFireDatabase,
    breakpointObserver: BreakpointObserver,
    private router: Router,
    private service: TranslocoService,
    private languageService: LanguageService
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
}
