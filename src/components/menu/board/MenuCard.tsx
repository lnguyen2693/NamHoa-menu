import { RestaurantContext } from "@context/RestaurantProvider";
import React from "react";
import MenuItemCard from "../item/MenuItemCard";
import { pink } from "@mui/material/colors";
import { Grid } from "@mui/material";
import { IdentifiableMenuItems } from "@interfaces/type";

interface MenuCardProps {
  items: IdentifiableMenuItems;
}

const MenuCard = (props: MenuCardProps) => {
  const { items } = props;

  return (
    <div style={{ width: "full" }}>
      <Grid
        container
        spacing={2}
        // justifyContent="center"
        alignItems="center"
        paddingLeft={1}
        paddingRight={1}
      >
        {items.map((item) => (
          <Grid item key={item.id}>
            <MenuItemCard key={item.id} menuItem={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MenuCard;
