import { Order } from "@interfaces/db";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  PartialWithFieldValue,
  updateDoc,
} from "firebase/firestore";
import db from "../../../firebase";
import { orderConverter } from "@services/firestore";
import { IdentifiableOrder, IdentifiableOrders } from "@interfaces/type";

// type addOrder = Pick<Order, "table" | "orderItems"> &
//   PartialWithFieldValue<Order>;

export const addOrder = async (
  order: IdentifiableOrder,
  restaurantID: string
) => {
  const orderCollection = collection(
    db,
    `restaurants/${restaurantID}/orders`
  ).withConverter(orderConverter);

  const { id, ...res } = order;

  const orderDoc = await addDoc(orderCollection, res);

  console.log("New order added: ", orderDoc.id);
  return { id: orderDoc.id, ...res } as IdentifiableOrder;
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

export const getOrders = async (restaurantID: string) => {
  const orderDocs = await getDocs(
    collection(db, `restaurants/${restaurantID}/orders`).withConverter(
      orderConverter
    )
  );

  const orders: IdentifiableOrders = orderDocs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return orders;
};

export const deleteOrder = async (restaurantID: string, orderID: string) => {
  const orderDoc: DocumentReference = doc(
    db,
    `restaurants/${restaurantID}/orders/${orderID}`
  ).withConverter(orderConverter);
  await deleteDoc(orderDoc);
  console.log("Order deleted");
};
