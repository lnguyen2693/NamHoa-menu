import { Order } from "@interfaces/db";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  PartialWithFieldValue,
  updateDoc,
} from "firebase/firestore";
import db from "../../../firebase";
import { orderConverter } from "@services/firestore";

type addOrder = Pick<Order, "table" | "orderItems"> &
  PartialWithFieldValue<Order>;

export const addOrder = async (order: addOrder, restaurantID: string) => {
  try {
    const orderCollection = collection(
      db,
      `restaurants/${restaurantID}/orders`
    ).withConverter(orderConverter);

    const newOrder: addOrder = {
      active: true,
      table: order.table,
      orderItems: order.orderItems,
    };

    const orderDoc = await addDoc(orderCollection, newOrder);

    console.log("New order added: ", orderDoc.id);
    return orderDoc;
  } catch (error) {
    console.log("Error adding new order");
  }
};

export const updateOrder = async (
  data: PartialWithFieldValue<Order>,
  restaurantID: string,
  orderID: string
) => {
  try {
    const orderDoc: DocumentReference = doc(
      db,
      `restaurants/${restaurantID}/orders/${orderID}`
    ).withConverter(orderConverter);

    await updateDoc(orderDoc, data);
    console.log("Order updated: ", orderDoc.id);

    return orderDoc;
  } catch (error) {
    console.log("Error updating order");
  }
};

export const getOrder = async (restaurantID: string, orderID: string) => {
  try {
    const orderDoc: DocumentReference = doc(
      db,
      `restaurants/${restaurantID}/orders/${orderID}`
    ).withConverter(orderConverter);

    console.log("Order: ", orderDoc);
    return orderDoc;
  } catch (error) {
    console.log("Error getting order");
  }
};

export const deleteOrder = async (restaurantID: string, orderID: string) => {
  try {
    const orderDoc: DocumentReference = doc(
      db,
      `restaurants/${restaurantID}/orders/${orderID}`
    ).withConverter(orderConverter);
    await deleteDoc(orderDoc);
    console.log("Order deleted");
  } catch (error) {
    console.log("Error deleting order");
  }
};
