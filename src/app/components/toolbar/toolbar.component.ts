import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { RequestDemoDialogComponent } from '../request-demo-dialog/request-demo-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  public constructor(
    public dialog: MatDialog,
    private db: AngularFireDatabase
  ) {}

  public goToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }

  public openDialog(): void {
    this.db.list('demo').push('Press demo ' + new Date());
    this.dialog.open(RequestDemoDialogComponent);
  }
}
