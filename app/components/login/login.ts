import {Component} from 'angular2/core';
import {UserService} from '../../services/user';

@Component({
  selector: 'login',
  providers: [UserService],
  templateUrl: './components/login/login.html'
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
        resp => console.log(resp)
    );
  }
}

interface LoginData {
  email: string;
  password: string;
}
