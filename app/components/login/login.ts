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
  constructor(private _userService:UserService, private _router:Router) {
  }

  public loginData:LoginData = {
    email: '',
    password: ''
  };

  public error:string = undefined;

  onSubmit() {
    this._userService
      .login(this.loginData).subscribe(
      data => {
        this.error = undefined;
        localStorage.setItem('jwt', data.token);
      },
      err => {
        // Show error message
        this.error = (err._body).replace(/['"]+/g, '');

        this.loginData.password = '';
      },
      () => {
        this._router.navigate(['ShoppingList']); // Angular router redirect to homepage (logged in)
      }
    );
  }
}

interface LoginData {
  email: string;
  password: string;
}
