import {Component} from 'angular2/core';
import {ShoppingListService, ShoppingList} from '../../../services/shopping_list.service';
import {RouterLink, Router} from 'angular2/router';

@Component({
  selector: 'shopping-list-item',
  directives: [RouterLink],
  templateUrl: './components/shopping_list/item/item.html',
  styleUrls: ['./components/shopping_list/item/item.css'],
  inputs: ['shoppingListItem']
})

export class ShoppingListItemComponent {
  constructor(private _router: Router, private _shoppingListService: ShoppingListService ) {}

  public shoppingListItem: ShoppingList;

  viewDetails(shoppingListItem) {
    this._router.navigate( [ 'ShoppingListDetails', { id: shoppingListItem.id } ] );
  }

  deleteItem(shoppingListItem) {
    this._shoppingListService.delete(shoppingListItem.id);
  }
}
