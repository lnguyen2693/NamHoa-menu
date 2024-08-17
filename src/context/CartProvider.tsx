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
  addOne: (item: OrderItem) => void;
  editItem: (oldItem: OrderItem, newItem: OrderItem) => void;
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

  const editItem = (oldItem: OrderItem, newItem: OrderItem) => {
    // sort options of newItem
    const newOptions = Object.fromEntries(
      Object.keys(newItem.options)
        .sort()
        .map((key) => {
          const sortedValue = Array.isArray(newItem.options[key])
            ? newItem.options[key].sort()
            : newItem.options[key];
          return [key, sortedValue];
        })
    );
    newItem.options = newOptions;

    // filter out oldItem
    currentCart.orderItems = currentCart.orderItems.filter(
      (i) =>
        i.itemID !== oldItem.itemID ||
        JSON.stringify(i.options) !== JSON.stringify(oldItem.options)
    );

    // add newItem
    currentCart.orderItems.push(newItem);

    // set cart
    setCurrentCart(currentCart);
  };

  const addOne = (item: OrderItem) => {
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
    // has item --> increase amount by 1
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
          i.amount += 1;
        }
      });
    }
    console.log("add 1 item: ", currentCart);
    setCurrentCart(currentCart);
  };

  // chua test, xem lai
  const removeItem = (item: OrderItem) => {
    setCurrentCart((currentCart) => {
      const orderItems = currentCart.orderItems.filter(
        (i) =>
          i.itemID !== item.itemID ||
          JSON.stringify(i.options) !== JSON.stringify(item.options)
      );
      console.log("remove item, filter: ", currentCart.orderItems);

      if (item.amount - 1 > 0) {
        console.log("amount - 1:", item.amount - 1);
        orderItems.push({ ...item, amount: item.amount - 1 });
      }

      console.log("remove item: ", currentCart.orderItems);
      return { ...currentCart, orderItems: orderItems };
    });
  };

  console.log("With new state", currentCart);

  return (
    <Provider
      value={{
        cart: currentCart,
        addItem: addItem,
        removeItem: removeItem,
        addOne: addOne,
        editItem: editItem,
      }}
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
