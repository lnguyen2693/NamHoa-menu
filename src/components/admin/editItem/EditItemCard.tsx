import { IdentifiableMenuItem } from "@interfaces/type";
import { Button, Card, IconButton } from "@mui/material";
import { Box, styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

interface menuItemCardProps {
  menuItem: IdentifiableMenuItem;
}

const CustomCard = styled(Card)({
  width: "100%",
  height: "auto",
  position: "relative",
  aspectRatio: 1,
});

export const EditItemCard = (props: menuItemCardProps) => {
  const { menuItem } = props;
  const priceInVnd = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "code",
  })
    .format(menuItem.price)
    .replace("VND", "");

  return (
    <Box>
      <CustomCard>
        <Box
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url("${menuItem.image}")`,
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            style={{
              position: "absolute",
              zIndex: "1",
              top: 8,
              right: 7,
            }}
          >
            <IconButton
              aria-label="delete"
              size="small"
              color="primary"
              style={{
                backgroundColor: "#fae2e4",
                boxShadow: "0.1rem 0.1rem 1rem",
              }}
              // TODO - OnClick delete item
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CustomCard>

      <Box marginTop="8px">
        <Box color={menuItem.available ? "#5DC389" : "#F35362"} fontSize="14px">
          <span>{menuItem.available ? "Còn món" : "Hết món"}</span>
        </Box>
        <Box marginTop="4px" display="flex" flexDirection="column" rowGap="6px">
          <span>{menuItem.name}</span>
          <span style={{ fontWeight: 400 }}>{priceInVnd}đ</span>
        </Box>
      </Box>

      <Button
        variant="outlined"
        color="primary"
        style={{
          textTransform: "initial",
          backgroundColor: "#fae2e4",
          border: 0,
          marginTop: 20,
        }}
      >
        <BorderColorOutlinedIcon /> <Box marginLeft={1}>Sửa món</Box>
      </Button>
    </Box>
  );
};
