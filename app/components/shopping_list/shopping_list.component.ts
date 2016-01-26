import {Component, OnChanges, OnInit} from 'angular2/core';
import {ShoppingListItemComponent} from './item/item.component';
import {ShoppingListService, ShoppingList} from '../../services/shopping_list.service';

@Component({
  selector: 'shopping-list',
  directives : [ShoppingListItemComponent],
  providers: [ShoppingListService],
  templateUrl: './components/shopping_list/shopping_list.html',
  styleUrls: ['./components/shopping_list/shopping_list.css']
})

export class ShoppingListComponent implements OnChanges, OnInit {
  constructor(private _shoppingListService: ShoppingListService) {}

  public shoppingListIndex: Array<ShoppingList>;

  ngOnInit() {
    this._shoppingListService.index().subscribe(shoppingList => this.shoppingListIndex = shoppingList);
  }

  ngOnChanges() {
    this._shoppingListService.index().subscribe(shoppingList => this.shoppingListIndex = shoppingList);
  }
}
