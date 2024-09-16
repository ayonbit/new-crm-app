"use client";
// Dependencies

import Navbar from "@/components/dashboard/navbar/navbar";
import Sidebar from "@/components/dashboard/sidebar/sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full h-12 bg-[#2a65b4] text-white fixed top-0 left-0 z-50">
        <Navbar />
      </div>
      <div className="flex flex-1 mt-12">
        <div className="fixed top-12 left-0 w-72 h-[calc(100vh-3rem)] bg-white text-black overflow-y-auto">
          <Sidebar />
        </div>
        <div className="ml-72 flex-1 ">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
