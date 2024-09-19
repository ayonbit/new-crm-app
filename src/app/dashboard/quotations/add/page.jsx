//Dependencies
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";

//internal imports
import Createcustomer from "@/components/customer/create/createcustomer";
//For creating new Quotations fuctionality
const QuotationsAddPage = () => {
  const router = useRouter();
  //For ListPage Redirection
  const handleListRedirect = () => {
    router.push("/dashboard/quotations");
  };
  //For adding new quotes
  const [quotes, setQuotes] = useState([
    { id: 1, name: "", price: "", quantity: "", subtotal: "" },
  ]);

  const addQuotes = () => {
    setQuotes([
      ...quotes,
      {
        id: quotes.length + 1,
        name: "",
        price: "",
        quantity: "",
        subtotal: "",
      },
    ]);
  };

  const removeQuotes = (id) => {
    setQuotes(quotes.filter((quote) => quote.id !== id));
  };

  return (
    <div className="p-4 grid grid-cols-3 gap-6">
      <Card className="col-span-2">
        <CardHeader className="bg-[#006983] text-white p-4">
          <h4>Add New Quotation</h4>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Select Customer</h4>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search Customer"
                className="w-1/2 "
              />
              <div className="flex-grow"></div>
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
          </div>
          <Table className="border">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-black border-r w-1/3">
                  Product Name
                </TableHead>
                <TableHead className="text-black border-r">Price</TableHead>
                <TableHead className="text-black border-r">Quantity</TableHead>
                <TableHead className="text-black border-r">Subtotal</TableHead>
                <TableHead className="text-black">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border-t">
              {quotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="border-r">
                    <Input
                      type="text"
                      placeholder="Product Name"
                      value={quote.name}
                      onChange={(e) => {
                        const newQuotes = [...quotes];
                        newQuotes[quote.id - 1].name = e.target.value;
                        setQuotes(newQuotes);
                      }}
                    />
                  </TableCell>
                  <TableCell className="border-r">
                    <Input
                      type="number"
                      placeholder="0"
                      value={quote.price}
                      onChange={(e) => {
                        const newQuotes = [...quotes];
                        newQuotes[quote.id - 1].price = e.target.value;
                        setQuotes(newQuotes);
                      }}
                    />
                  </TableCell>
                  <TableCell className="border-r">
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={quote.quantity}
                      onChange={(e) => {
                        const newQuotes = [...quotes];
                        newQuotes[quote.id - 1].quantity = e.target.value;
                        setQuotes(newQuotes);
                      }}
                    />
                  </TableCell>
                  <TableCell className="border-r">
                    <Input
                      type="number"
                      placeholder="0"
                      value={quote.subtotal}
                      onChange={(e) => {
                        const newQuotes = [...quotes];
                        newQuotes[quote.id - 1].subtotal = e.target.value;
                        setQuotes(newQuotes);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="delete"
                      onClick={() => removeQuotes(quote.id)}
                    >
                      <FaTrash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="custom"
              className="flex items-center space-x-2"
              onClick={addQuotes}
            >
              <FaPlus />
              <span>Add New</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-1 h-max ">
        <CardHeader className="bg-[#006983] text-white p-4">
          <h4>Total</h4>
        </CardHeader>
        <CardContent className="p-4 space-y-4 h-full">
          <div className="space-y-2">
            <Label htmlFor="total">Total</Label>
            <Input type="number" id="total" placeholder="0" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount">Discount (Deduction)</Label>
            <Input type="number" id="discount" placeholder="0" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax">Tax/Others (Addition)</Label>
            <Input type="number" id="tax" placeholder="0" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalPayable">Total Payable</Label>
            <Input type="number" id="totalPayable" placeholder="0" />
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              size="sm"
              variant="custom"
              className="flex items-center space-x-2"
            >
              <FaCheck size={10} />
              <span>Add Quotation</span>
            </Button>
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-400"
              onClick={handleListRedirect}
            >
              Quotation List
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuotationsAddPage;
