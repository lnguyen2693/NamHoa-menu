import { CartContext } from "@context/CartProvider";
import { OrderItem } from "@interfaces/db";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { FaCircle } from "react-icons/fa";
import { HiMiniPencil } from "react-icons/hi2";
import { formatPriceInVnd } from "utils/string";

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
    <Box display="flex" flexDirection="column" height="fit-content">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingTop="8px"
        color="#000000DE"
      >
        <Box display="flex" columnGap="12px" alignItems="center">
          <Box
            border="solid 1px"
            padding="4px"
            width="24px"
            display="flex"
            justifyContent="center"
            borderRadius={1}
          >
            <Typography color="#2E3A85" fontSize={14} fontWeight={600}>
              {item.amount}x
            </Typography>
          </Box>
          <Typography fontSize={16} fontWeight={500}>
            {item.name}
          </Typography>
        </Box>
        <Typography fontSize={14}>{formatPriceInVnd(item)}</Typography>
      </Box>
      <List dense sx={{ paddingLeft: "52px" }}>
        {Object.entries(item.options).map(([key, val]) =>
          val.map((choice) => (
            <ListItem key={key + choice} color="#00000099" disablePadding>
              <Box display="flex" columnGap="8px" alignItems="center">
                <FaCircle size={4} />
                <ListItemText primary={choice} />
              </Box>
            </ListItem>
          ))
        )}
      </List>
      <Box alignSelf="end" display="flex" columnGap="8px" alignItems="center">
        <Typography fontSize={14}>Chỉnh sửa</Typography>
        <HiMiniPencil size={16} color="#2E3A85" />
      </Box>
    </Box>
    // <Box
    //   display="flex"
    //   flexDirection="column"
    //   gap={1}
    //   padding={2}
    //   margin={0.5}
    //   borderRadius={1}
    //   boxShadow={1}
    //   sx={{ backgroundColor: "white" }}
    // >
    //   <Box display="flex" justifyContent="space-between">
    //     <Box>
    //       <Box sx={{ fontWeight: "medium" }}>{item.name}</Box>
    //       <Box paddingLeft={1}>
    //         {Object.entries(item.options).map(([key, val]) =>
    //           val.map((choice) => (
    //             <Box key={key + choice} fontWeight="light">
    //               {" "}
    //               - {choice}
    //             </Box>
    //           ))
    //         )}
    //       </Box>
    //     </Box>
    //     <Box>
    //       {(item.price * item.amount).toLocaleString("en-US", {
    //         style: "currency",
    //         currency: "VND",
    //       })}
    //     </Box>
    //   </Box>
    //   <Box display="flex" justifyContent="space-between">
    //     <Button
    //       color="secondary"
    //       size="small"
    //       sx={{ textTransform: "initial" }}
    //     >
    //       Chỉnh sửa
    //     </Button>
    //     <Box display="flex" alignItems="center" gap={0.5}>
    //       {/* + / {item.amount} / - */}
    //       {/* <Box> + </Box> */}
    //       <button
    //         style={{
    //           width: "2rem",
    //           height: "2rem",
    //           borderRadius: 100,
    //           border: "none",
    //           boxShadow: "0.1rem 0.1rem 2px lightGrey",
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //         }}
    //         onClick={handleRemoveOneItem}
    //       >
    //         <IoMdRemove size={15} />
    //       </button>
    //       <Box
    //         fontSize={18}
    //         style={{
    //           width: "2rem",
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //         }}
    //       >
    //         {item.amount}
    //       </Box>
    //       <button
    //         style={{
    //           width: "2rem",
    //           height: "2rem",
    //           borderRadius: 100,
    //           border: "none",
    //           boxShadow: "0.1rem 0.1rem 2px lightGrey",
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //         }}
    //         onClick={handleAddOneItem}
    //       >
    //         <IoMdAdd size={15} />
    //       </button>
    //       {/* <Box> - </Box> */}
    //     </Box>
    //   </Box>
    // </Box>
  );
};

export default ItemInCart;
