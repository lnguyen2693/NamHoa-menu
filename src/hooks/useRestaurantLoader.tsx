import { IdentifiableRestaurant } from "@interfaces/type";
import { State, useLoadingValue } from "./utils/useLoadingValue";
import React from "react";
import { getRestaurant } from "@services/client/restaurant";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import db from "../../firebase";
import { restaurantConverter } from "@services/firestore";

interface useRestaurantLoaderProps {
  restaurantId: string;
}

export const useRestaurantLoader = (props: useRestaurantLoaderProps) => {
  const { restaurantId } = props;
  const { state, setValue, setError } =
    useLoadingValue<IdentifiableRestaurant>();
  const unsubscriber = React.useRef<Unsubscribe | null>(null);

  // fetch restaurant context
  React.useEffect(() => {
    getRestaurant(restaurantId).then(setValue);
  }, [restaurantId, setValue]);

  React.useEffect(() => {
    if (state.state !== State.SUCCESS) {
      if (unsubscriber.current != null) {
        unsubscriber.current();
      }
      unsubscriber.current = null;
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, `restaurants/${restaurantId}`).withConverter(restaurantConverter),
      (snapshot) => {
        if (snapshot.exists()) {
          setValue({
            id: restaurantId,
            ...snapshot.data(),
          } as IdentifiableRestaurant);
        }
      }
    );

    unsubscriber.current = unsubscribe;

    return () => unsubscribe();
  }, [state.state, restaurantId, setValue]);

  return { restaurant: state };
};
