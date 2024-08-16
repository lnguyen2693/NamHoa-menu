import { OrderItem } from "@interfaces/db";
import { Box } from "@mui/system";

interface ItemInCartProps {
  item: OrderItem;
}

const ItemInCart = (props: ItemInCartProps) => {
  const { item } = props;
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      padding={2}
      margin={0.5}
      borderRadius={1}
      boxShadow={1}
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
        <Box>del/edit</Box>
        <Box>+ / amount / -</Box>
      </Box>
    </Box>
  );
};

export default ItemInCart;
