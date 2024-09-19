"use client";
// Dependencies
import { useState } from "react";
import MenuLink from "./menuLink/menuLink";
// Menu Icons
import {
  FaBitcoin,
  FaBook,
  FaCartPlus,
  FaListOl,
  FaPlus,
  FaProductHunt,
  FaRegMoneyBillAlt,
  FaTruck,
  FaUser,
} from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import {
  MdDashboard,
  MdEmail,
  MdOutlineArrowRight,
  MdOutlineCalendarMonth,
  MdOutlineFileUpload,
  MdOutlineHolidayVillage,
  MdOutlineSettingsSuggest,
  MdPeople,
  MdSettings,
  MdShoppingCart,
} from "react-icons/md";
import { TiArrowLoop } from "react-icons/ti";
// Sidebar Menu items
const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icons: <MdDashboard />,
  },
  {
    title: "Quotations",
    icons: <FaListOl />,
    dropdown: [
      {
        title: "Manage Quotations",
        path: "/dashboard/quotations",
        icons: <FaListOl />,
      },
      {
        title: "Add Quotations",
        path: "/dashboard/quotations/add",
        icons: <FaPlus />,
      },
    ],
    Arrow: <MdOutlineArrowRight />,
  },
  {
    title: "Sales",
    icons: <MdShoppingCart />,
    dropdown: [
      {
        title: "New Sale",
        path: "/dashboard/sales/add",
        icons: <FaPlus />,
      },
      {
        title: "Sales List",
        path: "/dashboard/sales",
        icons: <FaListOl />,
      },
      {
        title: "Collection",
        path: "/dashboard/sales/due",
        icons: <FaRegMoneyBillAlt />,
      },
      {
        title: "Package Sale",
        path: "/dashboard/sales/package",
        icons: <FaPlus />,
      },
      {
        title: "Sales Return",
        path: "/dashboard/sales/return",
        icons: <TiArrowLoop />,
      },
    ],
    Arrow: <MdOutlineArrowRight />,
  },
  {
    title: "Purchase",
    icons: <FaCartPlus />,
    dropdown: [
      {
        title: "Purchase List",
        path: "/dashboard/purchase",
        icons: <FaListOl />,
      },
      {
        title: "Indidual Purchase",
        path: "/dashboard/purchase/add",
        icons: <FaPlus />,
      },
      {
        title: "Supplier Wise Purchase",
        path: "/dashboard/purchase/swp-create",
        icons: <FaPlus />,
      },
      {
        title: "Bulk Purchase",
        path: "/dashboard/purchase/bulk-create",
        icons: <FaPlus />,
      },
      {
        title: "Payment",
        path: "/dashboard/purchase/payment",
        icons: <FaRegMoneyBillAlt />,
      },
      {
        title: "Purchase Return",
        path: "/dashboard/purchase/return",
        icons: <FaPlus />,
      },
      {
        title: "Purchase Return Received",
        path: "/dashboard/purchase/rtn-received",
        icons: <FaPlus />,
      },
    ],
    Arrow: <MdOutlineArrowRight />,
  },
  {
    title: "General Accounts",
    icons: <FaRegMoneyBillAlt />,
    dropdown: [
      {
        title: "Accounts",
        path: "/dashboard/general/accounts",
        icons: <FaListOl />,
      },
      {
        title: "GI Accounts ",
        path: "/dashboard/general/accounts-gi",
        icons: <FaListOl />,
      },
      {
        title: "Chart of Accounts",
        path: "/dashboard/general/accounts-chart",
        icons: <FaListOl />,
      },
      {
        title: "Company Assets",
        path: "/dashboard/general/accounts-assets",
        icons: <FaListOl />,
      },
      {
        title: "Company Liablity",
        path: "/dashboard/general/accounts-liablity",
        icons: <FaListOl />,
      },
      {
        title: "Parties",
        path: "/dashboard/general/accounts-parties",
        icons: <FaListOl />,
      },
      {
        title: "Debit Voucher(Expense)",
        path: "/dashboard/general/accounts-debitvoucher",
        icons: <FaPlus />,
      },
      {
        title: "Credit Voucher(Income)",
        path: "/dashboard/general/accounts-creditvoucher",
        icons: <FaPlus />,
      },
      {
        title: "Add Assets",
        path: "/dashboard/general/accounts-addassets",
        icons: <FaPlus />,
      },
      {
        title: "Add Liablity",
        path: "/dashboard/general/accounts-addliablity",
        icons: <FaPlus />,
      },
      {
        title: "Fund Transfer",
        path: "/dashboard/general/accounts-transfer",
        icons: <FaPlus />,
      },
    ],
    Arrow: <MdOutlineArrowRight />,
  },
  {
    title: "Payroll",
    icons: <FaBitcoin />,
    dropdown: [
      {
        title: "Payroll Setup",
        path: "/dashboard/payroll/setup",
        icons: <FaRegMoneyBillAlt />,
      },
      {
        title: "Employees",
        path: "/dashboard/payroll/employees",
        icons: <IoPeople />,
      },
      {
        title: "Attendance",
        path: "/dashboard/payroll/attendance",
        icons: <IoPeople />,
      },
      {
        title: "Holiday",
        path: "/dashboard/payroll/holiday",
        icons: <MdOutlineHolidayVillage />,
      },
      {
        title: "Advance",
        path: "/dashboard/payroll/advance",
        icons: <FaRegMoneyBillAlt />,
      },
      {
        title: "Salary Generate",
        path: "/dashboard/payroll/generate",
        icons: <FaRegMoneyBillAlt />,
      },
      {
        title: "Salary List",
        path: "/dashboard/payroll",
        icons: <FaRegMoneyBillAlt />,
      },
    ],
    Arrow: <MdOutlineArrowRight />,
  },
  {
    title: "Product",
    icons: <FaProductHunt />,
    dropdown: [
      {
        title: "Product List",
        path: "/dashboard/product",
        icons: <FaListOl />,
      },
      {
        title: "Add",
        path: "/dashboard/product/add",
        icons: <FaPlus />,
      },
      {
        title: "Upload Product by CSV",
        path: "/dashboard/product/create-csv",
        icons: <MdOutlineFileUpload />,
      },
      {
        title: "Manage Unit",
        path: "/dashboard/product/unit",
        icons: <FaListOl />,
      },
      {
        title: "Manage Brand",
        path: "/dashboard/product/brand",
        icons: <FaListOl />,
      },
      {
        title: "Manage Category",
        path: "/dashboard/product/category",
        icons: <FaListOl />,
      },
      {
        title: "Manage Sub Category",
        path: "/dashboard/product/subcategory",
        icons: <FaListOl />,
      },
      {
        title: "Manage Warehouse",
        path: "/dashboard/product/warehouse",
        icons: <FaListOl />,
      },

      {
        title: "Manage Barcode",
        path: "/dashboard/product/barcode",
        icons: <FaListOl />,
      },
      {
        title: "Update Price",
        path: "/dashboard/product/update",
        icons: <FaListOl />,
      },
      {
        title: "Prodcut Package",
        path: "/dashboard/product/package",
        icons: <FaListOl />,
      },
      {
        title: "Product Damage",
        path: "/dashboard/product/damage",
        icons: <FaListOl />,
      },
      {
        title: "Customer Product Pricing",
        path: "/dashboard/product/customerpricing",
        icons: <FaListOl />,
      },
    ],
    Arrow: <MdOutlineArrowRight />,
  },
  {
    title: "Stock Transfer",
    icons: <FaTruck />,
    dropdown: [
      {
        title: "Warehouse Transfer",
        path: "/dashboard/warehousetransfer",
        icons: <FaListOl />,
      },
    ],
    Arrow: <MdOutlineArrowRight />,
  },
  {
    title: "Stock Adjustment",
    icons: <FaTruck />,
    dropdown: [
      {
        title: "Manage Stock",
        path: "/dashboard/managestock",
        icons: <FaListOl />,
      },
    ],
    Arrow: <MdOutlineArrowRight />,
  },
  {
    title: "Supplier",
    icons: <FaTruck />,
    dropdown: [
      {
        title: "Manage Supplier",
        path: "/dashboard/supplier",
        icons: <FaListOl />,
      },
      {
        title: "Add Supplier",
        path: "/dashboard/supplier/add",
        icons: <FaPlus />,
      },
      {
        title: "Upload Supplier by CSV",
        path: "/dashboard/supplier/upload",
        icons: <MdOutlineFileUpload />,
      },
    ],
    Arrow: <MdOutlineArrowRight />,
  },
  {
    title: "Customer",
    icons: <MdPeople />,
    dropdown: [
      {
        title: "Manage Customer",
        path: "/dashboard/customer",
        icons: <FaListOl />,
      },
      {
        title: "Add Customer",
        path: "/dashboard/customer/add",
        icons: <FaPlus />,
      },
      {
        title: "Upload Customer by CSV",
        path: "/dashboard/customer/upload",
        icons: <MdOutlineFileUpload />,
      },
      {
        title: "Customer Category",
        path: "/dashboard/customer/category",
        icons: <MdOutlineSettingsSuggest />,
      },
    ],
    Arrow: <MdOutlineArrowRight />,
  },
  {
    title: "Reports",
    icons: <FaBook />,
    dropdown: [
      {
        title: "All Reports",
        path: "/dashboard/reports",
        icons: <FaBook />,
      },
      {
        title: "Today's Report",
        path: "/dashboard/reports/today",
        icons: <MdOutlineCalendarMonth />,
      },
      {
        title: "Weekly Report",
        path: "/dashboard/reports/week",
        icons: <MdOutlineCalendarMonth />,
      },
      {
        title: "Monthly Report",
        path: "/dashboard/reports/monthly",
        icons: <MdOutlineCalendarMonth />,
      },
    ],
    Arrow: <MdOutlineArrowRight />,
  },
  {
    title: "Settings",
    icons: <MdSettings />,
    dropdown: [
      {
        title: "Software Settings",
        path: "/dashboard/settings",
        icons: <FaListOl />,
      },
      {
        title: "Manage Companies",
        path: "/dashboard/settings/managecompanies",
        icons: <FaListOl />,
      },
      {
        title: "SMS Apis",
        path: "/dashboard/settings/smsapis",
        icons: <FaListOl />,
      },
      {
        title: "Make Group",
        path: "/dashboard/settings/makegroup",
        icons: <FaListOl />,
      },
      {
        title: "Junk Clean",
        path: "/dashboard/settings/junk",
        icons: <LuRefreshCcw />,
      },
    ],
    Arrow: <MdOutlineArrowRight />,
  },
  {
    title: "Send Sms",
    icons: <MdEmail />,
    dropdown: [
      {
        title: "Send Sms",
        path: "/dashboard/sendsms",
        icons: <FaPlus />,
      },
    ],
    Arrow: <MdOutlineArrowRight />,
  },
  {
    title: "User",
    icons: <FaUser />,
    dropdown: [
      {
        title: "Manage User",
        path: "/dashboard/user",
        icons: <FaListOl />,
      },
      {
        title: "User Roles",
        path: "/dashboard/user/roles",
        icons: <FaListOl />,
      },
    ],
    Arrow: <MdOutlineArrowRight />,
  },
];

// Main Sidebar function
const Sidebar = ({ isCollapsed }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (title) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  return (
    <div className="bg-white text-black h-full overflow-y-auto">
      <ul className="p-2 space-y-2">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <div
              className="font-semibold flex justify-start items-center gap-4 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-400 hover:text-white"
              onClick={() => toggleDropdown(cat.title)}
            >
              <span className="text-xl">{cat.icons}</span>
              {!isCollapsed && (
                <MenuLink path={cat.path || "#"}>{cat.title}</MenuLink>
              )}
              <span className="ml-auto">{cat.Arrow}</span>
            </div>
            {cat.dropdown && openDropdown === cat.title && (
              <ul className="pl-8 space-y-2">
                {cat.dropdown.map((item) => (
                  <li
                    key={item.title}
                    className="flex justify-start items-center gap-4 py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-400 hover:text-white"
                  >
                    <span className="text-sm">{item.icons}</span>
                    {!isCollapsed && (
                      <MenuLink path={item.path}>{item.title}</MenuLink>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
