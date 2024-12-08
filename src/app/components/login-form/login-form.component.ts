import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoggerService, LogLevel } from '../../services/logger.service';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  private readonly authService = inject(AuthService)
  private readonly loggerService = inject(LoggerService)
  private readonly router = inject(Router)

  get email() {
    return this.userForm.get('email')
  }

  get password() {
    return this.userForm.get('password')
  }

  async onSubmit() {
    const authUser: { email: string, password: string } = {
      email: this.userForm.getRawValue().email as string,
      password: this.userForm.getRawValue().password as string
    }

    try {
      const authResult = await this.authService.login(authUser)
      if (authResult) {
        this.router.navigate(['/'])
      }
    } catch (error) {
      this.loggerService.writeToLog(error as string, LogLevel.ERROR)
    }
  }
}
