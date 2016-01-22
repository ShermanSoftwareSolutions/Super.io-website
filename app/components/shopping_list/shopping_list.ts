import {Component} from 'angular2/core';
import {ShoppingListService} from '../../services/shopping_list';

@Component({
  selector: 'shopping_list',
  providers: [ShoppingListService],
  templateUrl: './components/shopping_list/shopping_list.html',
  styleUrls: ['./components/shopping_list/shopping_list.css']
})

export class ShoppingListComponent {
  constructor(private _shoppingListService: ShoppingListService) {
    //todo get token and add to index request
    this.ShoppingListIndex = this._shoppingListService.index();
  }

  public ShoppingListIndex;

}

interface ShoppingList {
  userId: number;
  title: string;
  lines: Array<ShoppingListLine>;
}

interface ShoppingListLine {
  shoppinglistId: number;
  productId: number;
  amount: number;
}
