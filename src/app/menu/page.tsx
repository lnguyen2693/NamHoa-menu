"use client";

import MenuBoard from "@components/menu/board/MenuBoard";
import MenuItemCard from "@components/menu/item/MenuItemCard";
import { OrdersContext } from "@context/OrdersProvider";
import { RestaurantContext } from "@context/RestaurantProvider";
import React from "react";

export default function Menu() {
  const restaurantContext = React.useContext(RestaurantContext);
  const ordersListContext = React.useContext(OrdersContext);
  const cart = {
    id: "", // firebase generated id
    active: true,
    table: "", // get from ?tableId
    orderItems: [],
  };

  return (
    // <CartProvider cart={cart}>
    <div>
      {/* <Header></Header> */}
      <MenuBoard></MenuBoard>
      {/* <MenuItemCard menuItem={restaurantContext.menuItems[0]} /> */}
      {/* mainnn menu page */}
    </div>
    // </CartProvider>
  );
}
