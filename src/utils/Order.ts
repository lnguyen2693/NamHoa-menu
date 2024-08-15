import { CartContext } from "@context/CartProvider";
import { OrderItem } from "@interfaces/db";
import { IdentifiableMenuItem } from "@interfaces/type";
// import React from "react";

export const addItemToCart = (
  cartContext: any,
  menuItem: IdentifiableMenuItem,
  amount: number,
  options: Record<string, string[]>
) => {
  // const cartContext = React.useContext(CartContext);
  const newOrderItem = {
    itemID: menuItem.id,
    name: menuItem.name,
    price: menuItem.price,
    options: options,
    amount: amount,
  } as OrderItem;

  cartContext.addItem(newOrderItem);
  console.log('cart: ', cartContext.cart);
};
