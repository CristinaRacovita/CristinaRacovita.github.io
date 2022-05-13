import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { RequestDemoDialogComponent } from '../request-demo-dialog/request-demo-dialog.component';
import { WorkInProgressDialogComponent } from '../work-in-progress-dialog/work-in-progress-dialog.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  constructor(
    private dialog: MatDialog,
    private db: AngularFireDatabase,
    private translocoService: TranslocoService
  ) {}

  public subscribe(): void {
    this.db.list('subscribe').push('Press subscribe ' + new Date());
    this.dialog.open(WorkInProgressDialogComponent);
  }

  public demo(): void {
    this.db.list('demo').push('Press demo ' + new Date());
    this.dialog.open(RequestDemoDialogComponent);
  }

  public isEnglishActive(): boolean {
    return this.translocoService.getActiveLang() === 'en';
  }
}
