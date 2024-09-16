"use client";
// Dependencies
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

// Navbar component
const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-2.5 px-5">
      <div className="flex gap-20">
        <div className="text-xl text-slate-300 font-bold italic">
          <h1>Smart Account</h1>
        </div>
        <span className="cursor-pointer">
          <MdMenu size={30} />
        </span>
        <div className="text-white font-semibold text-2xl uppercase">
          <h1>Patkelghata Builders</h1>
        </div>
        <div className="flex gap-5 text-white justify-center items-center">
          <div className="flex gap-2">
            <MdShoppingCart size={15} />
            <FaRegMoneyBillAlt size={15} />
            <FaCartPlus size={15} />
          </div>
          <div className="flex gap-2">
            <FaCartPlus size={15} />
            <FaRegMoneyBillAlt size={15} />
          </div>
          <div className="flex gap-2">
            <FaPlus size={15} />
            <FaMinus size={15} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex gap-5">
          <LuRefreshCcw size={20} />
          <IoMdNotifications size={20} />
        </div>

        <span className="flex gap-5 items-center">
          <h3 className="text-white text-sm">Admin</h3>
          <FaUserCircle size={30} />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
