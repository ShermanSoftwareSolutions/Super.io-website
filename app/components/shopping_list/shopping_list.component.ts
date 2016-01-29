import {Component, OnChanges, OnInit} from 'angular2/core';
import {ShoppingListItemComponent} from './item/item.component';
import {ShoppingListService, ShoppingList} from '../../services/shopping_list.service';
import {NgFor} from 'angular2/common';
import {Router} from 'angular2/router';
import {JwtHelper} from '../angular2-jwt/angular2-jwt';

@Component({
  selector: 'shopping-list',
  directives : [ShoppingListItemComponent, NgFor],
  providers: [ShoppingListService],
  templateUrl: './components/shopping_list/shopping_list.html',
  styleUrls: ['./components/shopping_list/shopping_list.css']
})

export class ShoppingListComponent implements OnChanges, OnInit {
  constructor(private _shoppingListService:ShoppingListService, private _router:Router) {}

  public shoppingListIndex: Array<ShoppingList>;

  private jwtHelper:JwtHelper = new JwtHelper();

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
    let token = localStorage.getItem('jwt');
    let userId:number = this.jwtHelper.decodeToken(token).sub.id;
    let shoppingList:ShoppingList = {
      id: null,
      userId: userId,
      title: 'Titel',
      lines: null,
      createdAdd: null,
      updatedAdd: null
    };

    this._shoppingListService.create(shoppingList).subscribe(this.shoppingListIndex.push(shoppingList));
    this._router.navigate( [ 'ShoppingListDetails', { id: shoppingList.id } ] );
  }
}
