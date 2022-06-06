import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AutoMLService } from '../shared/services/autoML.service';

@Injectable()
export class DemoGuard implements CanActivate {
  public constructor(
    private autoMlService: AutoMLService,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (this.autoMlService.predictedColumn.getValue() === '') {
      this.router.navigate(['demo/learning']);
      return false;
    }
    return true;
  }
}
