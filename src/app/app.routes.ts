import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },

  {
    path: 'app',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UserComponent },
      { path: 'profilesettings', component: ProfileComponent }
    ]
  }
];