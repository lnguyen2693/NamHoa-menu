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
import { useSearchParams } from "next/navigation";

export default function Menu() {
  const searchParams = useSearchParams();
  const table = searchParams.get("table");
  const restaurantContext = React.useContext(RestaurantContext);
  const ordersListContext = React.useContext(OrdersContext);

  return (
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
        justifyContent="space-between"
        alignItems="center"
        alignSelf="center"
      >
        <Box marginLeft={2} fontSize={20}>
          {table ? <Box>Bàn {table}</Box> : <Box></Box>}
        </Box>
        <Button style={{ marginRight: 2 }} color="secondary">
          <IoMdSearch size={23} />
        </Button>
      </Box>
      <Box>
        <CardMedia
          style={{ marginTop: 45 }}
          component="img"
          image="/nam-hoa-header-img.png"
          title="Nam Hoa header image"
        />
        <Box paddingTop={1.5} paddingBottom={1.5}>
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            style={{ textTransform: "initial" }}
          >
            Gọi nhân viên
          </Button>
        </Box>
      </Box>
      <MenuBoard></MenuBoard>
      {/* <Box position="fixed" width={1} bottom={0} left={0}>
        <BottomNavigation></BottomNavigation>
      </Box> */}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={0}
          // onChange={(event, newValue) => {
          //   if (newValue !== 0) {
          //     console.log("change");
          //   }
          // }}
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
  );
}
