import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { WorkInProgressDialogComponent } from '../work-in-progress-dialog/work-in-progress-dialog.component';

@Component({
  selector: 'app-our-story',
  templateUrl: './our-story.component.html',
  styleUrls: ['./our-story.component.scss'],
})
export class OurStoryComponent {
  public constructor(
    private dialog: MatDialog,
    private db: AngularFireDatabase
  ) {}
  public subscribe(): void {
    this.db.list('subscribe').push('Press subscribe ' + new Date());
    this.dialog.open(WorkInProgressDialogComponent);
  }
}
