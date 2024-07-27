import { MenuItem } from "@interfaces/db";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  PartialWithFieldValue,
  updateDoc,
} from "firebase/firestore";
import db from "../../../firebase";
import { menuItemConverter } from "@services/firestore";

type AddMenuItem = Pick<MenuItem, "category" | "name" | "price"> &
  PartialWithFieldValue<MenuItem>;

export const addMenuItem = async (
  menuItem: AddMenuItem,
  restaurantID: string
) => {
  try {
    const menuCollection = collection(
      db,
      `restaurants/${restaurantID}/menu`
    ).withConverter(menuItemConverter);

    const newMenuItem: AddMenuItem = {
      name: menuItem.name,
      category: menuItem.category,
      price: menuItem.price,
      image: menuItem.image ?? "",
      options: menuItem.options ?? {},
    };

    const menuItemDoc = await addDoc(menuCollection, newMenuItem);
    console.log("new menuItem added: ", menuItemDoc.id);

    return menuItemDoc;
  } catch (error) {
    console.log("Error adding new menu item: ", error);
  }
};

export const updateMenuItem = async (
  data: PartialWithFieldValue<MenuItem>,
  restaurantID: string,
  menuItemID: string
) => {
  try {
    const menuItemDoc = doc(
      db,
      `restaurants/${restaurantID}/menu/${menuItemID}`
    ).withConverter(menuItemConverter);

    await updateDoc(menuItemDoc, data);
    console.log("menuItem updated: ", menuItemDoc.id);

    return menuItemDoc;
  } catch (error) {
    console.log("Error updating menu item: ", error);
  }
};

export const getMenuItem = async (restaurantID: string, menuItemID: string) => {
  try {
    const menuItemDoc = doc(
      db,
      `restaurants/${restaurantID}/menu/${menuItemID}`
    ).withConverter(menuItemConverter);
    console.log("menuItem: ", menuItemDoc.id);

    return menuItemDoc;
  } catch (error) {
    console.log("Error getting menu item: ", error);
  }
};

export const deleteMenuItem = async (
  restaurantID: string,
  menuItemID: string
) => {
  try {
    const menuItemDoc = doc(
      db,
      `restaurants/${restaurantID}/menu/${menuItemID}`
    ).withConverter(menuItemConverter);

    await deleteDoc(menuItemDoc);

    console.log("menuItem deleted");
  } catch (error) {
    console.log("Error deleting menu item: ", error);
  }
};
