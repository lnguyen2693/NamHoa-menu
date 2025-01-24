import { IdentifiableMenuItem, IdentifiableMenuItems } from "@interfaces/type";
import { State, useLoadingValue } from "./utils/useLoadingValue";
import React from "react";
import { getMenuItems } from "@services/client/menu";
import { collection, doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import db from "../../firebase";
import { menuItemConverter } from "@services/firestore";

interface useMenuItemsLoaderProps {
  restaurantId: string;
}

export const useMenuItemsLoader = (props: useMenuItemsLoaderProps) => {
  const { restaurantId } = props;
  const { state, setValue, setError } =
    useLoadingValue<IdentifiableMenuItems>();
  const unsubscriber = React.useRef<Unsubscribe | null>(null);

  // fetch data
  React.useEffect(() => {
    getMenuItems(restaurantId).then(setValue);
  }, [restaurantId, setValue]);

  // onSnapshot
  React.useEffect(() => {
    if (state.state !== State.SUCCESS) {
      if (unsubscriber.current !== null) {
        unsubscriber.current();
      }
      unsubscriber.current = null;
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, `restaurants/${restaurantId}/menu`).withConverter(
        menuItemConverter
      ),
      (snapshot) =>
        setValue(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );

    unsubscriber.current = unsubscribe;

    return () => unsubscribe();
  }, [state.state, restaurantId, setValue]);

  return { menuItems: state };
};
