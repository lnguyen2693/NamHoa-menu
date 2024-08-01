import { MenuItem } from "@interfaces/db";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  PartialWithFieldValue,
  updateDoc,
} from "firebase/firestore";
import db from "../../../firebase";
import { menuItemConverter } from "@services/firestore";
import { IdentifiableMenuItem } from "@interfaces/type";

type AddMenuItem = Pick<MenuItem, "category" | "name" | "price"> &
  PartialWithFieldValue<MenuItem>;

export const addMenuItem = async (menuItem: MenuItem, restaurantID: string) => {
  const menuCollection = collection(
    db,
    `restaurants/${restaurantID}/menu`
  ).withConverter(menuItemConverter);

  // const newMenuItem: AddMenuItem = {
  //   name: menuItem.name,
  //   category: menuItem.category,
  //   available: true,
  //   price: menuItem.price,
  //   image: menuItem.image ?? "",
  //   options: menuItem.options ?? {},
  // };

  const menuItemDoc = await addDoc(menuCollection, menuItem);
  console.log("new menuItem added: ", menuItemDoc.id);

  return { id: menuItemDoc.id, ...menuItem } as IdentifiableMenuItem;
};

export const updateMenuItem = async (
  menuItem: IdentifiableMenuItem,
  restaurantID: string
) => {
  const menuItemDoc = doc(
    db,
    `restaurants/${restaurantID}/menu/${menuItem.id}`
  ).withConverter(menuItemConverter);

  const { id, ...res } = menuItem;

  await updateDoc(menuItemDoc, res);
  console.log("menuItem updated: ", menuItemDoc.id);

  return menuItem;
};

export const getMenuItem = async (restaurantID: string, menuItemID: string) => {
  const menuItemDoc = await getDoc(
    doc(db, `restaurants/${restaurantID}/menu/${menuItemID}`).withConverter(
      menuItemConverter
    )
  );
  console.log("menuItem: ", menuItemDoc.id);

  return {
    id: menuItemDoc.id,
    ...menuItemDoc.data(),
  } as IdentifiableMenuItem;
};

export const deleteMenuItem = async (
  restaurantID: string,
  menuItemID: string
) => {
  const menuItemDoc = doc(
    db,
    `restaurants/${restaurantID}/menu/${menuItemID}`
  ).withConverter(menuItemConverter);

  await deleteDoc(menuItemDoc);

  console.log("menuItem deleted");
};
