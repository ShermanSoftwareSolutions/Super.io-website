import {Injectable} from 'angular2/core';
import {Response} from 'angular2/http';
import {AuthHttp} from '../components/angular2-jwt/angular2-jwt';
import 'rxjs/add/operator/map';

/**
 * classe that provides services for retrieving products from storage
 */
@Injectable()
export class ProductService {
  constructor(private _authHttp:AuthHttp) {
  }

  private endpoint:string = 'http://128.199.32.43:1337/product';

  /**
   *
   * @returns {Observable<R>}
   */
  index() {
    return this._authHttp.get(this.endpoint)
      .map((resp:Response) => resp.json());
  }

  /**
   *
   * @param id
   * @returns {Observable<R>}
   */
  details(id:number) {
    return this._authHttp.get(this.endpoint + '/details/' + id)
      .map((resp:Response) => resp.json());
  }
}

export interface Product {
  title:string;
  price:number;
  image:string;
  salesTax:string;
  id:number;
  createdAdd:string;
  updatedAdd:string;
}
