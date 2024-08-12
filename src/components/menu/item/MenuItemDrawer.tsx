import React from "react";
import { Button, SwipeableDrawer } from "@mui/material";
import { Global } from "@emotion/react";
import { IoMdClose } from "react-icons/io";
import { IdentifiableMenuItem } from "@interfaces/type";
import { Box, width } from "@mui/system";
import { SingleChoice } from "./itemOptions/SingleChoice";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { MultipleChoice } from "./itemOptions/MultipleChoice";
import { LuDot } from "react-icons/lu";
import { AddItemToCart } from "utils/Order";
import { CartContext } from "@context/CartProvider";



// /app/page.tsx -> /
// /app/menu/page.tsx -> /menu

// /app/[restaurant] -> /app/nam-hoa, /app/hello-world

interface menuItemDrawerProps {
  menuItem: IdentifiableMenuItem;
}

export const MenuItemDrawer = (props: menuItemDrawerProps) => {
  const { menuItem } = props;
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [addButton, setAddButton] = React.useState(true);

  const [options, setOptions] = React.useState<Record<string, string[]>>({});

  const cartContext = React.useContext(CartContext);

  const addAmount = () => {
    setAmount(amount + 1);
  };

  const lessAmount = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };

  const addOptions = (key: string, choices: string[]) => {
    setOptions({ ...options, [key]: choices });
  };

  const requirement = Object.keys(menuItem.options).filter(
    (key) => menuItem.options[key].required
  );

  React.useEffect(() => {
    const unsatisfied = requirement.filter(
      (key) => options[key] == undefined || options[key].length === 0
    );
    setAddButton(unsatisfied.length !== 0 || amount === 0);
  }, [amount, options]);

  return (
    <Box style={{ position: "absolute", zIndex: "1", bottom: 8, right: 7 }}>
      <button
        style={{
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: 100,
          border: "none",
          boxShadow: "0.1rem 0.1rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => setOpen(true)}
        disabled={!props.menuItem.available}
      >
        <IoMdAdd size={22} />
      </button>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: "90vh",
            overflow: "scroll",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          },
        }}
      ></Global>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <div
          style={{
            width: "100vw",
            height: "25vh",
            backgroundImage: `url("${props.menuItem.image}")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            height: "100%",
            // backgroundColor: pink[50],
            padding: 13,
          }}
        >
          <div style={{ fontSize: "2rem" }}>{props.menuItem.name}</div>
          <div>
            {/* {props.menuItem.price} */}
            {props.menuItem.price.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </div>

          <div style={{ display: "flexbox" }}>
            {Object.keys(props.menuItem.options).map((key) =>
              props.menuItem.options[key].multipleChoice ? (
                <MultipleChoice
                  key={key}
                  keyItem={key}
                  option={props.menuItem.options[key]}
                  allOptions={options}
                  addOptions={addOptions}
                ></MultipleChoice>
              ) : (
                <SingleChoice
                  key={key}
                  keyItem={key}
                  option={props.menuItem.options[key]}
                  allOptions={options}
                  addOptions={addOptions}
                />
              )
            )}
          </div>
        </div>
        <button
          style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: 100,
            border: "none",
            // boxShadow: "0.1rem 0.1rem 1rem",
            backgroundColor: "transparent",
            position: "absolute",
            top: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setOpen(false)}
        >
          <IoMdClose size={25} />
        </button>

        <Box
          bottom={0}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow={1}
          padding={2}
          gap={2}
          fontSize={16}
        >
          <Box style={{ display: "flex", gap: 5 }}>
            <button
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: 100,
                border: "none",
                boxShadow: "0.1rem 0.1rem 2px lightGrey",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={lessAmount}
            >
              <IoMdRemove size={20} />
            </button>
            <Box
              fontSize={20}
              style={{
                width: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {amount}
            </Box>
            <button
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: 100,
                border: "none",
                boxShadow: "0.1rem 0.1rem 2px lightGrey",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={addAmount}
            >
              <IoMdAdd size={20} />
            </button>
          </Box>

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disabled={addButton}
            style={{
              textTransform: "initial",
              borderRadius: 100,
              fontSize: 18,
            }}
            onClick={() => AddItemToCart(cartContext, menuItem, amount, options)}
          >
            Them {amount} vao gio hang <LuDot />
            {(props.menuItem.price * amount).toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </Button>
        </Box>
      </SwipeableDrawer>
      {/* </div> */}
    </Box>
  );
};
