"use client";
//Dependencies
import styles from "./navbar.module.css";
//Icons
import {
  FaCartPlus,
  FaMinus,
  FaPlus,
  FaRegMoneyBillAlt,
  FaUserCircle,
} from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { LuRefreshCcw } from "react-icons/lu";
import { MdMenu, MdShoppingCart } from "react-icons/md";

//Navbar component
const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.shopinfo}>
        <div className={styles.logo}>
          <h1>Smart Account</h1>
        </div>
        <span className={styles.burgermenu}>
          <MdMenu size={30} />
        </span>
        <div className={styles.shoptitle}>
          <h1>Patkelghata Builders</h1>
        </div>
        <div className={styles.middleicons}>
          <div className={styles.middleorder1}>
            <MdShoppingCart size={15} />
            <FaRegMoneyBillAlt size={15} />
            <FaCartPlus size={15} />
          </div>
          <div className={styles.middleorder2}>
            <FaCartPlus size={15} />
            <FaRegMoneyBillAlt size={15} />
          </div>
          <div className={styles.middleorder3}>
            <FaPlus size={15} />
            <FaMinus size={15} />
          </div>
        </div>
      </div>

      <div className={styles.rightmenu}>
        <div className={styles.rightmenuicons}>
          <LuRefreshCcw size={20} />
          <IoMdNotifications size={20} />
        </div>

        <span className={styles.usertitle}>
          <h3>Admin</h3>
          <FaUserCircle size={30} />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
