"use client";

import { MenuBoard } from "@components/menu/board/MenuBoard";
import { OrdersContext } from "@context/OrdersProvider";
import { RestaurantContext } from "@context/RestaurantProvider";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  CardMedia,
  Paper,
} from "@mui/material";
import { Box, flexbox } from "@mui/system";
import React from "react";
import { IoMdSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { FaBell } from "react-icons/fa";
import { Footer } from "@components/LayOut";
import CartDrawer from "@components/cart/CartDrawer";

export default function Menu() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const table = searchParams.get("table");

  const [openCart, setOpenCart] = React.useState(false);
  const restaurantContext = React.useContext(RestaurantContext);
  const ordersListContext = React.useContext(OrdersContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: "10px",
        rowGap: "10rem",
      }}
    >
      <Box>
        <Box
          position="fixed"
          top={0}
          left={0}
          height={50}
          width={1}
          zIndex={100}
          style={{ backgroundColor: "white" }}
          display={"flex"}
          // justifyContent="space-between"
          alignItems="center"
          alignSelf="center"
        >
          <Box marginLeft={2} fontSize={20}>
            {table ? <Box>Bàn {table}</Box> : <Box></Box>}
          </Box>
          {/* <Button style={{ marginRight: 2 }} color="secondary">
          <IoMdSearch size={23} />
        </Button> */}
        </Box>
        <Box>
          <CardMedia
            style={{ marginTop: 45 }}
            component="img"
            image="/nam-hoa-header-img.png"
            title="Nam Hoa header image"
          />
          <Box paddingY={"8px"} paddingX={"16px"}>
            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              style={{ textTransform: "initial" }}
            >
              <FaBell />{" "}
              <span style={{ marginLeft: "4px" }}>Gọi nhân viên</span>
            </Button>
          </Box>
        </Box>
        <MenuBoard></MenuBoard>
        
        <CartDrawer openCart={openCart} setOpenCart={setOpenCart}></CartDrawer>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={openCart ? 1 : 0}
            onChange={(event, newValue) => {
              setOpenCart(newValue === 1);
              console.log("open cart: ", newValue === 1);
            }}
          >
            <BottomNavigationAction
              label="Menu"
              icon={<MdOutlineMenuBook size={23} />}
            />
            <BottomNavigationAction
              label="Giỏ hàng"
              icon={<FaShoppingCart size={23} />}
            />
          </BottomNavigation>
        </Paper>
      </Box>
      <Footer />
    </Box>
  );
}
