import { Injectable } from '@angular/core';

@Injectable()
export class SiteService {
  public openSite(url: string): void {
    window.open(url);
  }
}
