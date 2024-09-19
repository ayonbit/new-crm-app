"use client";
// Dependencies
import Createcustomer from "@/components/customer/create/createcustomer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
// Customer Create Form
const CustomerAddPage = () => {
  const router = useRouter();
  const handleViewCustomer = () => {
    router.push("/dashboard/customer");
  };
  return (
    <div className="m-2 h-screen">
      <Card className="p-6 pr-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Add New Customer</h1>
          <Button
            variant="custom"
            className="flex items-center space-x-2"
            onClick={handleViewCustomer}
          >
            <FaEye size={16} />
            <span>View Customer</span>
          </Button>
        </div>
        <hr className="mb-4" />
        <Createcustomer />
      </Card>
    </div>
  );
};

export default CustomerAddPage;
