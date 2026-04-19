import { Component } from '@angular/core';
import { PRIME_ANGULAR_MODULES } from '../../primeng.imports';

@Component({
  standalone:true,
  selector: 'app-sidebar',
  imports:[PRIME_ANGULAR_MODULES],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
