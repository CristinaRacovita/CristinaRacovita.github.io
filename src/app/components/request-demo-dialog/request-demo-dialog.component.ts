import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-request-demo-dialog',
  templateUrl: './request-demo-dialog.component.html',
  styleUrls: ['./request-demo-dialog.component.scss'],
})
export class RequestDemoDialogComponent {
  public constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RequestDemoDialogComponent>
  ) {}
  public subscribe() {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snackbar'];

    this.snackBar.open('Thank you for your interest', 'OK', config);
    this.dialogRef.close();
  }
}
