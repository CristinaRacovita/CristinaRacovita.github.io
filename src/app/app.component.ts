import { Component } from '@angular/core';


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
    url: 'https://odin-ai.net',
  };
}
