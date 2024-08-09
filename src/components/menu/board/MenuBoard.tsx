import { OrdersContext } from "@context/OrdersProvider";
import { RestaurantContext } from "@context/RestaurantProvider";
import { IdentifiableMenuItems } from "@interfaces/type";
import { Tabs, Tab } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MenuCard from "./MenuCard";

interface TabMetadata {
  ref: React.RefObject<HTMLDivElement>;
  items: IdentifiableMenuItems;
}

type TabInformation = Record<string, TabMetadata>;

export const MenuBoard = () => {
  const restaurantContext = React.useContext(RestaurantContext);
  const ordersListContext = React.useContext(OrdersContext);

  const { menuItems } = restaurantContext;
  const tabs: TabInformation = React.useMemo(
    () =>
      menuItems.reduce((acc, current) => {
        // const ref = React.createRef(); // ua cai nay lm gi
        const tab = acc[current.category] ?? {
          ref: React.createRef(),
          items: [],
        };
        // console.log("acc: ", acc)
        // console.log("current: ", current)
        tab.items.push(current);
        acc[current.category] = tab;
        return acc;
      }, {} as TabInformation),
    [menuItems]
  );

  const [selectedTab, setSelectedTab] = React.useState(Object.keys(tabs)[0]);

  const onTabSelected = (_: any, category: string) => {
    const ref = tabs[category].ref;
    setSelectedTab(category);
    if (ref.current != null) {
      ref.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  };

  return (
    <Box position="relative">
      <Tabs
        value={selectedTab}
        onChange={onTabSelected}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "white",
        }}
      >
        {Object.keys(tabs)
          .sort((a, b) => {
            return a[0].localeCompare(b[0]);
          })
          .map((category) => (
            <Tab
              value={category}
              label={category}
              key={category}
              sx={{ textTransform: "none" }}
            />
          ))}
      </Tabs>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
        }}
      >
        {Object.entries(tabs)
          .sort((a, b) => {
            return a[0].localeCompare(b[0]);
          })
          .map(([category, metadata]) => {
            return (
              <div key={category} ref={metadata.ref}>
                {category}
                <MenuCard items={tabs[category].items}></MenuCard>
              </div>
            );
          })}
      </Box>
    </Box>
  );
};
