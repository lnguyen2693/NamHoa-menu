import { OrderItem } from "@interfaces/db";
import { IdentifiableOrder } from "@interfaces/type";
import { useCartLoader } from "hooks/useCartLoader";
import { State } from "hooks/utils/useLoadingValue";
import React from "react";

interface CartProviderProps {
  children?: React.ReactNode;
  cart: IdentifiableOrder;
}

interface CartContext {
  cart: IdentifiableOrder;
  addItem: (item: OrderItem) => void;
  removeItem: (item: OrderItem) => void;
  addOne: (item: OrderItem) => void;
  editItem: (oldItem: OrderItem, newItem: OrderItem) => void;
  resetCart: () => void;
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
    const orderItems = currentCart.orderItems;
    if (
      orderItems.filter(
        (i) =>
          i.itemID === item.itemID &&
          JSON.stringify(i.options) === JSON.stringify(item.options)
      ).length > 0
    ) {
      orderItems.forEach((i) => {
        if (
          i.itemID === item.itemID &&
          JSON.stringify(i.options) === JSON.stringify(item.options)
        ) {
          i.amount += item.amount;
        }
      });
    } else {
      orderItems.push(item);
    }
    setCurrentCart({ ...currentCart, orderItems: orderItems });
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
    const orderItems = currentCart.orderItems.filter(
      (i) =>
        i.itemID !== oldItem.itemID ||
        JSON.stringify(i.options) !== JSON.stringify(oldItem.options)
    );

    // add newItem
    orderItems.push(newItem);

    // set cart
    setCurrentCart({ ...currentCart, orderItems: orderItems });
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
    const orderItems = currentCart.orderItems;
    if (
      orderItems.filter(
        (i) =>
          i.itemID === item.itemID &&
          JSON.stringify(i.options) === JSON.stringify(item.options)
      ).length > 0
    ) {
      orderItems.forEach((i) => {
        if (
          i.itemID === item.itemID &&
          JSON.stringify(i.options) === JSON.stringify(item.options)
        ) {
          i.amount += 1;
        }
      });
    }

    setCurrentCart({ ...currentCart, orderItems: orderItems });
  };

  const removeItem = (item: OrderItem) => {
    setCurrentCart((currentCart) => {
      const orderItems = currentCart.orderItems.filter(
        (i) =>
          i.itemID !== item.itemID ||
          JSON.stringify(i.options) !== JSON.stringify(item.options)
      );

      if (item.amount - 1 > 0) {
        orderItems.push({ ...item, amount: item.amount - 1 });
      }

      return { ...currentCart, orderItems: orderItems };
    });
  };

  const resetCart = () => {
    setCurrentCart({ ...currentCart, orderItems: [] });
  };

  return (
    <Provider
      value={{
        cart: currentCart,
        addItem: addItem,
        removeItem: removeItem,
        addOne: addOne,
        editItem: editItem,
        resetCart: resetCart,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default CartProvider;
