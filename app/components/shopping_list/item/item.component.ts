import {Component, EventEmitter, Output} from 'angular2/core';
import {ShoppingListService, ShoppingList} from '../../../services/shopping_list.service';
import {RouterLink, Router} from 'angular2/router';

@Component({
  selector: 'shopping-list-item',
  directives: [RouterLink],
  templateUrl: './components/shopping_list/item/item.html',
  inputs: ['shoppingListItem']
})

export class ShoppingListItemComponent {
  @Output('removed') removed = new EventEmitter();

  constructor(private _router:Router, private _shoppingListService:ShoppingListService) {
  }

  public shoppingListItem:ShoppingList;

  viewDetails(shoppingListItem) {
    console.log(JSON.stringify(shoppingListItem.id));
    this._router.navigate(['ShoppingListDetails', {id: shoppingListItem.id}]);
  }

  deleteItem(shoppingListItem) {
    this._shoppingListService.deleteItem(shoppingListItem.id).subscribe();
    this.removed.emit(shoppingListItem.id);
  }
}
