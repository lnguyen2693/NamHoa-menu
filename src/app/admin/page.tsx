"use client";

import { MenuBoard } from "@components/menu/board/MenuBoard";
import { Button, CardMedia } from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { EditMenuBoard } from "@components/menu/board/EditMenuBoard";

export default function AdminMenu() {
  const [editing, setEditing] = React.useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // overflow: "hidden",
        padding: "10px 10px",
        // rowGap: "10rem",
      }}
    >
      <Box
        position="fixed"
        top={0}
        left={0}
        height={50}
        width={1}
        zIndex={100}
        style={{ backgroundColor: "white" }}
        display={"flex"}
        // justifyContent="space-between"
        alignItems="center"
        alignSelf="center"
      >
        <Box marginLeft={2} fontSize={20}>
          Trang chủ
        </Box>
        {/* <Button style={{ marginRight: 2 }} color="secondary">
          <IoMdSearch size={23} />
        </Button> */}
      </Box>
      <Box>
        <CardMedia
          style={{ marginTop: 45 }}
          component="img"
          image="/nam-hoa-header-img.png"
          title="Nam Hoa header image"
        />
        <Box paddingTop={1.5} paddingBottom={1.5}>
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            style={{ textTransform: "initial" }}

            // temporarily for testing other functionality
            onClick={() => setEditing(!editing)}
          >
            <EditIcon /> Chỉnh sửa thực đơn
          </Button>
        </Box>
      </Box>
      {editing ? <EditMenuBoard /> : <MenuBoard />}
    </Box>
  );
}
