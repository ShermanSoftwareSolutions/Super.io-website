import {Component} from 'angular2/core';
import {RouteConfig, RouterLink} from 'angular2/router';
import {HomeComponent} from '../home/home';
import {LoginComponent} from '../login/login';
import {SignupComponent} from '../signup/signup';
import {ShoppingListComponent} from '../shopping_list/shopping_list.component';
import {ShoppingListDetailsComponent} from '../shopping_list/details/details.component';
import {LoggedInRouterOutlet} from '../../directives/loggedin_router_outlet/loggedin_router_outlet.directive';
//import {UserService} from '../../services/user';

@Component({
  selector: 'app',
  //viewProviders: [UserService],
  templateUrl: './components/app/app.html',
  //encapsulation: ViewEncapsulation.None,
  directives: [LoggedInRouterOutlet, RouterLink]
})

@RouteConfig([
  {path: '/', component: HomeComponent, name: 'Home', useAsDefault: true},
  {path: '/login', component: LoginComponent, name: 'Login'},
  {path: '/signup', component: SignupComponent, name: 'Signup'},
  {path: '/shopping_list', component: ShoppingListComponent, name: 'ShoppingList'},
  {path: '/shopping_list/details/:id', component: ShoppingListDetailsComponent, name: 'ShoppingListDetails'},
  {path: '/**', redirectTo:['Home']}
])

export class AppComponent {

}
