import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  public urls = ['../../../assets/profile-picture1.svg', '../../../assets/profile-picture2.svg'];
  public names = ['Cristina Racovita', 'Mihai Bogdan Bindila'];
  public formUrl = 'https://forms.gle/Aw9i53FDkYWd3KXr9';
  public cristinaLinkedinUrl='https://www.linkedin.com/in/cristina-racovita/';
  public bogdanLinkedinUrl='https://www.linkedin.com/in/bogdan-bindila/';

  public openSite(url: string): void{
    window.open(url);
  }
}
