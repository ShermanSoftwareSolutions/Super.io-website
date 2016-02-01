import {Component} from 'angular2/core';
import {UserService} from '../../services/user';
import {RouterLink, Router} from 'angular2/router';

@Component({
  selector: 'signup',
  directives: [RouterLink],
  providers: [UserService],
  templateUrl: './components/signup/signup.html'
})

export class SignupComponent {
  constructor(private _userService:UserService, private _router:Router) {
  }

  public signupData:SignupData = {
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  public error:string = undefined;

  onSubmit() {
    this._userService
      .signup(this.signupData).subscribe(
      data => {
        this.error = undefined;
        localStorage.setItem('jwt', data.token);
      },
      err => {
        // Show error message
        this.error = (err._body).replace(/['"]+/g, '');

        this.signupData.password = '';
        this.signupData.confirmPassword = '';
      },
      () => {
        this._router.navigate(['ShoppingList']); // Angular router redirect to homepage (logged in)
      })
  }
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
