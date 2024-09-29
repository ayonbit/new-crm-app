"use client";

// Dependencies
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
import { useEffect, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaFileExport,
  FaListOl,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

// Internal Dependencies
import Createcustomer from "@/components/customer/create/createcustomer";
import { fetchCustomer } from "@/lib/FetchHandler/createcustfetch";

// Customer List Page
const CustomerList = () => {
  // For Customer Fetch
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setLoading(true);
        const customer = await fetchCustomer();
        setCustomerData(customer);
      } catch (error) {
        console.error("Error fetching customer data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerData();
  }, []);

  return (
    <div className="p-2 h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <FaListOl size={20} className="mr-2" /> Customer List:
            </div>
            <div className="flex-grow flex justify-end items-center space-x-4">
              <Search />
              <Button
                size="sm"
                variant="custom"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                <FaFileExport size={16} className="mr-2" /> Export Customer
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="custom"
                    className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    <FaPlus size={10} />
                    <span>Add New Customer</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-6 max-w-2xl w-full">
                  <DialogTitle className="text-center font-bold">
                    Add New Customer
                    <hr className="mt-2" />
                  </DialogTitle>
                  <Createcustomer />
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loader">Loading...</div>
            </div>
          ) : (
            <Table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Customer ID
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Name
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Email
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Phone
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Address
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Category
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Current Balance
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Date
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Status
                  </TableHead>
                  <TableHead className="px-1 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white divide-y divide-gray-200">
                {customerData.map((cus, index) => (
                  <TableRow key={index} className="hover:bg-gray-100">
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900  border border-gray-300 overflow-hidden overflow-ellipsis">
                      {cus.customerCode}
                    </TableCell>
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm text-gray-800 border border-gray-300 overflow-hidden overflow-ellipsis">
                      {cus.name}
                    </TableCell>
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm text-gray-800 border border-gray-300 overflow-hidden overflow-ellipsis">
                      {cus.email}
                    </TableCell>
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm text-gray-800  border border-gray-300 overflow-hidden overflow-ellipsis">
                      {cus.phone}
                    </TableCell>
                    <TableCell className="px-2 py-2 whitespace-pre-line text-sm text-gray-800 text-center border border-gray-300">
                      {cus.address}
                    </TableCell>
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm text-gray-800  border border-gray-300 overflow-hidden overflow-ellipsis">
                      {cus.category}
                    </TableCell>
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm text-gray-800  border border-gray-300 overflow-hidden overflow-ellipsis">
                      {cus.openingBalance}
                    </TableCell>
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm text-gray-800 border border-gray-300 overflow-hidden overflow-ellipsis">
                      {new Date(cus.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm  border border-gray-300 overflow-hidden overflow-ellipsis">
                      <span
                        className={`${
                          cus.Status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        } px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                      >
                        {cus.Status}
                      </span>
                    </TableCell>
                    <TableCell className=" flex items-center  text-sm font-medium  border-gray-300">
                      <Button variant="view" size="icon" className="mr-1">
                        <FaEye size={12} />
                      </Button>
                      <Button variant="edit" size="icon" className="mr-1">
                        <FaEdit size={12} />
                      </Button>
                      <Button variant="delete" size="icon">
                        <FaTrash size={12} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption className="text-black">
                A list of your recent Customer.
              </TableCaption>
            </Table>
          )}
        </CardContent>
        <CardFooter>
          <Pagination />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerList;
