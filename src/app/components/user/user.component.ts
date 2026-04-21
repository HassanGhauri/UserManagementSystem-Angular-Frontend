import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../utils/user.service';
import { PRIME_ANGULAR_MODULES } from '../../primeng.imports';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogFormComponent } from '../../utils/DialogForm/DialogForm.component';
interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  age: number;
  profession: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, PRIME_ANGULAR_MODULES],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;

  ref: DynamicDialogRef | undefined;

  constructor(
    private userService: UserService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;

    this.userService.getAllUsers('users').subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching users', err);
        this.loading = false;
      },
    });
  }

  getRoleSeverity(role: string) {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'danger';
      case 'user':
        return 'success';
      default:
        return 'info';
    }
  }
  // ✅ OPEN ADD USER DIALOG
  onAddUser() {
    this.ref = this.dialogService.open(DialogFormComponent, {
      header: '', // 👈 REMOVE "User Form"
      width: '550px',
      styleClass: 'custom-dialog',
      showHeader: false, // 👈 IMPORTANT
    });

    this.ref.onClose.subscribe((user: User) => {
      if (user) {
        console.log(user);
        this.userService.createUser('user', user).subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }

  // ✅ OPEN EDIT USER DIALOG
  onEditUser(user: User) {
    this.ref = this.dialogService.open(DialogFormComponent, {
      header: '',
      width: '550px',
      styleClass: 'custom-dialog',
      data: { user },
      showHeader: false,
    });

    this.ref.onClose.subscribe((updatedUser: User) => {
      if (updatedUser) {
        this.userService.updateUser('user', user.id, updatedUser).subscribe({
          next: () => {
            this.loadUsers(); // refresh table
          },
          error: (err) => {
            console.error('Update failed', err);
          },
        });
      }
    });
  }

  onDeleteUser(user: User) {
    if (!confirm(`Are you sure you want to delete ${user.firstname}?`)) {
      return;
    }

    this.userService.deleteUser('user', user.id).subscribe({
      next: () => {
        this.loadUsers(); // refresh list
      },
      error: (err) => {
        console.error('Delete failed', err);
      },
    });
  }
}
