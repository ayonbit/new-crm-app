"use client";
//Dependencies
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaListOl } from "react-icons/fa";

//Internal Dependencies
import { fetchSingleSupplier } from "@/lib/FetchHandler/CreateSupFetch";

//Supplier View Page
const SupplierViewPage = () => {
  const { id } = useParams();
  const [supplierData, setSupplierData] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the supplier data based on the ID
      fetchSingleSupplier(id)
        .then((data) => setSupplierData(data))
        .catch((error) =>
          console.error("Error fetching supplier data:", error)
        );
    }
  }, [id]);
  if (!supplierData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 h-screen">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-6 text-2xl font-bold">
              <FaListOl className="mr-2" /> View Supplier Details
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Supplier Table</CardTitle>
            <Link href={"/dashboard/supplier/"}>
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
                  Supplier Code
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {supplierData.companyCode}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Name
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {supplierData.supplierName}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Company Name
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {supplierData.companyName}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Email
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {supplierData.companyEmail}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Phone
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {supplierData.companyPhone}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Address
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {supplierData.companyAddress}
                </TableCell>
              </TableRow>

              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Balance {/* opening balance */}
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {supplierData.openingBalance}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Update Date
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {new Date(supplierData.updatedAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierViewPage;
