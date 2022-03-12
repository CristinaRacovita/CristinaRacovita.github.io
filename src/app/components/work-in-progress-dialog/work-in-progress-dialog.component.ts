import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { RequestDemoDialogComponent } from '../request-demo-dialog/request-demo-dialog.component';

@Component({
  selector: 'app-work-in-progress-dialog',
  templateUrl: './work-in-progress-dialog.component.html',
  styleUrls: ['./work-in-progress-dialog.component.scss'],
})
export class WorkInProgressDialogComponent {
  public email: string = '';
  private regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  private isVisible = false;

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RequestDemoDialogComponent>,
    private db: AngularFireDatabase
  ) {}

  public requestDemo(): void {
    this.db.list('demo').push('Press demo ' + new Date());
    this.isVisible = true;

    if (this.isEmailValid()) {
      this.db.list('emails').push(this.email);
      const config = new MatSnackBarConfig();
      config.panelClass = ['snackbar'];
      const emails = localStorage.getItem('email');

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
