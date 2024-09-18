// Dependencies
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaCheckCircle, FaDownload } from "react-icons/fa";

// Customer Upload CSV
const CustomerUpload = () => {
  return (
    <div className="m-2 h-screen">
      <Card className="p-8 h-96">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold ">Upload Customer:</h1>
          <Button variant="custom" className="flex items-center space-x-2">
            <FaDownload size={12} />
            <span>Download Sample</span>
          </Button>
        </div>
        <form className="space-y-4">
          <div className="border-2 border-slate-600 p-6 w-1/3">
            <div className="flex flex-col mb-4">
              <Label htmlFor="file" className="text-lg font-bold mb-2">
                Upload File
              </Label>
              <Input type="file" id="file" className=" p-2 border rounded" />
            </div>
            <Button
              variant="custom"
              className=" flex items-center justify-center space-x-2"
            >
              <FaCheckCircle size={12} className="mr-2" />
              <span>Upload Customer</span>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CustomerUpload;
