import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-request-demo-dialog',
  templateUrl: './request-demo-dialog.component.html',
  styleUrls: ['./request-demo-dialog.component.scss'],
})
export class RequestDemoDialogComponent {
  public email: string = '';
  private regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  private isVisible = false;

  public constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RequestDemoDialogComponent>,
    private db: AngularFireDatabase
  ) {}

  public subscribe() {
    this.isVisible = true;

    if (this.isEmailValid()) {
      this.db.list('emails').push(this.email);

      const config = new MatSnackBarConfig();
      config.panelClass = ['snackbar'];

      this.snackBar.open('Thank you for your interest', 'OK', config);
      this.dialogRef.close();
      this.isVisible = false;

    }
  }

  public isEmailValid(): boolean {
    return this.regexp.test(this.email);
  }

  public isEmailErrorsVisibile(): boolean {
    if(this.isEmailValid()){
      return false;
    }
    return this.isVisible || this.isEmailValid();
  }
}
