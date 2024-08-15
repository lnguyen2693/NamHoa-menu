import { OrdersContext } from "@context/OrdersProvider";
import { RestaurantContext } from "@context/RestaurantProvider";
import { IdentifiableMenuItems } from "@interfaces/type";
import { Tabs, Tab, Divider } from "@mui/material";
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
        const tab = acc[current.category] ?? {
          ref: React.createRef(),
          items: [],
        };

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
    <Box position="relative" top={0}>
      <Tabs
        value={selectedTab}
        onChange={onTabSelected}
        style={{
          position: "sticky",
          top: 45,
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
              <Box key={category} ref={metadata.ref} marginBottom={10}>
                <Box fontSize={20} textTransform={"uppercase"}>{category}</Box>
                <Divider
                  style={{
                    marginBottom: 17,
                    marginTop: 5,
                    opacity: 1,
                    color: "black",
                  }}
                />
                <MenuCard items={tabs[category].items}></MenuCard>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};
