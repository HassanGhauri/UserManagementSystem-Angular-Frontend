import { Component } from '@angular/core';
import { PRIME_ANGULAR_MODULES } from '../../primeng.imports';
import { RouterOutlet } from '@angular/router';
@Component({
  standalone:true,
  selector: 'app-layout',
  imports:[RouterOutlet,PRIME_ANGULAR_MODULES],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
