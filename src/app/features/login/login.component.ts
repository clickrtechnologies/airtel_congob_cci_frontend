import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  login(): void {

    if (
      this.username === 'admin' &&
      this.password === 'admin123'
    ) {

      localStorage.setItem('loggedInUser', this.username);

      this.router.navigate(['/dashboard']);

    } else {

      this.errorMessage =
        'Invalid Username or Password';
    }
  }

}
