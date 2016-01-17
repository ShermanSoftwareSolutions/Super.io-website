import {Component} from 'angular2/core';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';

import {HomeComponent} from '../home/home';
import {LoginComponent} from '../login/login';
import {SignupComponent} from '../signup/signup';
//import {UserService} from '../../services/user';

@Component({
  selector: 'app',
  //viewProviders: [UserService],
  templateUrl: './components/app/app.html',
  //encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {path: '/', component: HomeComponent, name: 'Home'},
  {path: '/login', component: LoginComponent, name: 'Login'},
  {path: '/signup', component: SignupComponent, name: 'Signup'},
])

export class AppComponent {

}
