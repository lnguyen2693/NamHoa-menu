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
        sx={{
          position: "sticky",
          top: 45,
          zIndex: 100,
          backgroundColor: "white",
          padding: "16px 16px 4px",
          ".MuiTabs-flexContainer": {
            gap: "8px",
          },
        }}
        TabIndicatorProps={{ style: { display: "none" } }}
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
              sx={{
                textTransform: "none",
                "&.MuiTab-root": {
                  bgcolor: "#E5E5E5",
                  color: "#000",
                  padding: "4px 10px",
                  borderRadius: "8px",
                  minHeight: "36px",
                },
                "&.Mui-selected": {
                  bgcolor: "#BD1E2D",
                  color: "#FFF",
                },
              }}
            />
          ))}
      </Tabs>
      <Divider sx={{ height: "6px", bgcolor: "#E5E5E5", border: "none" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "4rem",
          marginTop: "32px",
          marginX: "16px",
        }}
      >
        {Object.entries(tabs)
          .sort((a, b) => {
            return a[0].localeCompare(b[0]);
          })
          .map(([category, metadata]) => {
            return (
              <Box key={category} ref={metadata.ref}>
                <Box fontSize={20} textTransform={"uppercase"} fontWeight={800}>
                  {category}
                </Box>
                <Divider
                  sx={{
                    "&.MuiDivider-root": {
                      marginTop: "5px",
                      marginBottom: "16px",
                      borderColor: "#000",
                    },
                  }}
                />
                <MenuCard items={tabs[category].items} />
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};
