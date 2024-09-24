// Dependencies

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Form } from "@/components/ui/form";

//Add Customer Category Component
const AddCustomerCategory = () => {
  return (
    <Form>
      <form className="grid grid-cols-1 gap-8 mt-4">
        <div className="flex items-center space-x-4">
          <Label className="w-1/3">
            Category Name
            <span className="text-red-500 ml-2">*</span>
          </Label>

          <Input
            className="w-2/3 focus-visible:outline-none"
            placeholder="Enter category name"
            name="CategoryName"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Label className="w-1/3">Description</Label>
          <Input
            className="w-2/3 focus-visible:outline-none"
            placeholder="Enter description"
            name="Description"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Label className="w-1/3">Amount Of</Label>
          <Input
            type="number"
            className="w-2/3 focus-visible:outline-none"
            placeholder="Amount number"
            name="AmountOf"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Label className="w-1/3">Amount</Label>
          <Input
            type="number"
            className="w-2/3 focus-visible:outline-none"
            placeholder="Amount number"
            name="Amount"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Label className="w-1/3">Type</Label>
          <RadioGroup
            className="flex items-center space-4"
            defaultValue="Amount"
            name="Type"
          >
            <RadioGroupItem className="w-1/3" value="Amount" id="amount" />
            <Label htmlFor="amount">Amount</Label>

            <RadioGroupItem className="w-1/3" value="Percent" id="percent" />
            <Label htmlFor="percent">Percent</Label>
          </RadioGroup>
        </div>
        <div className="flex items-center space-x-4">
          <Label className="w-1/3">Status</Label>
          <RadioGroup
            className="flex items-center space-4 "
            defaultValue="Active"
            name="Status"
          >
            <RadioGroupItem className="w-1/3" value="Active" id="active" />
            <Label htmlFor="active">Active</Label>

            <RadioGroupItem className="w-1/3" value="Inactive" id="inactive" />
            <Label htmlFor="inactive">Inactive</Label>
          </RadioGroup>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="custom">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddCustomerCategory;
