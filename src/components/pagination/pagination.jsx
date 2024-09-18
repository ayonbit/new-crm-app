"use client";
// Dependencies
import { Button } from "@/components/ui/button";

const Pagination = () => {
  return (
    <div className="flex items-center  w-full  ">
      <span className="text-gray-600">Showing 1 to 20 of 1000 entries</span>
      <div className="ml-auto flex space-x-2">
        <Button variant="custom" size="sm">
          Previous
        </Button>
        <Button variant="custom" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
