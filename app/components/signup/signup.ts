import {Component} from 'angular2/core';
import {UserService} from '../../services/user';

@Component({
  selector: 'signup',
  providers: [UserService],
  templateUrl: './components/signup/signup.html',
  styleUrls: ['./components/signup/signup.css']
})

export class SignupComponent {
  constructor(private _userService: UserService) {}

  public signupData: SignupData = {
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  onSubmit() {
    this._userService
      .signup(this.signupData).subscribe(
        data => console.log(data), // Log the token to the angular2-jwt library
        err => {
          // Show toast message
          this.signupData.password = '';
          this.signupData.confirmPassword = '';
        },
        () => console.log('Redirect to homepage') // Angular router redirect to homepage (logged in)
    );
  }
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
