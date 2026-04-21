import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PRIME_ANGULAR_MODULES } from '../../primeng.imports';

@Component({
  selector: 'app-dialog-form',
  standalone: true,
  imports: [CommonModule, FormsModule, PRIME_ANGULAR_MODULES],
  templateUrl: './DialogForm.component.html',
  styleUrl: './DialogForm.component.scss',
})
export class DialogFormComponent {
  user: any;

  roles = [
    { label: 'USER', value: 'USER' },
    { label: 'ADMIN', value: 'ADMIN' },
    { label: 'MANAGER', value: 'MANAGER' },
  ];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    this.user = this.config.data?.user || {
      firstname: '',
      lastname: '',
      email: '',
      age: 0,
      profession: '',
      password: '',
      role: null, // ✅ show placeholder instead of default value
    };
  }

  save() {
    this.ref.close(this.user);
  }

  cancel() {
    this.ref.close(null);
  }
}
