"use client";
// Dependencies
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaListOl } from "react-icons/fa";
// Internal Dependencies
import { fetchSingleCustomerCategory } from "@/lib/FetchHandler/cuscatfetch";

import Link from "next/link";

// Single category page view
const SingleCategoryPage = () => {
  const { id} = useParams();
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the category data based on the CategoryName
      fetchSingleCustomerCategory(id)
        .then((data) => setCategoryData(data))
        .catch((error) =>
          console.error("Error fetching category data:", error)
        );
    }
  }, [id]);

  if (!categoryData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 h-screen">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-6 text-2xl font-bold">
              <FaListOl className="mr-2" /> View Customer Category
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Category Table</CardTitle>
            <Link href={"/dashboard/customer/category"}>
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
                  Category Name
                </TableCell>
                <TableCell className=" px-2 py-2">
                  {categoryData.CategoryName || "N/A"}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Description
                </TableCell>
                <TableCell className="px-2 py-2">
                  {categoryData.Description || "N/A"}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Amount
                </TableCell>
                <TableCell className="px-2 py-2">
                  {categoryData.AmountOf || "N/A"}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Amount (%)
                </TableCell>
                <TableCell className="px-2 py-2">
                  {categoryData.Amount || "N/A"}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Type
                </TableCell>
                <TableCell className="px-2 py-2">
                  {categoryData.Type || "N/A"}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-300 hover:bg-gray-100">
                <TableCell className="font-bold text-sm border-r border-gray-300 px-2 py-2 bg-gray-50">
                  Status
                </TableCell>
                <TableCell className="px-2 py-2">
                  {categoryData.Status || "N/A"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleCategoryPage;
