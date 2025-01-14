import React from "react";
import { Button, Divider, SwipeableDrawer, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { IdentifiableMenuItem } from "@interfaces/type";
import { Box, Stack } from "@mui/system";
import { SingleChoice } from "./itemOptions/SingleChoice";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { MultipleChoice } from "./itemOptions/MultipleChoice";
import { LuDot } from "react-icons/lu";
import { addItemToCart } from "utils/Order";
import { CartContext } from "@context/CartProvider";
import { useSearchParams } from "next/navigation";
import { formatPriceInVnd } from "utils/string";

interface menuItemDrawerProps {
  menuItem: IdentifiableMenuItem;
}

export const MenuItemDrawer = (props: menuItemDrawerProps) => {
  const searchParams = useSearchParams();
  const table = searchParams.get("table");

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

  const handleAddItem = () => {
    addItemToCart(cartContext, menuItem, amount, options);
    resetItem();
  };

  const resetItem = () => {
    setAmount(0);
    setOptions({});
    setOpen(false);
  };

  const requirement = Object.keys(menuItem.options).filter(
    (key) => menuItem.options[key].required
  );

  React.useEffect(() => {
    const unsatisfied = requirement.filter(
      (key) => options[key] == undefined || options[key].length === 0
    );
    setAddButton(unsatisfied.length !== 0 || amount === 0 || table === null);
  }, [amount, options, requirement, table]);

  return (
    <Box
      style={{
        position: "absolute",
        zIndex: "1",
        bottom: 8,
        right: 7,
      }}
    >
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
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => {
          setOpen(false);
          resetItem();
        }}
        onOpen={() => setOpen(true)}
      >
        <Box height="fit" minHeight="90vh" maxHeight="90vh" overflow="scroll">
          <Box
            style={{
              width: "100vw",
              height: "25vh",
              backgroundImage: `url("${props.menuItem.image}")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <Box height="100%" marginTop="16px" marginX="17px">
            <Typography
              variant="h4"
              color="#000000DE"
              fontWeight={700}
              fontSize={34}
            >
              {menuItem.name}
            </Typography>
            <Typography color="#000000DE" fontWeight={400} marginTop="8px">
              {formatPriceInVnd(menuItem)}
            </Typography>
            <Box sx={{ paddingBottom: 20 }}>
              <Stack
                marginTop="16px"
                direction="column"
                spacing="16px"
                divider={<Divider color="#D4D4D4" orientation="horizontal" />}
              >
                {Object.keys(props.menuItem.options)
                  .sort((a, b) => a.localeCompare(b))
                  .map((key) =>
                    props.menuItem.options[key].multipleChoice ? (
                      <MultipleChoice
                        key={key}
                        keyItem={key}
                        option={props.menuItem.options[key]}
                        allOptions={options}
                        addOptions={addOptions}
                      />
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
              </Stack>
            </Box>
          </Box>
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
              zIndex: 100,
            }}
            onClick={() => {
              setAmount(0);
              setOptions({});
              setOpen(false);
            }}
          >
            <IoMdClose size={25} color="#0000008F" />
          </button>

          <Box
            bottom={0}
            right={0}
            left={0}
            position="fixed"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            boxShadow={3}
            padding={2}
            gap={2}
            fontSize={16}
            sx={{ bgcolor: "white" }}
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
              sx={{ boxShadow: 6, paddingY: "12px" }}
              style={{
                textTransform: "initial",
                borderRadius: 100,
              }}
              onClick={() => handleAddItem()}
            >
              <Typography display="flex" fontSize={14} fontWeight={500}>
                Thêm {amount} vào giỏ hàng{" "}
                <LuDot style={{ alignSelf: "end" }} />{" "}
                {formatPriceInVnd(menuItem)}
              </Typography>
            </Button>
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};
