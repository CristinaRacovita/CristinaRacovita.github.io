import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public schema = {
    '@context': 'https://odin-ai.net',
    '@type': 'WebSite',
    name: 'odin-ai',
    url: 'https://odin-ai.net'
  };

  public isSmallScreen = false;

  public constructor(private db: AngularFireDatabase, breakpointObserver: BreakpointObserver){
    this.db.list('homePage').push('Home ' + new Date());
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 599px)');
  }
}
