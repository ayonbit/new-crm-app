"use client";
// Dependencies
import Createcustomer from "@/components/customer/create/createcustomer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
// Internal Import
import { CreateCustomerHandler } from "@/lib/ActionHandler/customercreate";

// Customer Create Form
const CustomerAddPage = () => {
  const handleSubmit = async (data, reset) => {
    try {
      const result = await CreateCustomerHandler(data);
      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message || "Failed to create customer");
      }
    } catch (error) {
      console.error("Error creating customer:", error.message);
      toast.error("Failed to create customer");
    }
  };

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
        <Createcustomer onSubmit={handleSubmit} />
      </Card>
    </div>
  );
};

export default CustomerAddPage;
