import { MenuItem, Order, Restaurant } from "./db";

type Identifiable<T extends Object> = {
  id: string;
} & T;

export type IdentifiableRestaurant = Identifiable<Restaurant>;

export type IdentifiableMenuItem = Identifiable<MenuItem>;

export type IdentifiableMenuItems = IdentifiableMenuItem[];

export type IdentifiableOrder = Identifiable<Order>;
