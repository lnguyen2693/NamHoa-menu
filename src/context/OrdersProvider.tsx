import { IdentifiableOrders } from "@interfaces/type";
import { useOrdersLoader } from "hooks/useOrdersLoader";
import { State } from "hooks/utils/useLoadingValue";
import { useSearchParams } from "next/navigation";
import React from "react";

interface OrdersProviderProps {
  children?: React.ReactNode;
  restaurantId: string;
  admin: boolean;
}

interface OdersContext {
  orders: IdentifiableOrders;
}

export const OrdersContext = React.createContext({} as OdersContext);

const Provider = OrdersContext.Provider;

const OrdersProvider = (props: OrdersProviderProps) => {
  const { restaurantId, admin } = props;
  const searchParams = useSearchParams();
  const { orders } = useOrdersLoader({
    restaurantId,
    table: admin ? undefined : Number(searchParams.get("table")) || undefined,
    active: true,
  });

  if (orders.state == State.SUCCESS) {
    return (
      <Provider value={{ orders: orders.value }}>{props.children}</Provider>
    );
  }
};

export default OrdersProvider;
