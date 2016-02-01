import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {FORM_DIRECTIVES} from 'angular2/common';
import {ShoppingListService, ShoppingList, ShoppingListLine} from '../../../services/shopping_list.service';
import {ProductService, Product} from '../../../services/product.service';
import {ShoppingListLineComponent} from './line/line.component';

@Component({
  providers: [ShoppingListService, ProductService],
  selector: 'shopping-list-details',
  templateUrl: './components/shopping_list/details/details.html',
  directives: [FORM_DIRECTIVES, ShoppingListLineComponent],
  inputs: ['id']
})

export class ShoppingListDetailsComponent implements OnInit {
  constructor(private _routeParams:RouteParams, private _shoppingListService:ShoppingListService,
              private _productService:ProductService) { }

  public id:string;
  public shoppingList:ShoppingList = <ShoppingList>{ title: 'placeholder', lines: [] };
  public lines:Array<ShoppingListLine> = [];
  public products:Array<Product> = [];
  public selectedProduct:Product = null;

  total():number {
    if (this.shoppingList.lines.length !== 0) {
      return this.shoppingList.lines
        .map(line => line.amount * line.product.price)
        .reduce((rTotal, lTotal) => rTotal + lTotal);
    }else {
      return 0;
    }
  }

  stringify(object:any):string {
    return JSON.stringify(object);
  }

  updateSelectedValue(event:string):void {
    this.selectedProduct = JSON.parse(event);
  }

  ngOnInit() {
    this.id = this._routeParams.get('id');

    this._shoppingListService.details(Number.parseInt(this.id))
      .subscribe((shoppingList) => {
        this.shoppingList = shoppingList;
        this.lines = shoppingList.lines;
      });
    this._productService.index()
      .subscribe((products) => {
        this.products = products;
      });
  }

  removeLine(id:number) {
    this.shoppingList.lines = this.shoppingList.lines.filter(line => line.id !== id);
    this.lines = this.shoppingList.lines;
  }

  newShoppingListLine() {
    if (this.selectedProduct !== null) {
      let product = this.selectedProduct;
      this._shoppingListService.addLine(Number.parseInt(this.id), this.selectedProduct.id, 1)
        .subscribe(line => {
          line.product = product;
          console.log('line ::: ' + JSON.stringify(line));
          if(this.shoppingList.lines.find(innerLine => innerLine.id === line.id)) {
            this.shoppingList.lines.find(innerLine => innerLine.id === line.id).amount += 1;
          } else {
            this.shoppingList.lines.push(line);
          }

          this.lines = this.shoppingList.lines;
        });

    } else {
      //todo show toast message
    }
  }
}
