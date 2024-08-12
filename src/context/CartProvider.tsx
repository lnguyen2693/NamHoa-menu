import { OrderItem } from "@interfaces/db";
import { IdentifiableOrder } from "@interfaces/type";
import { useCartLoader } from "hooks/useCartLoader";
import { State } from "hooks/utils/useLoadingValue";
import React from "react";

interface CartProviderProps {
  children?: React.ReactNode;
  // table: number;
  cart: IdentifiableOrder;
}

interface CartContext {
  cart: IdentifiableOrder;
  addItem: (item: OrderItem) => void;
  removeItem: (item: OrderItem) => void;
}

export const CartContext = React.createContext({} as CartContext);

const Provider = CartContext.Provider;

const CartProvider = (props: CartProviderProps) => {
  const { cart } = props;
  const [currentCart, setCurrentCart] = React.useState(cart);

  const addItem = (item: OrderItem) => {
    // sort all keys and options
    const newOptions = Object.fromEntries(
      Object.keys(item.options)
        .sort()
        .map((key) => {
          const sortedValue = Array.isArray(item.options[key])
            ? item.options[key].sort()
            : item.options[key];
          return [key, sortedValue];
        })
    );
    item.options = newOptions;

    // filter cart.options to see if there is any item in cart
    // has item --> increase amount
    // does not have item --> push new item
    if (
      currentCart.orderItems.filter(
        (i) =>
          i.itemID === item.itemID &&
          JSON.stringify(i.options) === JSON.stringify(item.options)
      ).length > 0
    ) {
      currentCart.orderItems.forEach((i) => {
        if (
          i.itemID === item.itemID &&
          JSON.stringify(i.options) === JSON.stringify(item.options)
        ) {
          i.amount += item.amount;
        }
      });
    } else {
      currentCart.orderItems.push(item);
    }
    setCurrentCart(currentCart);
  };

  // chua test, xem lai
  const removeItem = (item: OrderItem) => {
    currentCart.orderItems = currentCart.orderItems.filter(
      (i) =>
        i.itemID !== item.itemID ||
        JSON.stringify(i.options) !== JSON.stringify(item.options)
    );
    if (item.amount - 1 > 0) {
      currentCart.orderItems.push({ ...item, amount: item.amount - 1 });
    }
    setCurrentCart(currentCart);
  };

  return (
    <Provider
      value={{ cart: props.cart, addItem: addItem, removeItem: removeItem }}
    >
      {props.children}
    </Provider>
  );
  // }
  // Responsibilities:
  //  1. What's currently in the cart?
  //  2. What happens when user / employee add or remove items from cart
  //  3. What happens when user / employee click submit
  // return <Provider value={{ cart: {} }}>{props.children}</Provider>;
};

export default CartProvider;
