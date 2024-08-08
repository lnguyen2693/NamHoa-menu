import React from "react";
import { IdentifiableMenuItem } from "@interfaces/type";
import Card from "@mui/material/Card";
import { styled } from "@mui/material";
import { pink } from "@mui/material/colors";
import { MenuItemDrawer } from "./MenuItemDrawer";

interface menuItemCardProps {
  menuItem: IdentifiableMenuItem;
}

const CustomCard = styled(Card)({
  width: "10rem",
  height: "10rem",
  position: "relative",
});

const MenuItemCard = (props: menuItemCardProps) => {
  return (
    <>
      <CustomCard>
        <div
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url("${props.menuItem.image}")`,
            width: "100%",
            height: "100%",
          }}
        >
          <MenuItemDrawer menuItem={props.menuItem}></MenuItemDrawer>
        </div>
      </CustomCard>
    </>
  );
};

export default MenuItemCard;
