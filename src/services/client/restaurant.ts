import db from "../../../firebase";
import { Restaurant } from "@interfaces/db";
import { restaurantConverter } from "@services/firestore";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  PartialWithFieldValue,
  updateDoc,
} from "firebase/firestore";

export const addRestaurant = async (restaurant: Restaurant) => {
  try {
    const restaurantCollection: CollectionReference = collection(
      db,
      `restaurants`
    ).withConverter(restaurantConverter);

    const restaurantDoc = await addDoc(restaurantCollection, restaurant);
    console.log("new restaurant created: ", restaurantDoc.id);

    return restaurantDoc;
  } catch (error) {
    console.log("Error creating restaurant: ", error);
  }
};

export const updateRestaurant = async (
  data: PartialWithFieldValue<Restaurant>,
  restaurantID: string
) => {
  try {
    const restaurantDoc: DocumentReference = doc(
      db,
      `restaurants/${restaurantID}`
    ).withConverter(restaurantConverter);

    await updateDoc(restaurantDoc, data);
    console.log("restaurant updated: ", restaurantDoc.id);

    return restaurantDoc;
  } catch (error) {
    console.log("Error updating restaurant: ", error);
  }
};

export const getRestaurant = async (restaurantID: string) => {
  try {
    const restaurantDoc: DocumentReference = doc(
      db,
      `restaurants/${restaurantID}`
    ).withConverter(restaurantConverter);
    console.log("get restaurant: ", restaurantDoc.id);

    return restaurantDoc;
  } catch (error) {
    console.log("Error getting restaurant: ", error);
  }
};

export const deleteRestaurant = async (restaurantID: string) => {
  try {
    const restaurantDoc: DocumentReference = doc(
      db,
      `restaurants/${restaurantID}`
    ).withConverter(restaurantConverter);
    console.log("restaurant: ", restaurantDoc.id);

    await deleteDoc(restaurantDoc);
  } catch (error) {
    console.log("Error deleting restaurant", error);
  }
};
