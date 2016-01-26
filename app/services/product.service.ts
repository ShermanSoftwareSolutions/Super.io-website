import {Injectable} from 'angular2/core';
import {Response} from 'angular2/http';
import {AuthHttp} from '../components/angular2-jwt/angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  constructor(private _authHttp:AuthHttp) {}

  private endpoint:String = 'http://localhost:1337/product';

  index() {
    this._authHttp.get(this.endpoint)
      .map((resp:Response) => resp.json());
  }

  details(id:number) {
    this._authHttp.get(this.endpoint + '/details/' + id)
      .map((resp:Response) => resp.json());
  }
}
