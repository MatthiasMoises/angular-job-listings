import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoggerService, LogLevel } from '../../services/logger.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  model = {
    email: '',
    password: ''
  }

  loginError: string | null = null

  private readonly authService = inject(AuthService)
  private readonly loggerService = inject(LoggerService)
  private readonly router = inject(Router)

  async onSubmit(loginForm: NgForm) {
    const authUser: { email: string, password: string } = {
      email: this.model.email as string,
      password: this.model.password as string
    }

    try {
      const authSuccess = await this.authService.login(authUser)

      if (authSuccess) {
        this.router.navigate(['/'])
      }
      else {
        loginForm.resetForm()
        this.loginError = 'Invalid credentials. Please try again'
      }
    } catch (error) {
      this.loggerService.writeToLog(error as string, LogLevel.ERROR)
    }
  }
}
