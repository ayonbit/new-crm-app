"use client";
//Dpeendencies
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaListOl } from "react-icons/fa";

//Internal Dependencies
import { fetchSingleCustomer } from "@/lib/FetchHandler/createcustfetch";

//Customer View Page
const CustomerViewPage = () => {
  const { id } = useParams();
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the customer data based on the ID
      fetchSingleCustomer(id)
        .then((data) => setCustomerData(data))
        .catch((error) =>
          console.error("Error fetching customer data:", error)
        );
    }
  }, [id]);
  if (!customerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 h-screen">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-6 text-2xl font-bold">
              <FaListOl className="mr-2" /> View Customer Details
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Customer Table</CardTitle>
            <Link href={"/dashboard/customer/"}>
              <Button size="custom" variant="custom">
                Back to list
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="w- divide-y border border-gray-300 rounded-lg shadow-lg">
            <TableBody>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Customer Code
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {customerData.customerCode}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Name
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {customerData.name}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Email
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {customerData.email}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Phone
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {customerData.phone}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Address
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {customerData.address}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Category
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {customerData.category}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Balance {/* opening balance */}
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {customerData.openingBalance}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Due Limit
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {customerData.dueLimit}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Status
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {customerData.Status}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Default
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {customerData.setDefault}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Update Date
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {new Date(customerData.updatedAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerViewPage;
