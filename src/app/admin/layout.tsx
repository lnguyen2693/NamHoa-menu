"use client";
import OrdersProvider from "@context/OrdersProvider";
// import CartProvider from "@context/CartProvider";
import RestaurantProvider from "@context/RestaurantProvider";

const AdminLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <OrdersProvider restaurantId="YhG2Rp1FVTHKIVfkDDO5">
      <RestaurantProvider restaurantId="YhG2Rp1FVTHKIVfkDDO5">
        {/* <CartProvider> */}
        {children}
        {/* </CartProvider> */}
      </RestaurantProvider>
    </OrdersProvider>
  );
};

export default AdminLayout;