import { Order } from "@interfaces/db";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  PartialWithFieldValue,
  updateDoc,
} from "firebase/firestore";
import db from "../../../firebase";
import { orderConverter } from "@services/firestore";
import { IdentifiableOrder } from "@interfaces/type";

type addOrder = Pick<Order, "table" | "orderItems"> &
  PartialWithFieldValue<Order>;

export const addOrder = async (order: Order, restaurantID: string) => {
  const orderCollection = collection(
    db,
    `restaurants/${restaurantID}/orders`
  ).withConverter(orderConverter);

  // const newOrder: addOrder = {
  //   active: true,
  //   table: order.table,
  //   orderItems: order.orderItems,
  // };

  const orderDoc = await addDoc(orderCollection, order);

  console.log("New order added: ", orderDoc.id);
  return { id: orderDoc.id, ...order } as IdentifiableOrder;
};

export const updateOrder = async (
  order: IdentifiableOrder,
  restaurantID: string
  // orderID: string
) => {
  const orderDoc: DocumentReference = doc(
    db,
    `restaurants/${restaurantID}/orders/${order.id}`
  ).withConverter(orderConverter);

  const { id, ...res } = order;

  await updateDoc(orderDoc, res);
  console.log("Order updated: ", orderDoc.id);

  return order;
};

export const getOrder = async (restaurantID: string, orderID: string) => {
  const orderDoc = await getDoc(
    doc(db, `restaurants/${restaurantID}/orders/${orderID}`).withConverter(
      orderConverter
    )
  );

  console.log("Order: ", orderDoc);
  return { id: orderDoc.id, ...orderDoc.data() } as IdentifiableOrder;
};

export const deleteOrder = async (restaurantID: string, orderID: string) => {
  const orderDoc: DocumentReference = doc(
    db,
    `restaurants/${restaurantID}/orders/${orderID}`
  ).withConverter(orderConverter);
  await deleteDoc(orderDoc);
  console.log("Order deleted");
};
