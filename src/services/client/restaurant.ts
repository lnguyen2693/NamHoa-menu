import db from "../../../firebase";
import { Restaurant } from "@interfaces/db";
import { IdentifiableRestaurant } from "@interfaces/type";
import { restaurantConverter } from "@services/firestore";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  PartialWithFieldValue,
  updateDoc,
} from "firebase/firestore";

export const addRestaurant = async (restaurant: Restaurant) => {
  const restaurantCollection: CollectionReference = collection(
    db,
    `restaurants`
  ).withConverter(restaurantConverter);

  const restaurantDoc = await addDoc(restaurantCollection, restaurant);
  console.log("new restaurant created: ", restaurantDoc.id);

  return { id: restaurantDoc.id, ...restaurant } as IdentifiableRestaurant;
};

export const updateRestaurant = async (
  restaurant: IdentifiableRestaurant
  // restaurantID: string
) => {
  const restaurantDoc: DocumentReference = doc(
    db,
    `restaurants/${restaurant.id}`
  ).withConverter(restaurantConverter);

  const { id, ...res } = restaurant;

  await updateDoc(restaurantDoc, res);
  console.log("restaurant updated: ", restaurantDoc.id);

  return restaurant;
};

export const getRestaurant = async (restaurantID: string) => {
  const restaurantDoc = await getDoc(
    doc(db, `restaurants/${restaurantID}`).withConverter(restaurantConverter)
  );
  console.log("get restaurant: ", restaurantDoc.id);

  return {
    id: restaurantDoc.id,
    ...restaurantDoc.data(),
  } as IdentifiableRestaurant;
};

export const deleteRestaurant = async (restaurantID: string) => {
  const restaurantDoc: DocumentReference = doc(
    db,
    `restaurants/${restaurantID}`
  ).withConverter(restaurantConverter);
  console.log("restaurant: ", restaurantDoc.id);

  await deleteDoc(restaurantDoc);
};
