"use client";
import { Footer } from "@components/LayOut";
import OrdersProvider from "@context/OrdersProvider";
// import CartProvider from "@context/CartProvider";
import RestaurantProvider from "@context/RestaurantProvider";

const PublicLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <OrdersProvider restaurantId="YhG2Rp1FVTHKIVfkDDO5">
      <RestaurantProvider restaurantId="YhG2Rp1FVTHKIVfkDDO5">
        {/* <CartProvider> */}
        {children}
        <Footer />
        {/* </CartProvider> */}
      </RestaurantProvider>
    </OrdersProvider>
  );
};

export default PublicLayout;
