"use client";
// Dependencies

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaPlus } from "react-icons/fa";

const AddCustomerCategory = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="custom">
            <FaPlus size={10} className="mr-2" /> Create New
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-lg p-6">
          <DialogTitle>Create New Customer Category</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new customer category.
          </DialogDescription>
          <Form className="grid grid-cols-1 gap-4 mt-4">
            <div className="flex items-center space-x-4">
              <Label className="w-1/3">Category Name</Label>
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
              <RadioGroup className="w-2/3" defaultValue="Amount" name="Type">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Amount" id="amount" />
                  <Label htmlFor="amount">Amount</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Percent" id="percent" />
                  <Label htmlFor="percent">Percent</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex items-center space-x-4">
              <Label className="w-1/3">Status</Label>
              <RadioGroup className="w-2/3" defaultValue="Active" name="Status">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Active" id="active" />
                  <Label htmlFor="active">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Inactive" id="inactive" />
                  <Label htmlFor="inactive">Inactive</Label>
                </div>
              </RadioGroup>
            </div>
          </Form>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="custom">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCustomerCategory;
