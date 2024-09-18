"use client";
// Dependencies
import AddCustomer from "@/components/customer/category/addcustomer";
import Pagination from "@/components/pagination/pagination";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FaEdit, FaEye, FaListOl, FaTrash } from "react-icons/fa";

// Category data
const CustomerCategoryData = [
  {
    SL: "1",
    CategoryName: "New Customer",
    Description: "This is for new customer",
    AmountOf: "0.00",
    Amount: "0.00",
    Type: "Amount", // or "Percent"
    Status: "Active", // or "Inactive"
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    SL: "2",
    CategoryName: "Wholesale",
    Description: "This is for Wholesale Customer",
    AmountOf: "0.00",
    Amount: "0.00",
    Type: "Percent", // or "Amount"
    Status: "Inactive", // or "Active"
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    SL: "3",
    CategoryName: "Retail",
    Description: "This is for Retail Customer",
    AmountOf: "0.00",
    Amount: "0.00",
    Type: "Amount", // or "Percent"
    Status: "Active", // or "Inactive"
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    SL: "4",
    CategoryName: "Credit Clients",
    Description: "This is for Credit Clients",
    AmountOf: "0.00",
    Amount: "0.00",
    Type: "Percent", // or "Amount"
    Status: "Inactive", // or "Active"
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
];

// Category page
const CustomerCategory = () => {
  return (
    <div className="p-2 h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <FaListOl className="mr-2" /> Customer Category
            </div>
            <AddCustomer />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead>Category Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount Of</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CustomerCategoryData.map((cat, index) => (
                <TableRow className="" key={index}>
                  <TableCell className="text-center">{cat.SL}</TableCell>
                  <TableCell className="text-left ">
                    {cat.CategoryName}
                  </TableCell>
                  <TableCell>{cat.Description}</TableCell>
                  <TableCell className="text-center">{cat.AmountOf}</TableCell>
                  <TableCell className="text-center">{cat.Amount}</TableCell>
                  <TableCell className="text-left">{cat.Type}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`${
                        cat.Status === "Active"
                          ? "bg-green-800 text-white"
                          : "bg-red-600 text-white"
                      } px-1 rounded`}
                    >
                      {cat.Status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="view" size="icon">
                      {cat.Action.find((action) => action.view)?.view}
                    </Button>
                    <Button variant="edit" size="icon">
                      {cat.Action.find((action) => action.edit)?.edit}
                    </Button>
                    <Button variant="delete" size="icon">
                      {cat.Action.find((action) => action.delete)?.delete}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>A list of your recent Quotations.</TableCaption>
          </Table>
        </CardContent>
        <CardFooter>
          <Pagination />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerCategory;
