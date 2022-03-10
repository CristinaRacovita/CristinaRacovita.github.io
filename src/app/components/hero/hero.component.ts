import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestDemoDialogComponent } from '../request-demo-dialog/request-demo-dialog.component';
import { WorkInProgressDialogComponent } from '../work-in-progress-dialog/work-in-progress-dialog.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  constructor(private dialog: MatDialog) {}

  public subscribe(): void {
    this.dialog.open(WorkInProgressDialogComponent);
  }

  public demo(): void {
    this.dialog.open(RequestDemoDialogComponent);
  }
}
