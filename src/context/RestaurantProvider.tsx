import { MenuItem, Restaurant } from "@interfaces/db";
import { useMenuItemsLoader } from "hooks/useMenuItemsLoader";
import { useRestaurantLoader } from "hooks/useRestaurantLoader";
import { State } from "hooks/utils/useLoadingValue";
import React from "react";

interface RestaurantProviderProps {
  children?: React.ReactNode;
  restaurantId: string;
}

interface RestaurantContext {
  restaurant: Restaurant;
  menuItems: MenuItem[];
}

export const RestaurantContext = React.createContext({} as RestaurantContext);

const Provider = RestaurantContext.Provider;

const RestaurantProvider = (props: RestaurantProviderProps) => {
  const { restaurantId } = props;
  const { restaurant } = useRestaurantLoader({ restaurantId: restaurantId });
  const { menuItems } = useMenuItemsLoader({ restaurantId: restaurantId });

  if (restaurant.state == State.SUCCESS && menuItems.state == State.SUCCESS) {
    console.log(restaurant.value);
    console.log(menuItems.value);
    return (
      <Provider
        value={{ restaurant: restaurant.value, menuItems: menuItems.value }}
      >
        {props.children}
      </Provider>
    );
  } else {
    // load indicator + error message
    return null;
  }

};

export default RestaurantProvider;
