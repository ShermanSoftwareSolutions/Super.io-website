import {Injectable} from 'angular2/core';
import {Response} from 'angular2/http';
import {AuthHttp} from '../components/angular2-jwt/angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingListService {
  constructor(private authHttp:AuthHttp) {}

  private endpoint:string = 'http://localhost:1337/shoppinglist';

  index() {
    return this.authHttp.get(this.endpoint).map((resp:Response) => resp.json());
  }
}
