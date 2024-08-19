import { CartContext } from "@context/CartProvider";
import { Button, Divider, SwipeableDrawer } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import ItemInCart from "./ItemInCart";
import { makeOrder } from "utils/Order";
import { RestaurantContext } from "@context/RestaurantProvider";

interface CartDrawerProps {
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartDrawer = (props: CartDrawerProps) => {
  const { openCart, setOpenCart } = props;
  const cartContext = React.useContext(CartContext);
  const restaurantContext = React.useContext(RestaurantContext);

  const totalAmount = () => {
    return cartContext.cart.orderItems.reduce((amount, item) => {
      return amount + item.amount;
    }, 0);
  };

  const totalPrice = () => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "code",
    })
      .format(
        cartContext.cart.orderItems.reduce((price, item) => {
          return price + item.price * item.amount;
        }, 0)
      )
      .replace("VND", "");
  };

  const handleOrder = () => {
    makeOrder(cartContext, restaurantContext);
    cartContext.resetCart();
    setOpenCart(false);
  };

  return (
    <Box>
      <SwipeableDrawer
        open={openCart}
        anchor="right"
        onClose={() => setOpenCart(false)}
        onOpen={() => setOpenCart(true)}
      >
        <Box
          // width="full"
          height={50}
          display="flex"
          alignItems="center"
          gap={1}
          paddingLeft={1}
          style={{ backgroundColor: "white" }}
          boxShadow={2}
        >
          <button
            style={{
              width: "fit",
              background: "transparent",
              border: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setOpenCart(false)}
          >
            <IoIosArrowBack size={15} />
          </button>
          <Box fontSize={20} sx={{ fontWeight: "bold" }}>
            Giỏ hàng
          </Box>
        </Box>
        <Divider />

        <Box
          width="90vw"
          height="90vh"
          style={{ backgroundColor: "lightgrey" }}
          overflow="scroll"
          paddingBottom={15}
        >
          {cartContext.cart.orderItems.map((item) => (
            <ItemInCart
              item={item}
              key={item.itemID + JSON.stringify(item.options)}
            ></ItemInCart>
          ))}
        </Box>

        <Box
          position="absolute"
          bottom={0}
          right={0}
          left={0}
          padding={1}
          // margin={0.5}
          display="flex"
          flexDirection="column"
          gap={1}
          sx={{ backgroundColor: "white" }}
          boxShadow={1}
          // borderRadius={1}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            paddingLeft={2}
            paddingRight={2}
          >
            <Box>Tổng: {totalAmount()} món</Box>
            <Box>{totalPrice()}đ</Box>
          </Box>
          <Box height={40}>
            {totalAmount() == 0 ? (
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                sx={{ borderRadius: 10, textTransform: "initial" }}
                disabled
              >
                Gọi món
              </Button>
            ) : (
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                sx={{ borderRadius: 10, textTransform: "initial" }}
                onClick={() => handleOrder()}
              >
                Gọi món
              </Button>
            )}
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default CartDrawer;
