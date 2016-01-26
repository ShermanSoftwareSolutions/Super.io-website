import {Injectable} from 'angular2/core';
import {Response} from 'angular2/http';
import {AuthHttp} from '../components/angular2-jwt/angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingListService {
  constructor(private _authHttp:AuthHttp) {}

  private endpoint:string = 'http://localhost:1337/shoppinglist';

  index() {
    return this._authHttp.get(this.endpoint)
      .map((resp:Response) => resp.json());
  }

  addLine(shoppingListId:number, productId:number, amount:number) {
    return this._authHttp.put(this.endpoint + "/" + shoppingListId + "/" + productId, JSON.stringify(amount))
      .map((resp:Response) => resp.json())
  }

  changeAmount(shoppingListId:number, productId:number, amount:number) {
    return this._authHttp.put(this.endpoint + "/amount/" + shoppingListId + "/" + productId, JSON.stringify(amount))
      .map((resp:Response) => resp.json())
  }

  create(shoppingList:ShoppingList) {
    return this._authHttp.post(this.endpoint, JSON.stringify(shoppingList))
      .map((resp:Response) => resp.json());
  }

  details(id:number) {
    return this._authHttp.get(this.endpoint + "/" + id)
      .map((resp:Response) => resp.json());
  }

  delete(id:number):void {
    this._authHttp.delete(this.endpoint + "/" + id)
      .map((resp:Response) => resp.json())
  }
}

export interface ShoppingList {
  id: number;
  userId: number;
  title: string;
  lines: Array<ShoppingListLine>;
}

export interface ShoppingListLine {
  shoppinglistId: number;
  productId: number;
  amount: number;
}
