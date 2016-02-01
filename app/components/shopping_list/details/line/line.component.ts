import {Component, EventEmitter, Output} from 'angular2/core';
import {ShoppingListService, ShoppingListLine} from '../../../../services/shopping_list.service';

@Component({
  selector: 'shopping-list-product',
  templateUrl: './components/shopping_list/details/line/line.html',
  inputs: ['shoppingListLine'],
  outputs: ['removed']
})
export class ShoppingListLineComponent {
  @Output('removed') removed = new EventEmitter();

  constructor(private _shoppingListService:ShoppingListService) {
  }

  public shoppingListLine:ShoppingListLine;

  reduceAmount() {
    this.changeAmount(-1);
  }

  increaseAmount() {
    this.changeAmount(1);
  }

  changeAmount(change:number) {
    this._shoppingListService.changeAmount(this.shoppingListLine.shoppinglistId, this.shoppingListLine.productId,
        this.shoppingListLine.amount + change)
      .subscribe((resp) => this.shoppingListLine.amount += change);
  }

  removeItem() {
    this._shoppingListService.changeAmount(this.shoppingListLine.shoppinglistId, this.shoppingListLine.productId, 0)
      .subscribe(() => this.removed.emit(this.shoppingListLine.id));
  }
}
