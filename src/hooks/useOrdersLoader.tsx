import { IdentifiableOrders } from "@interfaces/type";
import { State, useLoadingValue } from "./utils/useLoadingValue";
import React from "react";
import { GetOrders, getOrders, getOrdersQuery } from "@services/client/order";
import { onSnapshot, Unsubscribe } from "firebase/firestore";

interface UseOrdersLoaderProps extends GetOrders {}

export const useOrdersLoader = (props: UseOrdersLoaderProps) => {
  const { restaurantId, table, active } = props;
  const { state, setValue, setError } = useLoadingValue<IdentifiableOrders>();
  const unsubscriber = React.useRef<Unsubscribe | null>(null);

  // fetch orders context
  React.useEffect(() => {
    getOrders({
      restaurantId: restaurantId,
      table: table,
      active: active,
    }).then(setValue);
  }, [restaurantId, table, active, setValue]);

  React.useEffect(() => {
    if (state.state !== State.SUCCESS) {
      if (unsubscriber.current != null) {
        unsubscriber.current();
      }
      unsubscriber.current = null;
      return;
    }

    const unsubscribe = onSnapshot(
      getOrdersQuery({
        restaurantId: restaurantId,
        table: table,
        active: active,
      }),
      (snapshot) =>
        setValue(
          snapshot.docs.map((order) => ({ id: order.id, ...order.data() }))
        )
    );

    unsubscriber.current = unsubscribe;

    return () => unsubscribe();
  }, [state.state, restaurantId, table, active, setValue]);

  return { orders: state };
};
