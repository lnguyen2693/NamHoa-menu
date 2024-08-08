import React from "react";
import { Hidden, SwipeableDrawer } from "@mui/material";
import { Global } from "@emotion/react";
import { blue, pink } from "@mui/material/colors";
import { IoMdClose } from "react-icons/io";
import { IdentifiableMenuItem } from "@interfaces/type";
import { TbCurrencyDong } from "react-icons/tb";
import { height, width } from "@mui/system";
import { SingleChoice } from "./itemOptions/SingleChoice";

// /app/page.tsx -> /
// /app/menu/page.tsx -> /menu

// /app/[restaurant] -> /app/nam-hoa, /app/hello-world

interface menuItemDrawerProps {
  menuItem: IdentifiableMenuItem;
}

export const MenuItemDrawer = (props: menuItemDrawerProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState({});

  // let { [key: string] : any } = props.menuItem.options
  let options = [];
  for (const opt in props.menuItem.options) {
    console.log(props.menuItem.options[opt]);
    options.push(opt);
  }

  // console.log("haha", Object.entries(props.menuItem.options));

  return (
    <div style={{ position: "absolute", zIndex: "1", bottom: 8, right: 7 }}>
      <button
        style={{
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: 100,
          border: "none",
          boxShadow: "0.1rem 0.1rem 1rem",
        }}
        onClick={() => setOpen(true)}
      >
        aa
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
            width: "full",
            height: "full",
            // backgroundColor: pink[50],
            padding: 13,
          }}
        >
          <div style={{ fontSize: "2rem" }}>{props.menuItem.name}</div>
          <div>
            {props.menuItem.price}
            {/* {(63200).toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })} */}
            <TbCurrencyDong />
          </div>

          <div style={{ display: "flexbox" }}>
            {Object.keys(props.menuItem.options).map((key) => (
              <SingleChoice keyItem={key} option={props.menuItem.options[key]} />
            ))}
            {/* {Object.entries(props.menuItem.options).map((option) =>
              option[1].multipleChoice ? (
                <div>multiple choice</div>
              ) : (
                <div>
                  <SingleChoice option={option}></SingleChoice>
                </div>
              )
            )} */}
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
          }}
          onClick={() => setOpen(false)}
        >
          <IoMdClose size={25} />
        </button>
      </SwipeableDrawer>
      {/* </div> */}
    </div>
  );
};
