import { CartContext } from "@context/CartProvider";
import { Global } from "@emotion/react";
import { Button, Divider, styled, SwipeableDrawer } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import ItemInCart from "./ItemInCart";

interface CartDrawerProps {
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartDrawer = (props: CartDrawerProps) => {
  const { openCart, setOpenCart } = props;
  const cartContext = React.useContext(CartContext);
  console.log("cart in drawer:", cartContext.cart);
  return (
    <Box>
      <SwipeableDrawer
        open={openCart}
        anchor="right"
        onClose={() => setOpenCart(false)}
        onOpen={() => setOpenCart(true)}
      >
        <Box
          width="90vw"
          height="100%"
          // style={{ backgroundColor: "lightgrey"}}
        >
          <Box
            width="full"
            height={50}
            display="flex"
            alignItems="center"
            gap={1}
            paddingLeft={1}
            style={{ backgroundColor: "white" }}
          >
            <button
              style={{
                width: "fit",
                background: "transparent",
                border: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
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
          {cartContext.cart.orderItems.map((item) => (
            <ItemInCart
              item={item}
              key={item.itemID + JSON.stringify(item.options)}
            ></ItemInCart>
          ))}
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default CartDrawer;
