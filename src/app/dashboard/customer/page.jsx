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
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaEdit,
  FaEye,
  FaFileExport,
  FaListOl,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
// Internal Dependencies
import ConfirmationDialog from "@/components/confrimdialog/ConformDialog";
import Createcustomer from "@/components/customer/create/CreateCustomer";
import { deleteCustomerHandler } from "@/lib/ActionHandler/customercreate"; // Import delete handler
import { fetchCustomer } from "@/lib/FetchHandler/createcustfetch";

import Link from "next/link";

// Customer List Page
const CustomerList = () => {
  // For Customer Fetch
  const [customerData, setCustomerData] = useState([]);
  // For Loading
  const [loading, setLoading] = useState(true);
  // For Search Functionality
  const [searchQuery, setSearchQuery] = useState("");
  // For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // For delete confirmation dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customerIdToDelete, setCustomerIdToDelete] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setLoading(true);
        const { customers, totalPages } = await fetchCustomer(
          searchQuery,
          currentPage
        );
        setCustomerData(customers);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching customer data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerData();
  }, [searchQuery, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async () => {
    const result = await deleteCustomerHandler(customerIdToDelete);
    if (result.success) {
      toast.success(result.message);
      setCustomerData(
        customerData.filter((cus) => cus._id !== customerIdToDelete)
      );
    } else {
      toast.error(result.message);
    }
    setIsDialogOpen(false);
  };

  const openConfirmationDialog = (id) => {
    setCustomerIdToDelete(id);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-2 h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <FaListOl size={20} className="mr-2" /> Customer List:
            </div>
            <div className="flex-grow flex justify-end items-center space-x-4">
              <Search
                placeholder="Search Customers ..."
                onSearch={setSearchQuery}
              />
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
              <TableBody className="bg-white divide-y  divide-gray-200">
                {customerData.map((cus, index) => (
                  <TableRow key={index} className="hover:bg-gray-100">
                    <TableCell className="px-2 py-2  text-sm font-medium text-gray-900  border border-gray-300 overflow-hidden overflow-ellipsis">
                      {cus.customerCode}
                    </TableCell>
                    <TableCell className="px-2 py-2 text-sm text-gray-800 border border-gray-300 overflow-hidden overflow-ellipsis">
                      {cus.name}
                    </TableCell>
                    <TableCell className="px-2 py-2  text-sm text-gray-800 border border-gray-300 overflow-hidden overflow-ellipsis">
                      {cus.email}
                    </TableCell>
                    <TableCell className="px-2 py-2  text-sm text-gray-800  border border-gray-300 overflow-hidden overflow-ellipsis">
                      {cus.phone}
                    </TableCell>
                    <TableCell className=" text-gray-800 text-left border border-gray-300">
                      {cus.address}
                    </TableCell>
                    <TableCell className="px-2 py-2  text-sm text-gray-800  border border-gray-300 overflow-hidden overflow-ellipsis">
                      {cus.category}
                    </TableCell>
                    <TableCell className="px-2 py-2  text-sm text-gray-800  border border-gray-300 overflow-hidden overflow-ellipsis">
                      {cus.openingBalance}
                    </TableCell>
                    <TableCell className="px-2 py-2  text-sm text-gray-800 border border-gray-300 overflow-hidden overflow-ellipsis">
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
                    <TableCell className=" flex flex-col text-sm font-medium border-gray-300">
                      <Link href={`/dashboard/customer/view/${cus._id}`}>
                        <Button variant="view" size="icon">
                          <FaEye size={16} />
                        </Button>
                      </Link>
                      <Link href={`/dashboard/customer/edit/${cus._id}`}>
                        <Button variant="edit" size="icon">
                          <FaEdit size={16} />
                        </Button>
                      </Link>
                      <Button
                        variant="delete"
                        size="icon"
                        onClick={() => openConfirmationDialog(cus._id)}
                      >
                        <FaTrash size={16} />
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </CardFooter>
      </Card>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this customer?"
      />
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CustomerList />
  </Suspense>
);

export default Page;
