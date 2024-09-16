"use client";
//Dependencies
import Amountable from "@/components/dashboard/amounttable/amounttable";
import Charts from "@/components/dashboard/charts/charts";
import Footer from "@/components/dashboard/footer/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const cardData = [
  {
    bgColor: "bg-[#ae78f0]",
    title: "Today",
    details: [
      { label: "Sale", value: "12.00 TK" },
      { label: "Compare to today", value: "" },
      { label: "Purchase", value: "20.00 TK" },
    ],
  },
  {
    bgColor: "bg-[#ff0000]",
    title: "Yesterday",
    details: [
      { label: "Sale", value: "100.00 TK" },
      { label: "Compare to yesterday", value: "" },
      { label: "Purchase", value: "00.00 TK" },
    ],
  },
  {
    bgColor: "bg-[#a3d037]",
    title: "Monthly",
    details: [
      { label: "Sale", value: "125.00 TK" },
      { label: "Compare to Monthly", value: "" },
      { label: "Purchase", value: "200.00 TK" },
    ],
  },
  {
    bgColor: "bg-[#fec12e]",
    title: "Today",
    details: [
      { label: "Income", value: "50.00 TK" },
      { label: "Compare to today", value: "" },
      { label: "Expense", value: "36.00 TK" },
    ],
  },
  {
    bgColor: "bg-[#ae78f0]",
    title: "Monthly",
    details: [
      { label: "Income", value: "36000.00 TK" },
      { label: "Expense", value: "2000.00 TK" },
    ],
  },
  {
    bgColor: "bg-[#ff0000]",
    title: "Liabilities (Due)",
    details: [
      { label: "Payable", value: "1200000000.00 TK" },
      { label: "Purchase", value: "1596356.00 TK" },
    ],
  },
  {
    bgColor: "bg-[#a3d037]",
    title: "Sms Info",
    details: [
      { label: "Balance", value: "0.00 TK" },
      { label: "Credit Limit", value: "20.00 TK" },
    ],
  },
  {
    bgColor: "bg-[#fec12e]",
    title: "Available Amount",
    details: [
      { label: "Balance", value: "369521452330.00 TK" },
      { label: "Compare to last time", value: "" },
    ],
  },
];

const DashboardPage = () => {
  return (
    <div className="container mx-auto py-6 px-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cardData.map((card, index) => (
          <Card
            key={index}
            className={`${card.bgColor} text-white shadow-sm shadow-slate-400`}
          >
            <CardHeader>
              <CardTitle className="text-center font-bold">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {card.details.map((detail, idx) => (
                <div key={idx}>
                  {detail.label.startsWith("Compare to") ? (
                    <span className="text-white">{detail.label}</span>
                  ) : (
                    <CardTitle className="text-[15px] ">
                      {detail.label}:
                      <span className=" text-[18px] font-bold">
                        {detail.value}
                      </span>
                    </CardTitle>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <Amountable />
      <Charts />

      <Footer />
    </div>
  );
};

export default DashboardPage;
