import { CartContext } from "@context/CartProvider";
import { Button, Divider, SwipeableDrawer } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import ItemInCart from "./ItemInCart";
import { IdentifiableOrder } from "@interfaces/type";
import { OrderItem } from "@interfaces/db";

interface CartDrawerProps {
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartDrawer = (props: CartDrawerProps) => {
  const { openCart, setOpenCart } = props;
  const cartContext = React.useContext(CartContext);

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
            <Box>Tổng: __ món</Box>
            <Box>total price</Box>
          </Box>
          <Box height={40}>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              sx={{ borderRadius: 10 }}
            >
              Gọi món
            </Button>
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default CartDrawer;
