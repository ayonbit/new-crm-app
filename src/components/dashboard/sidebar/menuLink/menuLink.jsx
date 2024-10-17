"use client";
// Dependencies
import Link from "next/link";

const MenuLink = ({ path, children }) => {
  // Determine if the path is for the dashboard or other
  //const isDashboard = path === "/dashboard";

  return <Link href={path}>{children}</Link>;
};

export default MenuLink;
