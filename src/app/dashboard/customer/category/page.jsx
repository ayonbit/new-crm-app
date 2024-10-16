"use client";
// Dependencies
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
import { FaEdit, FaEye, FaListOl, FaPlus, FaTrash } from "react-icons/fa";

// Internal import
import ConfirmationDialog from "@/components/confrimdialog/ConformDialog";
import AddCustomerCategory from "@/components/customer/category/AddCustomerCategory";
import { deleteCategoryHandler } from "@/lib/ActionHandler/cuscatcreate";
import { fetchCustomerCategory } from "@/lib/FetchHandler/cuscatfetch";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// Category page
const CustomerCategoryPage = () => {
  // For category fetch
  const [categoryData, setcategoryData] = useState([]);
  // For loading state
  const [loading, setLoading] = useState(true);
  // For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // For delete confirmation dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

  useEffect(() => {
    const fetchcatdata = async () => {
      setLoading(true);
      const { categories, totalPages } = await fetchCustomerCategory(
        currentPage
      );
      setcategoryData(categories);
      setTotalPages(totalPages);
      setLoading(false);
    };
    fetchcatdata();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async () => {
    const result = await deleteCategoryHandler(categoryIdToDelete);
    if (result.success) {
      toast.success(result.message);
      setcategoryData(
        categoryData.filter((cat) => cat._id !== categoryIdToDelete)
      );
    } else {
      toast.error(result.message);
    }
    setIsDialogOpen(false);
  };

  const openConfirmationDialog = (id) => {
    setCategoryIdToDelete(id);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-2 h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <FaListOl className="mr-2" /> Customer Category
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="custom"
                  className="flex items-center space-x-2"
                >
                  <FaPlus size={10} />
                  <span>Create New</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="p-6 max-w-2xl w-full ">
                <DialogTitle className="text-center font-bold">
                  Add New Category
                  <hr className="mt-2 " />
                </DialogTitle>
                <AddCustomerCategory />
              </DialogContent>
            </Dialog>
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
                    SL
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Category Name
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Description
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Amount
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Amount (%)
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Type
                  </TableHead>
                  <TableHead className="px-2 py-2 text-center text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Status
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Created
                  </TableHead>
                  <TableHead className="px-2 py-2 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-300">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white divide-y divide-gray-200">
                {categoryData.map((cat, index) => (
                  <TableRow key={index} className="hover:bg-gray-100">
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center border border-gray-300">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm text-gray-800 border border-gray-300">
                      {cat.CategoryName}
                    </TableCell>
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm text-gray-800 border border-gray-300">
                      {cat.Description}
                    </TableCell>
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm text-gray-800 text-center border border-gray-300">
                      {cat.Amount}
                    </TableCell>
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm text-gray-800 text-center border border-gray-300">
                      {cat.AmountOf}
                    </TableCell>
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm text-gray-800 border border-gray-300">
                      {cat.Type}
                    </TableCell>
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm text-center border border-gray-300">
                      <span
                        className={`${
                          cat.Status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        } px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                      >
                        {cat.Status}
                      </span>
                    </TableCell>
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm text-gray-800 border border-gray-300">
                      {new Date(cat.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-2 py-2 whitespace-nowrap text-sm font-medium border border-gray-300">
                      <Link
                        href={`/dashboard/customer/category/view/${cat._id}`}
                        passHref
                      >
                        <Button variant="view" size="icon" className="mr-2">
                          <FaEye />
                        </Button>
                      </Link>
                      <Link
                        href={`/dashboard/customer/category/edit/${cat._id}`}
                      >
                        <Button variant="edit" size="icon" className="mr-2">
                          <FaEdit />
                        </Button>
                      </Link>

                      <Button
                        variant="delete"
                        size="icon"
                        onClick={() => openConfirmationDialog(cat._id)}
                      >
                        <FaTrash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption className=" text-black">
                A list of your recent Customer Category.
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
        message="Are you sure to delete this category?"
      />
    </div>
  );
};

export default CustomerCategoryPage;
