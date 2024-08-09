import { IdentifiableOrder } from "@interfaces/type";
import { State, useLoadingValue } from "./utils/useLoadingValue";
import { Order } from "@interfaces/db";
import React from "react";

interface useCartLoaderProps {
  cart: IdentifiableOrder;
}

export const useCartLoader = (props: useCartLoaderProps) => {
  console.log("cartLoader");
  const { state, setValue, setError } = useLoadingValue<IdentifiableOrder>();

  React.useEffect(() => {
    setValue(props.cart);
    console.log("in cart loader, first load: ", state);
  }, []);

  React.useEffect(() => {
    console.log("cartLoader setValue");
    if (state.state === State.SUCCESS) {
      setValue(props.cart);
      console.log("in cart loader: ", state);
    }
  }, [props.cart, state.state]);

  return { cart: state };
};
