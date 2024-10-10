"use client";
// Dependencies
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FaListOl } from "react-icons/fa";
//Internal Dependencies
import Updatecustomer from "@/components/customer/create/createcustomer";
//Customer Edit Page
const CustomerEditPage = () => {
  return (
    <div className="flex flex-col gap-2 p-4 h-screen">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-6 text-2xl font-bold">
              <FaListOl className="mr-2" /> Update Customer Details
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Customer Form</CardTitle>
            <Link href={"/dashboard/customer/"}>
              <Button size="custom" variant="custom">
                Back to list
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Updatecustomer  />
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerEditPage;
