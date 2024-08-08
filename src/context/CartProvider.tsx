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
}

export const CartContext = React.createContext({} as CartContext);

const Provider = CartContext.Provider;

const CartProvider = (props: CartProviderProps) => {
  const { cart } = useCartLoader({ cart: props.cart });

  if (cart.state !== State.SUCCESS) {
    return <div>Loading...</div>;
  }

  console.log("in CartProvider:", cart);
  if (cart.state === State.SUCCESS) {
    return <Provider value={{ cart: cart.value }}>{props.children}</Provider>;
  }
  // Responsibilities:
  //  1. What's currently in the cart?
  //  2. What happens when user / employee add or remove items from cart
  //  3. What happens when user / employee click submit
  // return <Provider value={{ cart: {} }}>{props.children}</Provider>;
};

export default CartProvider;
