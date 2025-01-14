import { CartContext } from "@context/CartProvider";
import { Button, Divider, SwipeableDrawer, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
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

  const toggleCart = () => setOpenCart((prev) => !prev);

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
    <SwipeableDrawer
      open={openCart}
      anchor="right"
      onClose={toggleCart}
      onOpen={toggleCart}
    >
      <Box bgcolor="#fff" width="90vw" height="90vh">
        <Box
          boxShadow={3}
          padding="8px"
          display="flex"
          alignItems="center"
          columnGap="8px"
        >
          <Box color="#737373">
            <Button
              color="inherit"
              sx={{ minHeight: 0, minWidth: 0, padding: 0 }}
            >
              <IoIosArrowBack size={16} />
            </Button>
          </Box>
          <Typography
            color="#171717"
            fontWeight={400}
            fontSize={24}
            variant="h6"
          >
            Đơn hàng
          </Typography>
        </Box>
        <Box paddingX="20px" paddingY="16px" height="90%" overflow="scroll">
          <Stack
            direction="column"
            spacing="16px"
            divider={<Divider color="#D4D4D4" orientation="horizontal" />}
          >
            {cartContext.cart.orderItems.map((item) => (
              <ItemInCart
                item={item}
                key={item.itemID + JSON.stringify(item.options)}
              />
            ))}
          </Stack>
        </Box>
        <Box
          position="absolute"
          bottom={0}
          right={0}
          left={0}
          paddingY="16px"
          paddingX="24px"
          display="flex"
          flexDirection="column"
          gap="16px"
          sx={{ backgroundColor: "white" }}
          boxShadow={3}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            paddingLeft={2}
            paddingRight={2}
            color="#000000DE"
            fontWeight={500}
          >
            <Typography>Tổng: {totalAmount()} món</Typography>
            <Typography>{totalPrice()}đ</Typography>
          </Box>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            sx={{
              borderRadius: 10,
              textTransform: "initial",
              paddingY: "12px",
            }}
            onClick={() => handleOrder()}
          >
            <Typography>Gọi món</Typography>
          </Button>
        </Box>
      </Box>
      {/* <Box
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
      </Box> */}
    </SwipeableDrawer>
  );
};

export default CartDrawer;
