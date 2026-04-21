import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../utils/user.service';
import { PRIME_ANGULAR_MODULES } from '../../primeng.imports';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogFormComponent } from '../../utils/DialogForm/DialogForm.component';
import { JwtService } from '../../utils/jwt.service';

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

  // 🔐 AUTH CONTROL
  currentUser: User | null = null;
  role: string = '';
  isAdmin: boolean = false;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadUsers();
  }

  // ✅ STEP 1: Get ID from JWT → call API → get role
  loadCurrentUser() {
    const decodedToken = this.jwtService.getDecodedToken();

    console.log('Decoded Token:', decodedToken);

    if (decodedToken && decodedToken.id) {

      const userId = decodedToken.id;

      this.userService.getUserById('user', userId).subscribe({
        next: (user: User) => {
          this.currentUser = user;

          this.role = user.role;
          this.isAdmin = this.role === 'ADMIN';

          console.log('Current User:', user);
          console.log('Role from DB:', this.role);
        },
        error: (err) => {
          console.error('Failed to load current user', err);
        }
      });

    }
  }

  // ✅ LOAD ALL USERS
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

  // ✅ ADMIN ONLY
  onAddUser() {
    if (!this.isAdmin) return;

    this.ref = this.dialogService.open(DialogFormComponent, {
      header: '',
      width: '550px',
      styleClass: 'custom-dialog',
      showHeader: false,
    });

    this.ref.onClose.subscribe((user: User) => {
      if (user) {
        this.userService.createUser('user', user).subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }

  // ✅ ADMIN ONLY
  onEditUser(user: User) {
    if (!this.isAdmin) return;

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
          next: () => this.loadUsers(),
          error: (err) => console.error('Update failed', err),
        });
      }
    });
  }

  // ✅ ADMIN ONLY
  onDeleteUser(user: User) {
    if (!this.isAdmin) return;

    if (!confirm(`Are you sure you want to delete ${user.firstname}?`)) {
      return;
    }

    this.userService.deleteUser('user', user.id).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Delete failed', err),
    });
  }
}