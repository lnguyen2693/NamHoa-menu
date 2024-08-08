import { IdentifiableOrders } from "@interfaces/type";
import { useOrdersLoader } from "hooks/useOrdersLoader";
import { State } from "hooks/utils/useLoadingValue";
import React from "react";

interface ordersProviderProps {
  children?: React.ReactNode;
  restaurantId: string;
}

interface OdersContext {
  orders: IdentifiableOrders;
}

export const OrdersContext = React.createContext({} as OdersContext);

const Provider = OrdersContext.Provider;

const OrdersProvider = (props: ordersProviderProps) => {
  const { restaurantId } = props;
  const { orders } = useOrdersLoader({ restaurantId: restaurantId });

  if (orders.state == State.SUCCESS) {
    return (
      <Provider value={{ orders: orders.value }}>{props.children}</Provider>
    );
  }
};

export default OrdersProvider;
