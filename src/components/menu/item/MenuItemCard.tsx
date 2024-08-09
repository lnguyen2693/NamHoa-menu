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
  width: "10rem",
  height: "10rem",
  position: "relative",
});

const MenuItemCard = (props: menuItemCardProps) => {
  const { menuItem } = props;
  return (
    <>
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
        {menuItem.available ? <Box>còn món</Box> : <Box>hết món</Box>}
        
        <Box>{menuItem.name}</Box>
        <Box>
          {menuItem.price.toLocaleString("en-US", {
            style: "currency",
            currency: "VND",
          })}
        </Box>
      </Box>
    </>
  );
};

export default MenuItemCard;
