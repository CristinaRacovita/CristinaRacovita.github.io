import { Component } from '@angular/core';
import { LinkedIn } from 'src/app/shared/models/linkedIns.enum';
import { SiteService } from 'src/app/shared/services/site.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public email: string = 'odin.automl.ai@gmail.com';
  public constructor(private siteService: SiteService){}

  public openCristinaLinkedln(): void{
    this.siteService.openSite(LinkedIn.Cristina);
  }

  public openBogdanLinkedln(): void{
    this.siteService.openSite(LinkedIn.Bogdan);
  }
}
