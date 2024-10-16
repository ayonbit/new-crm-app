"use client";
// Dependencies

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
// Internal Import
import CreateCustomer from "@/components/customer/create/CreateCustomer";
// Customer Create Form
const CustomerAddPage = () => {
  return (
    <div className="m-2 h-screen">
      <Card className="p-6 pr-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Add New Customer</h1>
          <Link href={"/dashboard/customer"}>
            <Button variant="custom" className="flex items-center space-x-2">
              <FaEye size={16} />
              <span>View Customer</span>
            </Button>
          </Link>
        </div>
        <hr className="mb-4" />
        <CreateCustomer />
      </Card>
    </div>
  );
};

export default CustomerAddPage;
