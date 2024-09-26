"use server";
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
import { FaEdit, FaEye, FaListOl, FaPlus, FaTrash } from "react-icons/fa";

//Internal import
import AddCustomerCategory from "@/components/customer/category/addcustomercategory";

import { fetchCustomerCategory } from "@/lib/FetchHandler/cuscatfetch";

// Category page
const CustomerCategoryPage = async () => {
  const category = await fetchCustomerCategory();
  //console.log(category);
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
          <Table>
            <TableHeader className="font-bold">
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
              {category.map((cat, index) => (
                <TableRow className="" key={index}>
                  <TableCell className="text-center">{index + 1}</TableCell>
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
                      <FaEye />
                    </Button>
                    <Button variant="edit" size="icon">
                      <FaEdit />
                    </Button>
                    <input type="hidden" name="id" value={category.id} />
                    <Button variant="delete" size="icon">
                      <FaTrash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>
              A list of your recent Customer Category.
            </TableCaption>
          </Table>
        </CardContent>
        <CardFooter>
          <Pagination />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerCategoryPage;
