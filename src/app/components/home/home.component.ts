import { Component, OnInit } from '@angular/core';
import { UserService } from '../../utils/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  users: any[] = [];

  admins: any[] = [];
  managers: any[] = [];
  usersList: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers('users').subscribe({
      next: (data: any) => {
        this.users = data;

        this.admins = this.users.filter(u => u.role === 'ADMIN');
        this.managers = this.users.filter(u => u.role === 'MANAGER');
        this.usersList = this.users.filter(u => u.role === 'USER');

        console.log('All Users:', this.users);
      },
      error: (err) => {
        console.error('Error fetching users', err);
      }
    });
  }
}