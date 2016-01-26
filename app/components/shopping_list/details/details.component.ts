import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({
  selector: 'shopping-list-details',
  templateUrl: './components/shopping_list/details/details.html',
  styleUrls: ['./components/shopping_list/details/details.css']
})

export class ShoppingListDetailsComponent implements OnInit {
  constructor(private _routeParams: RouteParams) {}

  public id: string;

  ngOnInit() {
    this.id = this._routeParams.get('id');
  }
}
