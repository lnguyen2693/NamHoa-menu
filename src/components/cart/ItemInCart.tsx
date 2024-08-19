import { CartContext } from "@context/CartProvider";
import { OrderItem } from "@interfaces/db";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

interface ItemInCartProps {
  item: OrderItem;
}

const ItemInCart = (props: ItemInCartProps) => {
  const { item } = props;
  const cartContext = React.useContext(CartContext);

  const handleAddOneItem = () => {
    cartContext.addOne(item);
  };

  const handleRemoveOneItem = () => {
    cartContext.removeItem(item);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      padding={2}
      margin={0.5}
      borderRadius={1}
      boxShadow={1}
      sx={{ backgroundColor: "white" }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Box sx={{ fontWeight: "medium" }}>{item.name}</Box>
          <Box paddingLeft={1}>
            {Object.entries(item.options).map(([key, val]) =>
              val.map((choice) => (
                <Box key={key + choice} fontWeight="light">
                  {" "}
                  - {choice}
                </Box>
              ))
            )}
          </Box>
        </Box>
        <Box>
          {(item.price * item.amount).toLocaleString("en-US", {
            style: "currency",
            currency: "VND",
          })}
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button
          color="secondary"
          size="small"
          sx={{ textTransform: "initial" }}
        >
          Chỉnh sửa
        </Button>
        <Box display="flex" alignItems="center" gap={0.5}>
          {/* + / {item.amount} / - */}
          {/* <Box> + </Box> */}
          <button
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: 100,
              border: "none",
              boxShadow: "0.1rem 0.1rem 2px lightGrey",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleRemoveOneItem}
          >
            <IoMdRemove size={15} />
          </button>
          <Box
            fontSize={18}
            style={{
              width: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.amount}
          </Box>
          <button
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: 100,
              border: "none",
              boxShadow: "0.1rem 0.1rem 2px lightGrey",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleAddOneItem}
          >
            <IoMdAdd size={15} />
          </button>
          {/* <Box> - </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemInCart;
