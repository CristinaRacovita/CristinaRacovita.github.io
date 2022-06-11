import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { RequestDemoDialogComponent } from '../dialogs/request-demo-dialog/request-demo-dialog.component';
import { WorkInProgressDialogComponent } from '../dialogs/work-in-progress-dialog/work-in-progress-dialog.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  constructor(
    private dialog: MatDialog,
    private db: AngularFireDatabase,
    private translocoService: TranslocoService,
    private router: Router
  ) {}

  public subscribe(): void {
    this.db.list('subscribe').push('Press subscribe ' + new Date());
    this.dialog.open(WorkInProgressDialogComponent);
  }

  public demo(): void {
    this.db.list('demo').push('Press demo ' + new Date());
    this.router.navigateByUrl('demo');
  }

  public isEnglishActive(): boolean {
    return this.translocoService.getActiveLang() === 'en';
  }
}
