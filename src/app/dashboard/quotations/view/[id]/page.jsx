"use client";
// Dependencies
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBook, FaPrint } from "react-icons/fa";
//Internal Dependencies
import { fetchSingleQuotation } from "@/lib/FetchHandler/createquotationfetch";

// Main Component
const QuotationView = () => {
  const { id } = useParams();
  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotationData = async () => {
      try {
        console.log("Fetching quotation with ID:", id); // Log the ID
        const data = await fetchSingleQuotation(id);
        console.log(data); // Log the fetched quotation to the console
        setQuotation(data);
      } catch (error) {
        console.error("Error fetching quotation:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotationData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-1 py-4 px-4 h-screen">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-6 text-2xl font-bold">
              <FaBook className="mr-2" /> Quotation Invoice Details
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="px-6 p-6">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <Image src="/tailwindcss.svg" alt="logo" width={80} height={80} />
            <h1 className="text-2xl font-semibold">My Shop Name</h1>
          </div>
          <h1 className="text-xl">
            Date: {new Date(quotation.updatedAt).toLocaleDateString()}
          </h1>
        </div>
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex flex-col items-start gap-1">
            <h2>From :</h2>
            <h1>My Shop Name</h1>
            <p>Address : 7.5 Roshi Bazer,Sadarpur,Faridpur. </p>
            <p>Phone : 01712705629 </p>
            <p>Email : demo@demo.com</p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h2>TO :</h2>
            <h1>Name: {quotation?.customerName}</h1>
            <p>Address : 7.5 Roshi Bazer,Sadarpur,Faridpur. </p>
            <p>Phone : 01712705629 </p>
            <p>Email : demo@demo.com</p>
            <p>Quotation ID : {quotation?.quotationId} </p>
          </div>
        </div>
        <div className="flex px-8 py-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Product Name</TableHead>
                <TableHead className="text-left">Unit Price</TableHead>
                <TableHead className="text-left">Quantity</TableHead>
                <TableHead className="text-left">Sub Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotation?.quotes.map((quote, index) => (
                <TableRow key={index}>
                  <TableCell>{quote.productName}</TableCell>
                  <TableCell>{quote.productPrice.toFixed(2)}</TableCell>
                  <TableCell>{quote.productQuantity} Piece</TableCell>
                  <TableCell>{quote.productSubtotal.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableHead className="text-right" colSpan={3}>
                  Total :
                </TableHead>
                <TableCell>{quotation?.total.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="text-right" colSpan={3}>
                  Discount :
                </TableHead>
                <TableCell>{quotation?.discount.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="text-right" colSpan={3}>
                  Tax :
                </TableHead>
                <TableCell>{quotation?.tax.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="text-right" colSpan={3}>
                  Total Payable :
                </TableHead>
                <TableCell>{quotation?.payable.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-6" colSpan={4}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left py-4">
                  Customer Name: {quotation?.customerName}
                </TableCell>
                <TableCell className="text-right py-4">
                  Issued By : My Shop Employee
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-6"></TableCell>
                <TableCell className="py-6"></TableCell>
              </TableRow>
              <TableRow className="">
                <TableCell className="text-left">Signature and Date</TableCell>
                <TableCell className="text-right">Signature and Date</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end items-center">
          <Button className="text-xl gap-2" size="default" variant="custom">
            <FaPrint size={18} />
            Print
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuotationView;
