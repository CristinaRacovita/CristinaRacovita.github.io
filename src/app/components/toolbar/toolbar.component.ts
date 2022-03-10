import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestDemoDialogComponent } from '../request-demo-dialog/request-demo-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  public constructor(public dialog: MatDialog) {}

  public goToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }

  public openDialog(): void {
    this.dialog.open(RequestDemoDialogComponent);
  }
}
