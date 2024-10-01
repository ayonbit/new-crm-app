"use client";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaFileExport,
  FaListOl,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

//Internal Dependencies
import { fetchQuotation } from "@/lib/FetchHandler/createquotationfetch";

//Quotation List Page
const QuotationsList = () => {
  const router = useRouter();
  //For Quotation Fetch
  const [quotationData, setQuotationData] = useState([]);
  //For Loading
  const [loading, setLoading] = useState(true);
  //For Search Functionality
  const [searchQuery, setSearchQuery] = useState("");
  //For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchQuotationData = async () => {
      try {
        setLoading(true);
        const { quotations, totalPages } = await fetchQuotation(
          searchQuery,
          currentPage
        );
        setQuotationData(quotations);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching quotation data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotationData();
  }, [searchQuery, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  //For Quotation List Page Redirection
  const handlequotionRedirect = () => {
    router.push("/dashboard/quotations/add");
  };

  return (
    <div className="p-2 h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <FaListOl size={20} className="mr-2" /> Quotation List:
            </div>
            <div className="flex-grow flex justify-end items-center space-x-4 mr-8">
              <Search
                placeholder="Search Quotation ..."
                onSearch={setSearchQuery}
              />
              <Button size="sm" variant="custom">
                <FaFileExport size={16} className="mr-2" /> Export List
              </Button>
              <Button
                size="sm"
                variant="custom"
                onClick={handlequotionRedirect}
              >
                <FaPlus size={10} className="mr-2" />
                Add Quotation
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loader">Loading...</div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="py-2 px-4 text-left text-black font-bold">
                    Serial
                  </TableHead>
                  <TableHead className="py-2 px-4 text-left text-black font-bold">
                    Date
                  </TableHead>
                  <TableHead className="py-2 px-4 text-left text-black font-bold">
                    Quotation Id
                  </TableHead>
                  <TableHead className="py-2 px-4 text-left text-black font-bold">
                    Customer Name
                  </TableHead>
                  <TableHead className="py-2 px-4 text-left text-black font-bold">
                    Total Payable
                  </TableHead>
                  <TableHead className="py-2 px-4 text-left text-black font-bold">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotationData.map((quote, index) => (
                  <TableRow key={index}>
                    <TableCell className="py-2 px-4 text-left">
                      {index + 1}
                    </TableCell>
                    <TableCell className="py-2 px-4 text-left">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="py-2 px-4 text-left">
                      {quote.quotationId}
                    </TableCell>
                    <TableCell className="py-2 px-4 text-left">
                      {quote.customerName}
                    </TableCell>
                    <TableCell className="py-2 px-4 text-left">
                      {quote.payable}
                    </TableCell>
                    <TableCell className="py-2 px-4 text-left">
                      <Button variant="view" size="icon" className="mr-1">
                        <FaEye size={16} />
                      </Button>
                      <Button variant="edit" size="icon" className="mr-1">
                        <FaEdit size={16} />
                      </Button>
                      <Button variant="delete" size="icon">
                        <FaTrash size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption>A list of your recent Quotations.</TableCaption>
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
    </div>
  );
};

export default QuotationsList;
