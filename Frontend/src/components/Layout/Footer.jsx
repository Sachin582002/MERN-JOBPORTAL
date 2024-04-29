import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Sachin Kunwar.</div>
      <div>
        <Link to={"https://www.youtube.com/channel/UCVpnbYRM9i60j0zHGg14FtQ"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://www.youtube.com/@CodeWithZeeshu"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"https://www.youtube.com/@CodeWithZeeshu"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/z_4_zeeshuuu/"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;