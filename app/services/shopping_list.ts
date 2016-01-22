import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingListService {
  constructor(private http:Http) {}

  private endpoint:string = 'http://localhost:1337/shoppinglist';

  index() {
    return this.http.get(this.endpoint).map((resp:Response) => resp.json())
  }
}
