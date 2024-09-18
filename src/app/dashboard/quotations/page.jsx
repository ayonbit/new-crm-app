"use client";
import Pagination from "@/components/pagination/pagination";
//Dependencies

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
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
//table data
const quotationdata = [
  {
    Date: "01-01-2023",
    Reference: "#quot-001",
    Customer: "John Doe",
    TotalPayable: "250.00",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    Date: "11-02-2023",
    Reference: "#quot-002",
    Customer: "Alex Doe",
    TotalPayable: "1180.00",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    Date: "23-11-2023",
    Reference: "#quot-003",
    Customer: "Bob Doe",
    TotalPayable: "2500.00",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    Date: "01-08-2023",
    Reference: "#quot-004",
    Customer: "Alice Bob",
    TotalPayable: "25230.00",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    Date: "29-11-2023",
    Reference: "#quot-005",
    Customer: "John Alice",
    TotalPayable: "2500296444.00",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    Date: "09-12-2023",
    Reference: "#quot-006",
    Customer: "Alice John",
    TotalPayable: "2596440.00",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    Date: "13-01-2024",
    Reference: "#quot-007",
    Customer: "Ayon Bit",
    TotalPayable: "8452560.00",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    Date: "15-05-2024",
    Reference: "#quot-008",
    Customer: "Bob John",
    TotalPayable: "1452.00",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    Date: "15-05-2024",
    Reference: "#quot-008",
    Customer: "Bob John",
    TotalPayable: "1452.00",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    Date: "15-05-2024",
    Reference: "#quot-008",
    Customer: "Bob John",
    TotalPayable: "1452.00",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
  {
    Date: "15-05-2024",
    Reference: "#quot-008",
    Customer: "Bob John",
    TotalPayable: "1452.00",
    Action: [
      { view: <FaEye /> },
      { edit: <FaEdit /> },
      { delete: <FaTrash /> },
    ],
  },
];

const Quotations = () => {
  return (
    <div className="p-2 h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Quotations List:
            <div className="flex-grow flex justify-end mr-8">
              <Search />
            </div>
            <Button size="sm" variant="custom">
              <FaEye size={20} className="mr-2" /> Add Quotations
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead >Date</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total Payable</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotationdata.map((quote, index) => (
                <TableRow key={index}>
                  <TableCell>{quote.Date}</TableCell>
                  <TableCell>{quote.Reference}</TableCell>
                  <TableCell>{quote.Customer}</TableCell>
                  <TableCell>{quote.TotalPayable}</TableCell>
                  <TableCell>
                    <Button variant="view" size="icon">
                      {quote.Action.find((action) => action.view)?.view}
                    </Button>
                    <Button variant="edit" size="icon">
                      {quote.Action.find((action) => action.edit)?.edit}
                    </Button>
                    <Button variant="delete" size="icon">
                      {quote.Action.find((action) => action.delete)?.delete}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>A list of your recent Quotations.</TableCaption>
          </Table>
        </CardContent>
        <CardFooter>
          <Pagination />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quotations;
