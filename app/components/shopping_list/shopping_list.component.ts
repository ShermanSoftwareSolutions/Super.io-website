import {Component, OnChanges, OnInit} from 'angular2/core';
import {ShoppingListItemComponent} from './item/item.component';
import {ShoppingListService, ShoppingList} from '../../services/shopping_list.service';
import {NgFor} from 'angular2/common';

@Component({
  selector: 'shopping-list',
  directives : [ShoppingListItemComponent, NgFor],
  providers: [ShoppingListService],
  templateUrl: './components/shopping_list/shopping_list.html',
  styleUrls: ['./components/shopping_list/shopping_list.css']
})

export class ShoppingListComponent implements OnChanges, OnInit {
  constructor(private _shoppingListService: ShoppingListService) {}

  public shoppingListIndex: Array<ShoppingList>;

  ngOnInit() {
    this.updateShoppingLists();
  }

  ngOnChanges() {
    this.updateShoppingLists();
  }

  removeItem(id:number) {
    this.shoppingListIndex = this.shoppingListIndex.filter((item) => item.id !== id);
  }

  updateShoppingLists() {
    this._shoppingListService.index().subscribe(shoppingList => this.shoppingListIndex = shoppingList);
  }

  newShoppingList() {
    let shoppingList:ShoppingList = {id:null, userId:2, title:'iets', lines:null};
    this._shoppingListService.create(shoppingList).subscribe(this.shoppingListIndex.push(shoppingList));
  }
}
