import { Component } from '@angular/core';
import { LinkedIn } from 'src/app/shared/models/linkedIns.enum';
import { Name } from 'src/app/shared/models/names.enum';
import { Profile } from 'src/app/shared/models/profiles.enum';
import { SiteService } from 'src/app/shared/services/site.service';

const formUrl = 'https://forms.gle/Aw9i53FDkYWd3KXr9';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  constructor(private siteService: SiteService){}  

  public openForm(): void{
    this.siteService.openSite(formUrl);
  }

  public openCristinaLinkeIn(): void{
    this.siteService.openSite(LinkedIn.Cristina);
  }

  public openBogdanLinkeIn(): void{
    this.siteService.openSite(LinkedIn.Bogdan);
  }

  public get cristinasName(): string{
    return Name.Cristina;
  }

  public get bogdansName(): string{
    return Name.Bogdan;
  }

  public get cristinasPicture(): string{
    return Profile.Cristina;
  }

  public get bogdansPicture(): string{
    return Profile.Bogdan;
  }
}
