import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {
  private duration=3000;
  private successConfig: MatSnackBarConfig = {
    horizontalPosition: "center",
    verticalPosition: "bottom",
    duration: this.duration,
    panelClass: 'success-dialog'
  }
  private warnConfig: MatSnackBarConfig = {
    horizontalPosition: "center",
    verticalPosition: "bottom",
    duration: this.duration,
    panelClass: 'warning-dialog'
  }
  private errorConfig: MatSnackBarConfig = {
    horizontalPosition: "center",
    verticalPosition: "bottom",
    duration: this.duration,
    panelClass: 'error-dialog'
  }

  constructor(private _snackBar: MatSnackBar) { }


  public openSuccessSnackBar(message: any) {
    this._snackBar.open(message, '', this.successConfig);
  }

  public openWarnSnackBar(message: any) {
    this._snackBar.open(message, '', this.warnConfig);
  }

  public openErrorSnackBar(message: any) {
    this._snackBar.open(message, '', this.errorConfig);
  }
}
