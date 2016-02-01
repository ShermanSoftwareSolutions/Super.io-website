import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';

@Directive({
  selector: 'loggedin-router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: any;
  private parentRouter: Router;

  constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader,
              _parentRouter: Router, @Attribute('name') nameAttr: string) {
    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    this.publicRoutes = {
      'login': true,
      'signup': true
    };
  }

  activate(instruction: ComponentInstruction) {
    if (!this.publicRoutes[instruction.urlPath] && !localStorage.getItem('jwt')) {
      this.parentRouter.navigate(['Login']);
    }
    return super.activate(instruction);
  }
}
