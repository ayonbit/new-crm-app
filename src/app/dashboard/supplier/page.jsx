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
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
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
import CreateSupplier from "@/components/supplier/create/CreateSupplier";
import { deleteSupplierHandler } from "@/lib/ActionHandler/SupplierCreate";
import { fetchSupplier } from "@/lib/FetchHandler/CreateSupFetch";
import { toast } from "react-hot-toast";

// Manage Supplier Page
const ManageSupplierPage = () => {
  // For Fetch Supplier
  const [supplierData, setSupplierData] = useState([]);
  // For Loading
  const [loading, setLoading] = useState(true);
  // For Search Functionality
  const [searchQuery, setSearchQuery] = useState("");
  // For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // For delete confirmation dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [supplierIdToDelete, setSupplierIdToDelete] = useState(null);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        setLoading(true);
        const { suppliers, totalPages } = await fetchSupplier(
          searchQuery,
          currentPage
        );
        console.log("Fetched suppliers:", suppliers); // Log fetched suppliers
        setSupplierData(suppliers);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching supplier data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSupplierData();
  }, [searchQuery, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async () => {
    try {
      console.log("Deleting supplier with ID:", supplierIdToDelete); // Log the ID being deleted
      const result = await deleteSupplierHandler(supplierIdToDelete);
      console.log("Delete result:", result); // Log the result of the delete operation
      if (result.success) {
        toast.success(result.message);
        setSupplierData(
          supplierData.filter((sup) => sup._id !== supplierIdToDelete)
        );
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error deleting supplier:", error.message);
      toast.error("Failed to delete supplier");
    } finally {
      setIsDialogOpen(false);
    }
  };

  const openConfirmationDialog = (id) => {
    setSupplierIdToDelete(id);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-2 h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <FaListOl size={20} className="mr-2" /> Supplier List:
            </div>
            <div className="flex-grow flex justify-end items-center space-x-4 mr-8">
              <Search
                placeholder="Search Supplier ..."
                onSearch={setSearchQuery}
              />
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
                <DialogContent className="p-4 max-w-2xl w-full ">
                  <DialogTitle className="text-center font-bold">
                    Add New Supplier
                    <hr className="mt-2 " />
                  </DialogTitle>
                  <CreateSupplier />
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
                    Supplier Code
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Name
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Company Name
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
                    Current Balance
                  </TableHead>
                  <TableHead className="px-1 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white divide-y divide-gray-200">
                {supplierData.map((sup, index) => (
                  <TableRow key={index} className="hover:bg-gray-100">
                    <TableCell className="px-2 py-2 text-sm font-medium text-gray-900 border border-gray-300 overflow-hidden overflow-ellipsis">
                      {sup.companyCode}
                    </TableCell>
                    <TableCell className="px-2 py-2 text-sm text-gray-800 border border-gray-300 overflow-hidden overflow-ellipsis">
                      {sup.supplierName}
                    </TableCell>
                    <TableCell className="px-2 py-2 text-sm text-gray-800 border border-gray-300 overflow-hidden overflow-ellipsis">
                      {sup.companyName}
                    </TableCell>
                    <TableCell className="px-2 py-2 text-sm text-gray-800 border border-gray-300 overflow-hidden overflow-ellipsis">
                      {sup.companyEmail}
                    </TableCell>
                    <TableCell className="px-2 py-2 text-sm text-gray-800 border border-gray-300 overflow-hidden overflow-ellipsis">
                      {sup.companyPhone}
                    </TableCell>
                    <TableCell className="px-2 py-2 text-sm text-gray-800 border border-gray-300 overflow-hidden overflow-ellipsis">
                      {sup.companyAddress}
                    </TableCell>
                    <TableCell className="px-2 py-2 text-sm text-gray-800 border border-gray-300 overflow-hidden overflow-ellipsis">
                      {sup.openingBalance}
                    </TableCell>
                    <TableCell className="flex flex-col text-sm font-medium border-gray-300">
                      <Link href={`/dashboard/supplier/view/${sup._id}`}>
                        <Button variant="view" size="icon">
                          <FaEye size={16} />
                        </Button>
                      </Link>
                      <Link href={`/dashboard/supplier/edit/${sup._id}`}>
                        <Button variant="edit" size="icon">
                          <FaEdit size={16} />
                        </Button>
                      </Link>
                      <Button
                        variant="delete"
                        size="icon"
                        onClick={() => openConfirmationDialog(sup._id)}
                      >
                        <FaTrash size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption className="text-black">
                A list of your recent Supplier.
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
    <ManageSupplierPage />
  </Suspense>
);

export default Page;
