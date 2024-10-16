"use client";
// Dependencies
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FaListOl } from "react-icons/fa";
//Internal Dependencies
import UpdateSupplier from "@/components/supplier/create/UpdateSupplier";
//Customer Edit Page
const SupplierEditPage = () => {
  return (
    <div className="flex flex-col gap-2 p-4 h-screen">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-6 text-2xl font-bold">
              <FaListOl className="mr-2" /> Update Supplier Details
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Update Supplier</CardTitle>
            <Link href={"/dashboard/supplier/"}>
              <Button size="custom" variant="custom">
                Back to list
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <UpdateSupplier />
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierEditPage;
