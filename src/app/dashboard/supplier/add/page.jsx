"use client";
// Dependencies
import Createsupplier from "@/components/customer/create/createsupplier";
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
          <h1 className="text-2xl font-bold">Add New Supplier</h1>
          <Button
            variant="custom"
            className="flex items-center space-x-2"
            onClick={handleViewCustomer}
          >
            <FaEye size={16} />
            <span>Supplier List</span>
          </Button>
        </div>
        <hr className="mb-4" />
        <Createsupplier />
      </Card>
    </div>
  );
};

export default CustomerAddPage;
