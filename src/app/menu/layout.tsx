"use client";
import { Footer } from "@components/LayOut";
import CartProvider from "@context/CartProvider";
import OrdersProvider from "@context/OrdersProvider";
// import CartProvider from "@context/CartProvider";
import RestaurantProvider from "@context/RestaurantProvider";
import { Box } from "@mui/system";
import { useSearchParams } from "next/navigation";
import { defaultOrder } from "utils/defaultValue";

interface PublicLayoutProps {
  children: React.ReactNode;
  params: {
    restaurantId: string;
  };
}

const PublicLayout = (props: PublicLayoutProps) => {
  const searchParams = useSearchParams();
  const { children, params } = props;
  const table = Number(searchParams.get("table"));
  console.log("table ", table);
  return (
    <OrdersProvider restaurantId="YhG2Rp1FVTHKIVfkDDO5">
      <RestaurantProvider restaurantId="YhG2Rp1FVTHKIVfkDDO5">
        {table ? (
          <CartProvider cart={defaultOrder(table)}>{children}</CartProvider>
        ) : (
          <Box>{children}</Box>
        )}
      </RestaurantProvider>
    </OrdersProvider>
  );
};

export default PublicLayout;
