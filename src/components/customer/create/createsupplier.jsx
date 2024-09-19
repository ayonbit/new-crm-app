// Dependencies
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

//Create Customer Form
const Createsupplier = () => {
  return (
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
        <Label htmlFor="companyName" className="w-1/4 text-lg font-bold">
          Company Name
        </Label>
        <Input
          type="text"
          id="companyName"
          name="companyName"
          placeholder="Enter Company Name"
          className="w-2/4 p-2 border rounded  focus-visible:outline-none"
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

      <hr className="mb-8" />
      <Button
        variant="custom"
        className="flex items-center justify-start space-x-2"
      >
        Save Supplier
      </Button>
    </form>
  );
};

export default Createsupplier;
