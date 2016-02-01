import {Component} from 'angular2/core';
import {RouteConfig, RouterLink} from 'angular2/router';
import {LoginComponent} from '../login/login';
import {SignupComponent} from '../signup/signup';
import {ShoppingListComponent} from '../shopping_list/shopping_list.component';
import {ShoppingListDetailsComponent} from '../shopping_list/details/details.component';
import {LoggedInRouterOutlet} from '../../directives/loggedin_router_outlet/loggedin_router_outlet.directive';
import {Router} from 'angular2/router';

@Component({
  selector: 'app',
  templateUrl: './components/app/app.html',
  directives: [LoggedInRouterOutlet, RouterLink]
})

@RouteConfig([
  {path: '/', component: ShoppingListComponent, name: 'ShoppingList', useAsDefault: true},
  {path: '/details/:id', component: ShoppingListDetailsComponent, name: 'ShoppingListDetails'},
  {path: '/login', component: LoginComponent, name: 'Login'},
  {path: '/signup', component: SignupComponent, name: 'Signup'},
  {path: '/**', redirectTo: ['ShoppingList']}
])

export class AppComponent {
  constructor(private _router:Router) {
  }

  logout() {
    // Remove the JWT
    localStorage.removeItem('jwt');

    // Redirect to login page
    this._router.navigate(['Login']);
  }
}
