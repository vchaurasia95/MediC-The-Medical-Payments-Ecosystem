import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-policy-dialog',
  templateUrl: './policy-dialog.component.html',
  styleUrls: ['./policy-dialog.component.scss']
})
export class PolicyDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
}
