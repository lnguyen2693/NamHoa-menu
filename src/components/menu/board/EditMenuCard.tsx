import { IdentifiableMenuItems } from "@interfaces/type";
import { Grid } from "@mui/material";
import { EditItemCard } from "../item/EditItemCard";

interface MenuCardProps {
  items: IdentifiableMenuItems;
}

export const EditMenuCard = (props: MenuCardProps) => {
  const { items } = props;
  return (
    <div style={{ width: "full" }}>
      <Grid container spacing={2} alignItems="center">
        {items.map((item) => (
          <Grid item key={item.id} xs={6} sm={4} md={2}>
            <EditItemCard key={item.id} menuItem={item}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
