"use client";
import Createsupplier from "@/components/supplier/create/createsupplier";
//Dependencies
import Pagination from "@/components/pagination/pagination";
import Search from "@/components/search/search";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense } from "react";
import {
  FaEdit,
  FaEye,
  FaFileExport,
  FaListOl,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

//Customer List Data
const supplierListData = [
  {
    supplierCode: "#Sup001",
    supplierName: "X-Ceramics",
    supplierCompanyName: "John Doe",
    supplierEmail: "johndoe@jon.com",
    supplierPhone: "1234567890",
    supplierAddress: "1234 Main Street",
    currentBalance: "-26000.00",

    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    supplierCode: "#Sup002",
    supplierName: "X-Monalisa",
    supplierCompanyName: "John Doe",
    supplierEmail: "johndoe@jon.com",
    supplierPhone: "1234567890",
    supplierAddress: "1234 Main Street",
    currentBalance: "4900000.00",

    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    supplierCode: "#Sup002",
    supplierName: "X-Monika",
    supplierCompanyName: "John Doe",
    supplierEmail: "johndoe@jon.com",
    supplierPhone: "1234567890",
    supplierAddress: "1234 Main Street",
    currentBalance: "49000.00",

    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    supplierCode: "#Sup002",
    supplierName: "Sun Power Ltd",
    supplierCompanyName: "John Doe",
    supplierEmail: "johndoe@jon.com",
    supplierPhone: "1234567890",
    supplierAddress: "1234 Main Street",
    currentBalance: "26580001250.00",

    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
];

//Manage Supplier Page
const ManageSupplierPage = () => {
  return (
    <div className="p-2 h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <FaListOl size={20} className="mr-2" /> Supplier List:
            </div>
            <div className="flex-grow flex justify-end items-center space-x-4 mr-8">
              <Search placeholder="Search Supplier ..." />
              <Button size="sm" variant="custom">
                <FaFileExport size={16} className="mr-2" /> Export Supplier
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="custom"
                    className="flex items-center space-x-2"
                  >
                    <FaPlus size={10} />
                    <span>Add New Supplier</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-6 max-w-2xl w-full ">
                  <DialogTitle className="text-center font-bold">
                    Add New Supplier
                    <hr className="mt-2 " />
                  </DialogTitle>
                  <Createsupplier />
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead className="text-black font-bold">
                  Supplier Code
                </TableHead>
                <TableHead className="text-black font-bold">Name</TableHead>
                <TableHead className="text-black font-bold">
                  Company Name
                </TableHead>
                <TableHead className="text-black font-bold">Email</TableHead>
                <TableHead className="text-black font-bold">Phone</TableHead>
                <TableHead className="text-black font-bold">Address</TableHead>
                <TableHead className="text-black font-bold">
                  Current Balance
                </TableHead>
                <TableHead className="text-black font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplierListData.map((cat, index) => (
                <TableRow className="" key={index}>
                  <TableCell className="text-center">
                    {cat.supplierCode}
                  </TableCell>
                  <TableCell className="text-left ">
                    {cat.supplierCompanyName}
                  </TableCell>
                  <TableCell>{cat.supplierName}</TableCell>
                  <TableCell className="text-center">
                    {cat.supplierEmail}
                  </TableCell>
                  <TableCell className="text-center">
                    {cat.supplierPhone}
                  </TableCell>
                  <TableCell className="text-center">
                    {cat.supplierAddress}
                  </TableCell>
                  <TableCell className="text-center">
                    {cat.currentBalance}
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
            <TableCaption>A list of your recent Supplier.</TableCaption>
          </Table>
        </CardContent>
        <CardFooter>
          <Pagination />
        </CardFooter>
      </Card>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ManageSupplierPage />
  </Suspense>
);

export default Page;
