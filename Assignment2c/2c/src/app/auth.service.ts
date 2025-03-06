import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUser: any = null;

  register(user: any) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users)); // Store users in local storage
  }

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      this.loggedInUser = user;
      localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store logged-in user
      return true;
    }
    return false;
  }

  getUser() {
    return this.loggedInUser || JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  logout() {
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser'); // Clear logged-in user
  }
}
