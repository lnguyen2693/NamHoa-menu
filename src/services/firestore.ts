import { MenuItem, Order, OrderItem, Restaurant, Staff } from "@interfaces/db";
import {
  DocumentData,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export const menuItemConverter = {
  toFirestore(menuItem: PartialWithFieldValue<MenuItem>): DocumentData {
    return {
      name: menuItem.name,
      category: menuItem.category,
      price: menuItem.price,
      image: menuItem.image,
      addresses: menuItem.addresses,
      options: menuItem.options,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: any): MenuItem {
    const data = snapshot.data(options)!;
    return {
      name: data.name,
      category: data.category,
      price: data.price,
      image: data.image,
      addresses: data.addresses,
      options: data.options,
    } as MenuItem;
  },
};

export const orderConverter = {
  toFirestore(order: PartialWithFieldValue<Order>): DocumentData {
    return {
      active: order.active,
      table: order.table,
      orderItems: order.orderItems,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: any): Order {
    const data = snapshot.data(options)!;
    return {
      active: data.active,
      table: data.table,
      orderItems: data.orderItems,
    } as Order;
  },
};

export const orderItemConverter = {
  toFirestore(orderItem: PartialWithFieldValue<OrderItem>): DocumentData {
    return {
      itemID: orderItem.itemID,
      name: orderItem.name,
      price: orderItem.price,
      options: orderItem.options,
      amount: orderItem.amount,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: any): OrderItem {
    const data = snapshot.data(options)!;
    return {
      itemID: data.itemID,
      name: data.name,
      price: data.price,
      options: data.options,
      amount: data.amount,
    } as OrderItem;
  },
};

export const restaurantConverter = {
  toFirestore(restaurant: PartialWithFieldValue<Restaurant>): DocumentData {
    return {
      name: restaurant.name,
      address: restaurant.address,
      contact: restaurant.contact,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: any): Restaurant {
    const data = snapshot.data(options)!;
    return {
      name: data.name,
      address: data.address,
      contact: data.contact,
    } as Restaurant;
  },
};

export const staffConverter = {
  toFirestore(staff: PartialWithFieldValue<Staff>): DocumentData {
    return {
      name: staff.name,
      contact: staff.contact,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: any): Staff {
    const data = snapshot.data(options)!;
    return {
      name: data.name,
      contact: data.contact,
    } as Staff;
  },
};
