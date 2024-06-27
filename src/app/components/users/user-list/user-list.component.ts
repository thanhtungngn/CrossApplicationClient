import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'phone', 'role', 'actions'];
  dataSource: User[];
  errorMessage :string;

  constructor(private userService: UserService, public dialog : MatDialog) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.dataSource = users;
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '600px',
      data: { user: user, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.userService.updateUser(user.id, result).subscribe({
          next: response => {
            alert(response.message);
            this.loadUsers(); // refresh the list after deleting a user

          },
          error: error => {
         
              alert("Failed to update user"); // Display error message

            
          }
        });
        console.log('User data:', result);
      }
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(user => user.id !== id);
      this.loadUsers(); // refresh the list after deleting a user
    });
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '600px',
      data: { user: null, isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.createUser(result).subscribe({
          next: response => {
            alert(response.message);
            this.loadUsers(); // refresh the list after deleting a user

          },
          error: error => {
         
              alert("Failed to create new user"); // Display error message

            
          }
        });
        console.log('User data:', result);
      }
    });
  }
}
