import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Drawer,
  List,
  ListItem,
  ListItemPrefix,
  Navbar,
} from "@material-tailwind/react";
import carrotIcon from "../../../public/icons/carrot.svg";
import hamburgerIcon from "../../../public/icons/hamburger.svg";
import rightIcon from "../../../public/icons/right.svg";
import downIcon from "../../../public/icons/down.svg";
import { AuthContext } from "../../contexts/AuthContext";

const CustomNavBar = () => {
  const { authName } = useContext(AuthContext);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openList, setOpenList] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Navbar
      className="sticky top-0 z-10 h-max rounded-none py-4 px-5 flex justify-between"
      fullWidth={true}
      color="orange"
    >
      <Link to="/">
        <div className="flex gap-3 items-center">
          <img src={carrotIcon} alt="carrot" />
          <p className="font-semibold text-2xl">경기마켓</p>
        </div>
      </Link>

      <img
        src={hamburgerIcon}
        alt="menu"
        className="cursor-pointer"
        onClick={handleOpen}
      />
      <Drawer
        placement="right"
        open={open}
        onClose={handleOpen}
        className="section-margin pt-16"
      >
        <div className="flex items-center justify-between p-4">
          <p className="pl-1 text-black">
            {authName ? (
              `반가워요! ${authName}님`
            ) : (
              <button onClick={() => navigate("/login")}>
                <span className="text-orange-800">로그인 </span>후 이용해주세요!
              </button>
            )}
          </p>

          <div className="flex cursor-pointer items-center justify-center gap-2"></div>
        </div>
        <List>
          <Link to="/goodslist">
            <ListItem
              className="flex justify-between items-center"
              onClick={() => navigate("/")}
            >
              <p>중고거래</p>
              <img src={rightIcon} alt="right" />
            </ListItem>
          </Link>

          <Link to="/event">
            <ListItem
              className="flex justify-between items-center"
              onClick={() => navigate("/")}
            >
              <p>이벤트</p>
              <img src={rightIcon} alt="right" />
            </ListItem>
          </Link>

          <Accordion
            open={openList}
            icon={
              <img
                src={downIcon}
                className={`mx-auto transition-transform  ${
                  openList ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0">
              <AccordionHeader
                onClick={() => setOpenList(!openList)}
                className="border-b-0 p-3"
              >
                <p className="text-sm font-medium">마이페이지</p>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1 pl-1">
              <List className="p-0">
                <Link to="/mypage">
                  <ListItem>
                    <p className="text-sm">내 정보</p>
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
        </List>
      </Drawer>
    </Navbar>
  );
};

CustomNavBar.propTypes = {
  name: PropTypes.string,
};

export default CustomNavBar;
