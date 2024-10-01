"use client";

// Dependencies
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
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";

// Internal Imports
import Createcustomer from "@/components/customer/create/createcustomer";
import { CreateQuotationHandler } from "@/lib/ActionHandler/quotationcreate";
import { fetchCustomer } from "@/lib/FetchHandler/createcustfetch";

// Quotation Add Page
const QuotationsAddPage = () => {
  const router = useRouter();

  // Redirect to Quotation List
  const handleListRedirect = () => {
    router.push("/dashboard/quotations");
  };

  // Quotation Items Management
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      productName: "",
      productPrice: 0,
      productQuantity: 0,
      productSubtotal: 0,
    },
  ]);

  // Add a new quote item
  const addQuotes = () =>
    setQuotes((prevQuotes) => [
      ...prevQuotes,
      {
        id: prevQuotes.length + 1,
        productName: "",
        productPrice: 0,
        productQuantity: 0,
        productSubtotal: 0,
      },
    ]);

  // Remove a quote item
  const removeQuotes = (id) =>
    setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== id));

  // Handle quote input changes and automatically calculate subtotal
  const handleQuoteChange = (id, field, value) => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) => {
        if (quote.id === id) {
          const updatedQuote = { ...quote, [field]: value };
          if (field === "productPrice" || field === "productQuantity") {
            updatedQuote.productSubtotal =
              updatedQuote.productPrice * updatedQuote.productQuantity;
          }
          return updatedQuote;
        }
        return quote;
      })
    );
  };

  // Customer Search Management
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef(null);

  // Fetch customers based on search query
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (searchQuery) {
        try {
          const { customers } = await fetchCustomer(searchQuery);
          setFilteredCustomers(customers);
          setDropdownVisible(true);
        } catch (error) {
          console.error("Error fetching customers:", error);
          toast.error("Failed to fetch customers");
        }
      } else {
        setFilteredCustomers([]);
        setDropdownVisible(false);
      }
    };

    const debounceFetch = setTimeout(fetchCustomerData, 300);
    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

  // Handle customer selection and close the dropdown immediately
  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setSearchQuery(customer.name);
    setDropdownVisible(false); // Hides the dropdown after selection
  };

  // Close dropdown on blur
  const handleBlur = (e) => {
    // Use setTimeout to ensure dropdown hides after customer selection
    setTimeout(() => {
      if (!inputRef.current.contains(e.relatedTarget)) {
        setDropdownVisible(false);
      }
    }, 0);
  };

  // Calculation for Total, Discount, Tax, and Payable Amount
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [payable, setPayable] = useState(0);

  // Memoized total calculation to optimize performance
  const total = useMemo(() => {
    return quotes.reduce((sum, quote) => sum + (quote.productSubtotal || 0), 0);
  }, [quotes]);

  // Update payable amount based on total, discount, and tax
  useEffect(() => {
    const discountedTotal = total - discount;
    const taxAmount = (discountedTotal * tax) / 100;
    const totalPayable = discountedTotal + taxAmount;
    setPayable(totalPayable);
  }, [total, discount, tax]);

  const handleSaveQuotation = async () => {
    const formData = {
      customerName: selectedCustomer ? selectedCustomer.name : "",
      quotes: quotes.map((quote) => ({
        productName: quote.productName,
        productPrice: quote.productPrice,
        productQuantity: quote.productQuantity,
        productSubtotal: quote.productSubtotal,
      })),
      total,
      discount,
      tax,
      payable,
    };

    try {
      const response = await CreateQuotationHandler(formData);
      if (response.success) {
        toast.success("Quotation saved successfully");

        // Reset form state
        setQuotes([
          {
            id: 1,
            productName: "",
            productPrice: 0,
            productQuantity: 0,
            productSubtotal: 0,
          },
        ]);
        setSearchQuery("");
        setSelectedCustomer(null);
        setDiscount(0);
        setTax(0);
        setPayable(0);

        // Optionally, redirect or show a success message
      } else {
        toast.error(`Failed to save quotation: ${response.message}`);
      }
    } catch (error) {
      console.error("Error saving quotation:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-4 grid grid-cols-3 gap-6">
      {/* Quotation Form */}
      <Card className="col-span-2">
        <CardHeader className="bg-[#006983] text-white p-4">
          <h4>Add New Quotation</h4>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Select Customer</h4>
            <div className="flex items-center space-x-2">
              <div className="relative flex-grow" ref={inputRef}>
                <Input
                  type="text"
                  placeholder="Search Customer ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setDropdownVisible(true)}
                  onBlur={handleBlur}
                  className="w-64"
                />
                {dropdownVisible && (
                  <div className="absolute z-10 w-64 bg-white border border-gray-600 mt-1 max-h-60 overflow-y-auto">
                    {filteredCustomers.map((customer) => (
                      <div
                        key={customer._id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onMouseDown={() => handleCustomerSelect(customer)}
                      >
                        {customer.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add New Customer Dialog */}
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
                <DialogContent className="p-6 max-w-2xl w-full">
                  <DialogTitle className="text-center font-bold">
                    Add New Customer
                    <hr className="mt-2" />
                  </DialogTitle>
                  <Createcustomer />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Quotation Table */}
          <Table className="border">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="border-r w-1/3">Product Name</TableHead>
                <TableHead className="border-r">Price</TableHead>
                <TableHead className="border-r">Quantity</TableHead>
                <TableHead className="border-r">Subtotal</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="border-r">
                    <Input
                      type="text"
                      placeholder="Product Name"
                      value={quote.productName}
                      onChange={(e) =>
                        handleQuoteChange(
                          quote.id,
                          "productName",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="border-r">
                    <Input
                      type="number"
                      placeholder="0"
                      value={quote.productPrice === 0 ? "" : quote.productPrice}
                      onChange={(e) =>
                        handleQuoteChange(
                          quote.id,
                          "productPrice",
                          e.target.value === "" ? 0 : parseFloat(e.target.value)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="border-r">
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={
                        quote.productQuantity === 0 ? "" : quote.productQuantity
                      }
                      onChange={(e) =>
                        handleQuoteChange(
                          quote.id,
                          "productQuantity",
                          e.target.value === "" ? 0 : parseInt(e.target.value)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="border-r">
                    <Input
                      type="number"
                      placeholder="0"
                      value={quote.productSubtotal}
                      readOnly
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

          {/* Add New Product Button */}
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="custom"
              onClick={addQuotes}
              className="flex items-center space-x-2"
            >
              <FaPlus />
              <span>Add New</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quotation Summary */}
      <Card className="col-span-1 h-max">
        <CardHeader className="bg-[#006983] text-white p-4">
          <h4>Quotation Summary</h4>
        </CardHeader>
        <CardContent className="p-4 space-y-4 h-full">
          <div className="space-y-2">
            <Label>Total</Label>
            <Input type="number" placeholder="0" value={total} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Discount (Deduction)</Label>
            <Input
              type="number"
              placeholder="0"
              value={discount === 0 ? "" : discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label>Tax/Others (%)</Label>
            <Input
              type="number"
              placeholder="0"
              value={tax === 0 ? "" : tax}
              onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label>Payable</Label>
            <Input type="number" placeholder="0" value={payable} readOnly />
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              size="sm"
              variant="custom"
              className="flex items-center space-x-2"
              onClick={handleSaveQuotation}
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
