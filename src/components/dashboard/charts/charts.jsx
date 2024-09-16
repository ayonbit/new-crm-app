import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "DBBL", amount: 1455735 },
  { name: "CashInHand", amount: 1681306 },
  { name: "RMSCashInHand", amount: 3846791 },
  { name: "MBL", amount: 2186425 },
  { name: "UBL", amount: 1681094 },
  { name: "DBBL", amount: 3188332 },
  { name: "Bkash Account", amount: 1668415 },
  { name: "Nogod", amount: 83658 },
  { name: "Shamim Personal", amount: 4396376 },
  { name: "RMS- UB CC account", amount: 167182 },
  { name: "RMS- NBL", amount: 4821034 },
  { name: "RMS- Pubali Bank", amount: 528900 },
  { name: "RMS- IBL", amount: 157000 },
  { name: "Correction", amount: 8372837 },
  { name: "Return Goods", amount: 2350307 },
];

const Charts = () => {
  return (
    <Card className="bg-white text-black my-4 shadow-lg shadow-slate-400">
      <CardHeader>
        <CardTitle className="text-center font-bold">
          Financial Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400} className="">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Charts;
