import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LayoutComponent } from '../layout/layout.component';
import { PRIME_ANGULAR_MODULES } from '../../primeng.imports';

@Component({
  selector: 'app-home',
  imports:[PRIME_ANGULAR_MODULES],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  
}
