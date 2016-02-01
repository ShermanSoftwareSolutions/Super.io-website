import {Injectable} from 'angular2/core';
import {Response} from 'angular2/http';
import {AuthHttp} from '../components/angular2-jwt/angular2-jwt';
import {Product} from './product.service';
import 'rxjs/add/operator/map';

/**
 * A service that encapsulades the retrieval and storage of shoppinList data. All methods require a user to be logged
 * in.
 */
@Injectable()
export class ShoppingListService {
  constructor(private _authHttp:AuthHttp) {}

  private endpoint:string = 'http://localhost:1337/shoppinglist';

  /**
   * method for requesting a listing of all shoppinglsits of the current user
   *
   * @returns {Observable<R> containing an array of ShoppingLists}
   */
  index() {
    return this._authHttp.get(this.endpoint)
      .map((resp:Response) => resp.json());
  }

  /**
   * adds a new shoppinglist line to the specified shopping list. containing the given product for amount times.
   *
   * @param shoppingListId the id of the shopping list you want to add a line to
   * @param productId the id of the product you want to add
   * @param amount how many products of the specified type need to be added
   * @returns {Observable<R> containing the added shoppinglist line}
   */
  addLine(shoppingListId:number, productId:number, amount:number) {
    console.log(JSON.stringify({amount:amount.toString()}));
    return this._authHttp.put(this.endpoint + '/' + shoppingListId + '/' + productId, JSON.stringify({amount:amount.toString()}) )
      .map((resp:Response) => resp.json());
  }

  /**
   * changes the amount of product on the specified shopping list, for the given product to the given amount.
   *
   * @param shoppingListId the id of the shopping list you want to edit
   * @param productId the id of the product you want to edit
   * @param amount how many products of the specified type there need to be after edditing
   * @returns {Observable<R> containing the modified shoppinglist line}
   */
  changeAmount(shoppingListId:number, productId:number, amount:number) {
    return this._authHttp.put(this.endpoint + '/amount/' + shoppingListId + '/' + productId, JSON.stringify({amount:amount.toString()}))
      .map((resp:Response) => resp.json());
  }

  /**
   * saves the given shoppinglist to the db as a new shoppinglist
   *
   * @param shoppingList the shoppinglist to be added to the db
   * @returns {Observable<R> containing the shoppinglist that was added}
   */
  create(shoppingList:ShoppingList) {
    return this._authHttp.post(this.endpoint, JSON.stringify(shoppingList))
      .map((resp:Response) => resp.json());
  }

  /**
   * request a detaild ShoppingList that contains relevant product information
   *
   * @param id the id of the shopping list you want to reqquest
   * @returns {Observable<R> the shoppinglist you requested}
   */
  details(id:number) {
    return this._authHttp.get(this.endpoint + '/' + id)
      .map((resp:Response) => resp.json());
  }

  /**
   * Delete the given shoppinglist
   *
   * @param id the id of the shoppingList to delete
   */
  deleteItem(id:number) {
    return this._authHttp.delete(this.endpoint + '/' + id)
      .map((resp:Response) => resp.json());
  }
}

export interface ShoppingList {
  id:number;
  userId:number;
  title:string;
  lines:Array<ShoppingListLine>;
  createdAdd:string;
  updatedAdd:string;
}

export interface ShoppingListLine {
  id:number;
  shoppinglistId:number;
  productId:number;
  amount:number;
  product:Product;
  createdAdd:string;
  updatedAdd:string;
}

