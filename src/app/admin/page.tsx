"use client";

import { MenuBoard } from "@components/menu/board/MenuBoard";
import { Button, CardMedia, Paper } from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { EditMenuBoard } from "@components/menu/board/EditMenuBoard";
import { Footer } from "@components/LayOut";
import AddIcon from "@mui/icons-material/Add";

export default function AdminMenu() {
  const [editing, setEditing] = React.useState(false);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // overflow: "hidden",
          padding: "10px 10px",
          rowGap: "10rem",
        }}
      >
        <Box>
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
              {editing ? (
                <Button
                  variant="outlined"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textTransform: "initial",
                    padding: 3,
                    rowGap: 0.5
                  }}
                  style={{ borderStyle: "dashed" }}
                  fullWidth
                >
                  <AddIcon /> <Box fontSize={16}>Thêm món ăn</Box>
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  style={{ textTransform: "initial" }}
                  // temporarily for testing other functionality
                  onClick={() => setEditing(true)}
                >
                  <EditIcon /> Chỉnh sửa thực đơn
                </Button>
              )}
            </Box>
          </Box>
          {editing ? <EditMenuBoard /> : <MenuBoard />}
          {/* <Paper sx={{ position: "fixed", bottom: 0, width: '100vw', zIndex: 2}}>
          <Box>
            <Button>Lưu</Button>
            <Button>Huỷ</Button>
          </Box>
        </Paper> */}
        </Box>

        <Footer />
      </Box>

      <Paper
        elevation={3}
        sx={{ position: "fixed", bottom: 0, width: "100vw", zIndex: 2 }}
      >
        {editing ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "stretch",
              padding: 1,
              columnGap: 2,
              paddingLeft: 2,
              paddingRight: 2,
              
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{
                textTransform: "initial",
                borderRadius: 30,
                flexGrow: 1,
                padding: 1,
                fontSize: 16
              }}
              // TODO(lnguye2693) - onClick change menu on Firebase
              onClick={() => setEditing(false)}
              
            >
              Lưu
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{
                backgroundColor: "#E5E5E5",
                textTransform: "initial",
                border: 0,
                borderRadius: 30,
                flexGrow: 1,
                padding: 1,
                fontSize: 16
              }}
              onClick={() => setEditing(false)}
            >
              Huỷ
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </Paper>
    </>
  );
}
