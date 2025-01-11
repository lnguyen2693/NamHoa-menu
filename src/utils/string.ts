import { MenuItem, OrderItem } from "@interfaces/db";

export const formatPriceInVnd = (item: MenuItem | OrderItem) => {
  const priceInVnd = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "code",
  })
    .format(item.price)
    .replace("VND", "");
  return priceInVnd + "đ";
};
