import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersUrl: string = '/api/users'
  users = signal<User[]>([])
  authenticatedUser = signal<User | null>(null)

  // Fake login because json-server
  async login(userData: { email: string, password: string }): Promise<boolean> {
    let matchingUser: User | undefined
    let authResult: boolean = false

    const response = await fetch(this.usersUrl)
    const data = await response.json()
    this.users.set(data)

    matchingUser = this.users().find(user => user.email === userData.email)

    // Check for user and match passwords
    if (matchingUser) {
      if (matchingUser.password === userData.password) {
        this.authenticatedUser.set(matchingUser)
        authResult = true
      }
    }
    return authResult
  }

  logout(): boolean {
    this.authenticatedUser.set(null)
    return true
  }

  getAuthenticatedUser() {
    return this.authenticatedUser()
  }

  IsAdminUser() {
    return this.authenticatedUser()?.role === 'admin'
  }
}
