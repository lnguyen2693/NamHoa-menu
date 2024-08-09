import { IdentifiableOrders } from "@interfaces/type";
import { State, useLoadingValue } from "./utils/useLoadingValue";
import React from "react";
import { getOrders } from "@services/client/order";
import { collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import db from "../../firebase";
import { orderConverter } from "@services/firestore";

interface useOrdersLoaderProps {
  restaurantId: string;
}

export const useOrdersLoader = (props: useOrdersLoaderProps) => {
  const { state, setValue, setError } = useLoadingValue<IdentifiableOrders>();
  const unsubscriber = React.useRef<Unsubscribe | null>(null);

  // fetch orders context
  React.useEffect(() => {
    getOrders(props.restaurantId).then((value) => {
      setValue(value);
    });
  }, [props.restaurantId]);

  React.useEffect(() => {
    if (state.state !== State.SUCCESS) {
      if (unsubscriber.current != null) {
        unsubscriber.current();
      }
      unsubscriber.current = null;
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, `restaurants/${props.restaurantId}/orders`).withConverter(
        orderConverter
      ),
      (snapshot) => {
        let ordersList: IdentifiableOrders = [];
        snapshot.docs.map((order) => {
          ordersList.push({
            id: order.id,
            ...order.data(),
          });
        });

        setValue(ordersList);
      }
    );

    unsubscriber.current = unsubscribe;

    return () => unsubscribe();
  }, [state.state, props.restaurantId]);

  return { orders: state };
};
