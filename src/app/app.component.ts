import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public schema = {
    '@context': 'https://cristinaracovita.github.io',
    '@type': 'WebSite',
    name: 'odin-ai',
    url: 'https://cristinaracovita.github.io',
  };
}
