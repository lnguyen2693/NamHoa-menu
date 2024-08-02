"use client";
import { Footer } from "@components/LayOut";
// import CartProvider from "@context/CartProvider";
import RestaurantProvider from "@context/RestaurantProvider";

const PublicLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <RestaurantProvider
      restaurantId="YhG2Rp1FVTHKIVfkDDO5"
    >
      {/* <CartProvider> */}
        {children}
        <Footer />
      {/* </CartProvider> */}
    </RestaurantProvider>
  );
};

export default PublicLayout;
