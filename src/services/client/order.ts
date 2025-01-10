import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../../../firebase";
import { orderConverter } from "@services/firestore";
import { IdentifiableOrder, IdentifiableOrders } from "@interfaces/type";

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

export interface GetOrders {
  restaurantId: string;
  table?: number;
  active?: boolean;
}

export const getOrdersQuery = (config: GetOrders) => {
  const { restaurantId, table, active } = config;
  const queries = [];

  if (table) {
    queries.push(where("table", "==", table));
  }

  if (active) {
    queries.push(where("active", "==", true));
  }

  return query(
    collection(db, `restaurants/${restaurantId}/orders`),
    ...queries
  ).withConverter(orderConverter);
};

export const getOrders = async (config: GetOrders) => {
  return (await getDocs(getOrdersQuery(config))).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteOrder = async (restaurantID: string, orderID: string) => {
  const orderDoc: DocumentReference = doc(
    db,
    `restaurants/${restaurantID}/orders/${orderID}`
  ).withConverter(orderConverter);
  await deleteDoc(orderDoc);
  console.log("Order deleted");
};
