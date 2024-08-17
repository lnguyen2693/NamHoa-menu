import React from "react";
import { IdentifiableMenuItem } from "@interfaces/type";
import Card from "@mui/material/Card";
import { styled } from "@mui/material";
import { pink } from "@mui/material/colors";
import { MenuItemDrawer } from "./MenuItemDrawer";
import { Box } from "@mui/system";

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
  const priceInVnd = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "code",
  })
    .format(menuItem.price)
    .replace("VND", "");

  return (
    <Box>
      <CustomCard>
        <Box
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url("${menuItem.image}")`,
            width: "100%",
            height: "100%",
          }}
        >
          <MenuItemDrawer
            key={menuItem.id}
            menuItem={menuItem}
          ></MenuItemDrawer>
        </Box>
      </CustomCard>
      <Box marginTop="8px">
        <Box color={menuItem.available ? "#5DC389" : "#F35362"} fontSize="14px">
          <span>{menuItem.available ? "Còn món" : "Hết món"}</span>
        </Box>
        <Box marginTop="4px" display="flex" flexDirection="column" rowGap="4px">
          <span>{menuItem.name}</span>
          <span style={{ fontWeight: 400 }}>{priceInVnd}đ</span>
        </Box>
      </Box>
    </Box>
  );
};

export default MenuItemCard;
