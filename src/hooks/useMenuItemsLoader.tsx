import { IdentifiableMenuItem, IdentifiableMenuItems } from "@interfaces/type";
import { State, useLoadingValue } from "./utils/useLoadingValue";
import React from "react";
import { getMenuItems } from "@services/client/menu";
import { collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import db from "../../firebase";
import { menuItemConverter } from "@services/firestore";

interface useMenuItemsLoaderProps {
  restaurantId: string;
}

export const useMenuItemsLoader = (props: useMenuItemsLoaderProps) => {
  const { state, setValue, setError } =
    useLoadingValue<IdentifiableMenuItems>();
  const unsubscriber = React.useRef<Unsubscribe | null>(null);

  // fetch data
  React.useEffect(() => {
    getMenuItems(props.restaurantId).then((value) => {
      setValue(value);
    });
  }, []);

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
      collection(db, `restaurants/${props.restaurantId}/menu`).withConverter(
        menuItemConverter
      ),
      (snapshot) => {
        // https://stackoverflow.com/questions/74570835/how-to-do-dynamic-routes-with-nextjs-13
        // https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
        // MenuItem component
        // Think about url design
        let menuItemsList: IdentifiableMenuItems = [];
        snapshot.docs.map((menuItem) => {
          menuItemsList.push({
            id: menuItem.id,
            ...menuItem.data(),
          } as IdentifiableMenuItem);
        });

        // console.log(menuItemsList)
        setValue(menuItemsList);
      }
    );

    unsubscriber.current = unsubscribe;

    return () => unsubscribe();
  }, [state.state]);

  return { menuItems: state };
};
