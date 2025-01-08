import React from "react";
import { IdentifiableMenuItem } from "@interfaces/type";
import { Paper, Typography } from "@mui/material";
import { MenuItemDrawer } from "./MenuItemDrawer";
import { Box } from "@mui/system";
import Image from "next/image";

interface menuItemCardProps {
  menuItem: IdentifiableMenuItem;
}
const MenuItemCard = (props: menuItemCardProps) => {
  const { menuItem } = props;
  const priceInVnd = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "code",
  })
    .format(menuItem.price)
    .replace("VND", "");

  console.log(menuItem.image);
  return (
    <Box>
      <Paper
        elevation={3}
        style={{
          position: "relative",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <Image
          src={menuItem.image ?? ""}
          alt={menuItem.name}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <MenuItemDrawer key={menuItem.id} menuItem={menuItem} />
      </Paper>
      <Box marginTop="8px">
        <Typography
          color={menuItem.available ? "#5DC389" : "#F35362"}
          fontSize="14px"
        >
          {menuItem.available ? "Còn món" : "Hết món"}
        </Typography>
        <Box
          marginTop="4px"
          display="flex"
          flexDirection="column"
          color="#000000DE"
          fontSize="14px"
        >
          <Typography fontWeight={500}>{menuItem.name}</Typography>
          <Typography>{priceInVnd}đ</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MenuItemCard;
