import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
import {JwtHelper} from '../../components/angular2-jwt/angular2-jwt';

@Directive({
  selector: 'loggedin-router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes:any;
  private parentRouter:Router;

  constructor(_elementRef:ElementRef, _loader:DynamicComponentLoader,
              _parentRouter:Router, @Attribute('name') nameAttr:string) {
    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    this.publicRoutes = {
      'login': true,
      'signup': true
    };
  }

  activate(instruction:ComponentInstruction) {
    var token:string = localStorage.getItem('jwt');
    var jwtHelper:JwtHelper = new JwtHelper();

    if (!this.publicRoutes[instruction.urlPath] && !token || (!this.publicRoutes[instruction.urlPath] && jwtHelper.isTokenExpired(token))) {
      this.parentRouter.navigate(['Login']);
    }
    return super.activate(instruction);
  }
}
