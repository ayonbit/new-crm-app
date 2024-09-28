"use client";
// Dependencies
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
// Internal imports
import { CreateCustomerHandler } from "@/lib/ActionHandler/customercreate";
import { fetchCustomerCategory } from "@/lib/FetchHandler/cuscatfetch";

// Define validation schema using yup
const customerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters")
    .required("Name is required"),
  //email: yup.string().email("Invalid email"),
  phone: yup.string().required("Phone is required"),
  address: yup.string(),
  category: yup.string().required("Customer category is required"),
  openingBalance: yup
    .number()
    .min(0, "Opening balance must be at least 0")
    .required("Opening balance is required"),
  dueLimit: yup
    .number()
    .min(0, "Due limit must be at least 0")
    .required("Due limit is required"),
  Status: yup.string().required("Status is required"),
  setDefault: yup.string().required("Set Default is required"),
});

// Create Customer Form
const Createcustomer = () => {
  // For category fetch
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchCatData = async () => {
      const category = await fetchCustomerCategory();
      setCategoryData(category);
    };
    fetchCatData();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      category: "",
      openingBalance: 0,
      dueLimit: 0,
      Status: "Active",
      setDefault: "false",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await CreateCustomerHandler(data);
      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message || "Failed to create customer");
      }
    } catch (error) {
      console.error("Error creating customer:", error.message);
      toast.error("Failed to create customer");
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center space-x-2">
        <Label htmlFor="name" className="w-1/4 text-lg font-bold">
          Name <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="name"
              placeholder="Enter name"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 ml-6">{errors.name.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="email" className="w-1/4 text-lg font-bold">
          Email
        </Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              id="email"
              placeholder="Enter email"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 ml-4">{errors.email.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="phone" className="w-1/4 text-lg font-bold">
          Phone <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="tel"
              id="phone"
              placeholder="Enter phone number"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          )}
        />
        {errors.phone && (
          <p className="text-red-500 ml-4">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="address" className="w-1/4 text-lg font-bold">
          Address
        </Label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              id="address"
              placeholder="Enter address"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          )}
        />
        {errors.address && (
          <p className="text-red-500 ml-4">{errors.address.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="category" className="w-1/4 text-lg font-bold">
          Customer Category <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              id="category"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            >
              <option value="">Select category</option>
              {categoryData.map((cat) => (
                <option key={cat._id} value={cat.CategoryName}>
                  {cat.CategoryName}
                </option>
              ))}
            </select>
          )}
        />
        {errors.category && (
          <p className="text-red-500 ml-4">{errors.category.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="openingBalance" className="w-1/4 text-lg font-bold">
          Opening Balance <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="openingBalance"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              id="openingBalance"
              placeholder="Enter opening balance"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          )}
        />
        {errors.openingBalance && (
          <p className="text-red-500 ml-4">{errors.openingBalance.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="dueLimit" className="w-1/4 text-lg font-bold">
          Due Limit <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="dueLimit"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              id="dueLimit"
              placeholder="Enter due limit"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          )}
        />
        {errors.dueLimit && (
          <p className="text-red-500 ml-4">{errors.dueLimit.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="Status" className="w-1/4 text-lg font-bold">
          Status <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="Status"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex items-center space-x-2 w-2/4"
              id="Status"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="w-4 h-4 rounded-full border border-gray-300 checked:bg-blue-600 checked:border-transparent focus:outline-none"
                  value="Active"
                  id="active"
                />
                <Label htmlFor="active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="w-4 h-4 rounded-full border border-gray-300 checked:bg-blue-600 checked:border-transparent focus:outline-none"
                  value="Inactive"
                  id="inactive"
                />
                <Label htmlFor="inactive">Inactive</Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.Status && (
          <p className="text-red-500 mt-1">{errors.Status.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="setDefault" className="w-1/4 text-lg font-bold">
          Set Default <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="setDefault"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex items-center space-x-2 w-2/4"
              id="setDefault"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="w-4 h-4 rounded-full border border-gray-300 checked:bg-blue-600 checked:border-transparent focus:outline-none"
                  value="true"
                  id="true"
                />
                <Label htmlFor="true">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="w-4 h-4 rounded-full border border-gray-300 checked:bg-blue-600 checked:border-transparent focus:outline-none"
                  value="false"
                  id="false"
                />
                <Label htmlFor="false">No</Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.setDefault && (
          <p className="text-red-500 mt-1">{errors.setDefault.message}</p>
        )}
      </div>

      <hr className="mb-8" />
      <Button
        variant="custom"
        className="flex items-center justify-start space-x-2"
        type="submit"
      >
        Save Customer
      </Button>
    </form>
  );
};

export default Createcustomer;
