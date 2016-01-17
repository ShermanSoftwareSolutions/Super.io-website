import {Component} from 'angular2/core';
import {UserService} from '../../services/user';

@Component({
  selector: 'login',
  providers: [UserService],
  templateUrl: './components/login/login.html',
  styleUrls: ['./components/login/login.css']
})

export class LoginComponent {
  constructor(private _userService: UserService) {}

  public loginData: LoginData = {
    email: '',
    password: ''
  };

  onSubmit() {
    this._userService
      .login(this.loginData).subscribe(
        data => console.log(data), // Log the token to the angular2-jwt library
        err => {
          // Show toast message
          this.loginData.password = '';
        },
        () => console.log('Redirect to homepage') // Angular router redirect to homepage (logged in)
    );
  }
}

interface LoginData {
  email: string;
  password: string;
}
