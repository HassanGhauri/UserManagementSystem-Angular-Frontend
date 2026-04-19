import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PRIME_ANGULAR_MODULES } from '../../primeng.imports';

@Component({
  selector: 'app-home',
  imports:[SidebarComponent,PRIME_ANGULAR_MODULES],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  
}
