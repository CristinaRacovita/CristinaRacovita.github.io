import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { RequestDemoDialogComponent } from '../request-demo-dialog/request-demo-dialog.component';

@Component({
  selector: 'app-work-in-progress-dialog',
  templateUrl: './work-in-progress-dialog.component.html',
  styleUrls: ['./work-in-progress-dialog.component.scss'],
})
export class WorkInProgressDialogComponent {
  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RequestDemoDialogComponent>
  ) {}

  public subscribe(): void {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snackbar'];
    const emails = localStorage.getItem("email")

    this.snackBar.open('Thank you for your interest', 'OK', config);
    this.dialogRef.close();
  }
}
