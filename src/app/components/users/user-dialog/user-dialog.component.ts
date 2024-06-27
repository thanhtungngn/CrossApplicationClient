import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  userForm: FormGroup;
  roles = ['Reader', 'Contributor', 'Admin'];  // Roles for the dropdown

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      name: [data.user ? data.user.name : '', Validators.required],
      surname: [data.user ? data.user.surname : '', Validators.required],
      email: [data.user ? data.user.email : '', [Validators.required, Validators.email]],
      phone: [data.user ? data.user.phone : '', Validators.required],
      role: [data.user ? data.user.role : '', Validators.required]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
