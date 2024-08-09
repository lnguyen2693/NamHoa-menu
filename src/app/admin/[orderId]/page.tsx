"use client";
import CartProvider, { CartContext } from "@context/CartProvider";
import OrdersProvider, { OrdersContext } from "@context/OrdersProvider";
import { IdentifiableOrder } from "@interfaces/type";
import { getOrder } from "@services/client/order";
import React from "react";

interface Props {
  params: {
    orderId: string;
  };
}

const Page = (props: Props) => {
  const ordersListContext = React.useContext(OrdersContext);
  console.log(ordersListContext);
  const cartContext = React.useContext(CartContext);

  const [order, setOrder] = React.useState<IdentifiableOrder | undefined>(
    ordersListContext.orders.find((order) => order.id === props.params.orderId)!
  );

  // console.log("ordersListContext: ", ordersListContext.orders);

  React.useEffect(() => {
    setOrder(
      ordersListContext.orders.find(
        (order) => order.id === props.params.orderId
      )
    );
    console.log("cart in page:", cartContext.cart);
  }, [ordersListContext.orders, props.params.orderId]);

  // const order = ordersListContext.orders.find((order) => order.id === orderId)!;
  console.log("page", cartContext.cart);
  console.log("order", order);

  if (!order) {
    return <div>order not existed</div>;
  }

  return (
    // <OrdersProvider restaurantId="YhG2Rp1FVTHKIVfkDDO5">
    <CartProvider cart={order}>
      <div>
        asd {order.id} {order.table}
      </div>
    </CartProvider>
    // </OrdersProvider>
  );
};

export default Page;
