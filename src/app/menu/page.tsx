"use client";

import { MenuBoard } from "@components/menu/board/MenuBoard";
import { OrdersContext } from "@context/OrdersProvider";
import { RestaurantContext } from "@context/RestaurantProvider";
import React from "react";

export default function Menu() {
  const restaurantContext = React.useContext(RestaurantContext);
  const ordersListContext = React.useContext(OrdersContext);

  return (
    <MenuBoard></MenuBoard>
  );
}
