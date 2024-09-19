"use client";
import Createcustomer from "@/components/customer/create/createcustomer";
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
import {
  FaEdit,
  FaEye,
  FaFileExport,
  FaListOl,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
//Internal Dependencies

//Customer List Data
const customerListData = [
  {
    customerCode: "#C001",
    customerName: "John Doe",
    customerEmail: "johndoe@jon.com",
    customerPhone: "1234567890",
    customerAddress: "1234 Main Street",
    currentBalance: "0.00",
    Status: "Active", // or "Inactive"
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    customerCode: "#C002",
    customerName: "Doe John",
    customerEmail: "johndoe@jon.com",
    customerPhone: "1234567890",
    customerAddress: "1234 Main Street",
    currentBalance: "100.00",
    Status: "Inactive", // or "Active",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    customerCode: "#C003",
    customerName: "Alice Doe",
    customerEmail: "johndoe@jon.com",
    customerPhone: "1234567890",
    customerAddress: "1234 Main Street",
    currentBalance: "215.00",
    Status: "Inactive", // or "Active",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    customerCode: "#C004",
    customerName: "Bob Alice",
    customerEmail: "johndoe@jon.com",
    customerPhone: "1234567890",
    customerAddress: "1234 Main Street",
    currentBalance: "0.00",
    Status: "Active", // or "Inactive",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    customerCode: "#C005",
    customerName: "Bov Doe",
    customerEmail: "johndoe@jon.com",
    customerPhone: "1234567890",
    customerAddress: "1234 Main Street",
    currentBalance: "23658.00",
    Status: "Inactive", // or "Active",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    customerCode: "#C006",
    customerName: "Nova Doe",
    customerEmail: "johndoe@jon.com",
    customerPhone: "1234567890",
    customerAddress: "1234 Main Street",
    currentBalance: "0.00",
    Status: "Active", // or "Inactive",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    customerCode: "#C007",
    customerName: "John Doe",
    customerEmail: "johndoe@jon.com",
    customerPhone: "1234567890",
    customerAddress: "1234 Main Street",
    currentBalance: "0.00",
    Status: "Active", // or "Inactive",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
];
//Customer List Page
const CustomerList = () => {
  return (
    <div className="p-2 h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <FaListOl size={20} className="mr-2" /> Customer List:
            </div>
            <div className="flex-grow flex justify-end items-center space-x-4 mr-8">
              <Search />
              <Button size="sm" variant="custom">
                <FaFileExport size={16} className="mr-2" /> Export Customer
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="custom"
                    className="flex items-center space-x-2"
                  >
                    <FaPlus size={10} />
                    <span>Add New Customer</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-6 max-w-2xl w-full ">
                  <DialogTitle className="text-center font-bold">
                    Add New Customer
                    <hr className="mt-2 " />
                  </DialogTitle>
                  <Createcustomer />
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Current Balance</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerListData.map((cat, index) => (
                <TableRow className="" key={index}>
                  <TableCell className="text-center">
                    {cat.customerCode}
                  </TableCell>
                  <TableCell className="text-left ">
                    {cat.customerName}
                  </TableCell>
                  <TableCell>{cat.customerEmail}</TableCell>
                  <TableCell className="text-center">
                    {cat.customerPhone}
                  </TableCell>
                  <TableCell className="text-center">
                    {cat.customerAddress}
                  </TableCell>
                  <TableCell className="text-center">
                    {cat.currentBalance}
                  </TableCell>

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
            <TableCaption>A list of your recent Customer.</TableCaption>
          </Table>
        </CardContent>
        <CardFooter>
          <Pagination />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerList;
