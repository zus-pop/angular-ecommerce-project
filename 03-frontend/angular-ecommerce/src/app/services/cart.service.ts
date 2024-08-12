import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(cartItem: CartItem) {
    // check if the cart already has this product
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;
    //find the item in the cart based on item id
    if (this.cartItems.length) {
      existingCartItem = this.cartItems.find((ci: CartItem) => ci.id === cartItem.id)!;
    }
    //check if we found it
    alreadyExistsInCart = existingCartItem !== undefined;

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(cartItem);
    }

    //compute cart total price and total quantity
    this.computeCartTotal();
  }

  computeCartTotal() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    totalPriceValue = this.cartItems.reduce((acc, cur) => acc + (cur.unitPrice * cur.quantity), 0);
    totalQuantityValue = this.cartItems.reduce((acc, cur) => acc + cur.quantity, 0);

    // publish the new values.. all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Content of the cart');
    this.cartItems.forEach(({ name, quantity, unitPrice }) => {
      const subTotalPrice = quantity * unitPrice;
      console.log(`name:${name}, quantity: ${quantity}, unitPrice: ${unitPrice}, subTotalPrice: ${subTotalPrice}`)
    })

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`)
    console.log(`-----------------------------------`)
  }

  decrement(cartItem: CartItem) {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      this.remove(cartItem);
    }
    else {
      this.computeCartTotal();
    }
  }

  remove(cartItem: CartItem) {
    const index = this.cartItems.findIndex((ci: CartItem) => ci.id === cartItem.id);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.computeCartTotal();
    }
  }
}
