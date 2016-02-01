import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor(private http:Http) {
  }

  private endpoint:string = 'http://128.199.32.43:1337/user';

  login(user) {
    return this.http.post(this.endpoint + '/login', JSON.stringify(user))
      .map((resp:Response) => resp.json());
  }

  signup(user) {
    return this.http.post(this.endpoint + '/signup', JSON.stringify(user))
      .map((resp:Response) => resp.json());
  }
}
