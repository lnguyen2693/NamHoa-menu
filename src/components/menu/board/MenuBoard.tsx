import { RestaurantContext } from "@context/RestaurantProvider";
import React from "react";
import MenuItemCard from "../item/MenuItemCard";
import { pink } from "@mui/material/colors";

const MenuBoard = () => {
  const restaurantContext = React.useContext(RestaurantContext);
  let categories: Set<string> = new Set();

  restaurantContext.menuItems.forEach((item) => {
    if (!categories.has(item.category)) {
      categories.add(item.category);
      // console.log(categories);
    }
  });

  console.log(categories.entries());
  for (let category in categories.entries()) {
    console.log(category[0]);
    console.log(
      restaurantContext.menuItems.filter((item) => {
        item.category === category;
      })
    );
  }

  console.log("in MenuBoard: ", restaurantContext);
  return (
    <div style={{ width: "full" }}>
      {Array.from(categories).map((category) => (
        <div>
          <div>{category}</div>

          <div
            style={{
              width: "full",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              backgroundColor: pink[50],
            }}
          >
            {restaurantContext.menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <MenuItemCard menuItem={item} />
              ))}
          </div>
        </div>
      ))}
      {/* <div
        style={{
          width: "full",
          display: "inline-flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          backgroundColor: pink[50],
        }}
      >
        {restaurantContext.menuItems.map((item) => (
          <MenuItemCard menuItem={item} />
        ))}
      </div> */}
    </div>
  );
};

export default MenuBoard;
