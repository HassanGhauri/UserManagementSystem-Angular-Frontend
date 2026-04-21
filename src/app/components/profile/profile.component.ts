import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../utils/jwt.service';
import { UserService } from '../../utils/user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  user: any = null;
  loading = true;

  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    const decodedToken = this.jwtService.getDecodedToken();

    console.log('Decoded Token:', decodedToken);

    if (decodedToken && decodedToken.id) {

      const userId = decodedToken.id;

      this.userService.getUserById('user', userId).subscribe({
        next: (data) => {
          this.user = data;
          this.loading = false;
          console.log('User Profile:', data);
        },
        error: (err) => {
          console.error('Error fetching user:', err);
          this.loading = false;
        }
      });

    } else {
      console.error('Invalid token or missing user id');
      this.loading = false;
    }
  }
}