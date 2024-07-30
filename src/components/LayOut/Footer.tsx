import { Card, CardMedia } from "@mui/material";
import { theme } from "../../../theme";
import { HiMapPin } from "react-icons/hi2";
import { MdPhoneIphone } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <Card style={{ padding: "10px" }}>
        {/* <div style={{ padding: "10px" }}> */}
        {/* <Card> */}
        <CardMedia
          component="img"
          image="/nam-hoa-footer-img.png"
          title="Nam Hoa footer image"
        />
        <div
          style={{
            color: theme.palette.primary.main,
            marginTop: "1.5rem",
            marginBottom: "1.5rem",
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          Chúc bạn có một bữa ăn ngon miệng!
        </div>

        <div style={{ marginInline: "1rem" }}>
          <div
            style={{
              display: "flex",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <HiMapPin
              style={{
                color: theme.palette.primary.dark,
                marginRight: "1rem",
              }}
            />
            <div style={{ fontSize: "0.8rem" }}>
              74 Nguyen Co Thach Street, An Loi Dong Ward, Thu Duc City{" "}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <MdPhoneIphone
              style={{
                color: theme.palette.primary.dark,
                marginRight: "1rem",
              }}
            />

            <div style={{ fontSize: "0.8rem" }}>0964 777 803</div>
          </div>
        </div>
        {/* </Card> */}
        {/* </div> */}
      </Card>
    </>
  );
};

export default Footer;
