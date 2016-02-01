import {Component} from 'angular2/core';
import {UserService} from '../../services/user';
import {Router, RouterLink} from 'angular2/router';

@Component({
  selector: 'login',
  directives: [RouterLink],
  providers: [UserService],
  templateUrl: './components/login/login.html'
})

export class LoginComponent {
  constructor(private _userService: UserService, private _router: Router) {}

  public loginData: LoginData = {
    email: '',
    password: ''
  };

  onSubmit() {
    this._userService
      .login(this.loginData).subscribe(
        data => {
          localStorage.setItem('jwt', data.token);
        },
        err => {
          // Show toast message
          this.loginData.password = '';
        },
        () => {
          this._router.navigate(['Home']); // Angular router redirect to homepage (logged in)
        }
    );
  }
}

interface LoginData {
  email: string;
  password: string;
}
