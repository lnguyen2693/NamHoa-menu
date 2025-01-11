import React from "react";
import { IdentifiableMenuItem } from "@interfaces/type";
import { Card, Paper, Typography } from "@mui/material";
import { MenuItemDrawer } from "./MenuItemDrawer";
import { Box, styled } from "@mui/system";
import Image from "next/image";
import { formatPriceInVnd } from "utils/string";

interface menuItemCardProps {
  menuItem: IdentifiableMenuItem;
}

const CustomCard = styled(Card)({
  width: "100%",
  height: "auto",
  position: "relative",
  aspectRatio: 1,
});

const MenuItemCard = (props: menuItemCardProps) => {
  const { menuItem } = props;

  return (
    <Box>
      <CustomCard elevation={4}>
        <Box
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url("${menuItem.image}")`,
            width: "100%",
            height: "100%",
            opacity: menuItem.available ? 1 : 0.5,
          }}
        >
          <MenuItemDrawer key={menuItem.id} menuItem={menuItem} />
        </Box>
      </CustomCard>
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
          <Typography>{formatPriceInVnd(menuItem)}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MenuItemCard;
