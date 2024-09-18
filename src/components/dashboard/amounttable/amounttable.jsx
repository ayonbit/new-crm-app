// Dependencies
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dashboard table data
const dashboardtable = [
  { name: "Available Amount", amount: "199,078,003.18 TK" },
  { name: "DBBL-123456", amount: "1,455,735.00 TK" },
  { name: "Cash In Hand", amount: "168,130,653.47 TK" },
  { name: "RMS Cash In Hand", amount: "3,846,791.88 TK" },
  { name: "Marchentile Bank Ltd", amount: "2,186,425.38 TK" },
  { name: "Uttara Bank Ltd", amount: "1,681,094.25 TK" },
  { name: "Dutch Bangla Bank Ltd", amount: "3,188,332.49 TK" },
  { name: "Bkash Account", amount: "1,668,415.14 TK" },
  { name: "Nogod", amount: "83,658.47 TK" },
  { name: "Shamim Personal", amount: "439,637.00 TK" },
  { name: "RMS- Uttara Bank CC account", amount: "167,182.10 TK" },
  { name: "RMS- National Bank Ltd", amount: "4,821,034.00 TK" },
  { name: "RMS- Pubali Bank", amount: "528,900.00 TK" },
  { name: "RMS- Islami Bank Ltd", amount: "157,000.00 TK" },
  { name: "Correction", amount: "8,372,837.00 TK" },
  { name: "Return Goods", amount: "2,350,307.00 TK" },
];

const Amounttable = () => {
  return (
    <Card className="bg-white text-black ">
      <CardHeader>
        <CardTitle className="text-center font-bold">
          Available Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-full bg-white">
            <TableHeader>
              <TableRow>
                <TableCell className="py-2 px-4 border-2 font-bold text-xl">
                  Name
                </TableCell>
                <TableCell className="py-2 px-4 border-2 font-bold text-xl">
                  Amount
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dashboardtable.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="py-2 px-4 font-semibold border-2">
                    {item.name}
                  </TableCell>
                  <TableCell className="py-2 px-4  border-2">
                    {item.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Amounttable;
