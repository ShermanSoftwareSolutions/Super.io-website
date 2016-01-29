import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {ShoppingListService, ShoppingList} from '../../../services/shopping_list.service';

@Component({
  selector: 'shopping-list-details',
  templateUrl: './components/shopping_list/details/details.html',
  styleUrls: ['./components/shopping_list/details/details.css']
})

export class ShoppingListDetailsComponent implements OnInit {
  constructor(private _routeParams:RouteParams, private _shoppingListService:ShoppingListService) {}

  public id:string;

  public shoppinglist:ShoppingList;

  ngOnInit() {
    this.id = this._routeParams.get('id');
    this._shoppingListService.details(Number.parseInt(this.id))
      .subscribe((shoppingList) => this.shoppinglist = shoppingList);
  }

}
