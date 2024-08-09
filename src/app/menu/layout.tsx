"use client";
import { Footer } from "@components/LayOut";
import OrdersProvider from "@context/OrdersProvider";
// import CartProvider from "@context/CartProvider";
import RestaurantProvider from "@context/RestaurantProvider";
import { Box } from "@mui/system";

const PublicLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <OrdersProvider restaurantId="YhG2Rp1FVTHKIVfkDDO5">
      <RestaurantProvider restaurantId="YhG2Rp1FVTHKIVfkDDO5">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            // overflow: "hidden",
            padding: "10px 10px",
            rowGap: "10rem",
          }}
        >
          {children}
          <Footer />
        </Box>
      </RestaurantProvider>
    </OrdersProvider>
  );
};

export default PublicLayout;
