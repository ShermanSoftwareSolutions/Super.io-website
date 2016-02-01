import {Component, OnChanges, OnInit} from 'angular2/core';
import {ShoppingListItemComponent} from './item/item.component';
import {ShoppingListService, ShoppingList} from '../../services/shopping_list.service';
import {NgFor} from 'angular2/common';
import {Router} from 'angular2/router';

@Component({
  selector: 'shopping-list',
  directives: [ShoppingListItemComponent, NgFor],
  providers: [ShoppingListService],
  templateUrl: './components/shopping_list/shopping_list.html'
})

export class ShoppingListComponent implements OnChanges, OnInit {
  constructor(private _shoppingListService:ShoppingListService, private _router:Router) {
  }

  public shoppingListIndex:Array<ShoppingList>;
  public listName:string;

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
    let shoppingList:ShoppingList = <ShoppingList>{
      title: this.listName
    };

    this._shoppingListService.create(shoppingList).subscribe(
      result => this._router.navigate(['ShoppingListDetails', {id: result.id}])
    );
  }
}
