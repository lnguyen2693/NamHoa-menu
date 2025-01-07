import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FolderIcon from "@mui/icons-material/Folder";
import React from "react";

export const AdminNav = () => {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      sx={{ padding: 0.5 }}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        label="Menu"
        icon={<MenuBookOutlinedIcon />}
      ></BottomNavigationAction>
      <BottomNavigationAction
        label="Giỏ hàng"
        icon={<ShoppingCartIcon />}
      ></BottomNavigationAction>
      <BottomNavigationAction
        label="Danh sách đơn hàng"
        icon={<FolderIcon />}
      ></BottomNavigationAction>
    </BottomNavigation>
  );
};
