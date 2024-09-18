// Dependencies
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FaEye } from "react-icons/fa";

// Customer Create Form
const CustomerCreate = () => {
  return (
    <div className="m-2 h-screen">
      <Card className="p-6 pr-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Add New Customer</h1>
          <Button variant="custom" className="flex items-center space-x-2">
            <FaEye size={16} />
            <span>View Customer</span>
          </Button>
        </div>
        <hr className="mb-4" />
        <form className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="name" className="w-1/4 text-lg font-bold">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              className="w-2/4 p-2 border rounded  focus-visible:outline-none"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="email" className="w-1/4 text-lg font-bold">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="phone" className="w-1/4 text-lg font-bold">
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="address" className="w-1/4 text-lg font-bold">
              Address
            </Label>
            <Textarea
              id="address"
              name="address"
              placeholder="Enter address"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="category" className="w-1/4 text-lg font-bold">
              Customer Category <span className="text-red-500">*</span>
            </Label>
            <select
              id="category"
              name="category"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
              required
            >
              <option value="">Select category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="openingBalance" className="w-1/4 text-lg font-bold">
              Opening Balance <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              id="openingBalance"
              name="openingBalance"
              placeholder="Enter opening balance"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
              required
              style={{ "-moz-appearance": "textfield" }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="dueLimit" className="w-1/4 text-lg font-bold">
              Due Limit <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              id="dueLimit"
              name="dueLimit"
              placeholder="Enter due limit"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
              required
              style={{ "-moz-appearance": "textfield" }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="setDefault" className="w-1/4 text-lg font-bold">
              Set Default <span className="text-red-500">*</span>
            </Label>
            <Checkbox id="setDefault" name="setDefault" className="" required />
          </div>
          <hr className="mb-8" />
          <Button
            variant="custom"
            className="flex items-center justify-start space-x-2"
          >
            Save Customer
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CustomerCreate;
