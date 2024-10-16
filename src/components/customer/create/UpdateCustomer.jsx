"use client";

// Dependencies
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
// Internal imports
import { updateCustomerHandler } from "@/lib/ActionHandler/customercreate";
import { fetchSingleCustomer } from "@/lib/FetchHandler/createcustfetch";
import { fetchCustomerCategory } from "@/lib/FetchHandler/cuscatfetch";

// Validation schema using yup
const customerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be at most 30 characters")
    .required("Name is required"),
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

const UpdateCustomer = () => {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState([]); // State for category data

  // Initialize the form
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
      category: "", // To be filled with fetched category data
      openingBalance: 0,
      dueLimit: 0,
      Status: "Active",
      setDefault: "false",
    },
  });

  // Fetch customer data by ID and update the form with the fetched values
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (id) {
        try {
          const customer = await fetchSingleCustomer(id);
          if (customer) {
            // Reset the form with fetched customer data
            reset({
              name: customer.name || "",
              email: customer.email || "",
              phone: customer.phone || "",
              address: customer.address || "",
              category: customer.category || "", // Pre-populate category field
              openingBalance: customer.openingBalance || 0,
              dueLimit: customer.dueLimit || 0,
              Status: customer.Status || "Active",
              setDefault: customer.setDefault || "false",
            });
          }
        } catch (error) {
          console.error("Failed to fetch customer:", error);
        }
      }
    };

    fetchCustomerData();
  }, [id, reset]);

  // Fetch category data
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const { categories } = await fetchCustomerCategory();
        setCategoryData(categories);
      } catch (error) {
        console.error("Failed to fetch customer categories:", error);
      }
    };
    fetchCategoryData();
  }, []);

  // Form submission handler for updating the customer
  const submitHandler = async (data) => {
    try {
      const result = await updateCustomerHandler({ id, ...data }); // Send updated data
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message || "Failed to update customer");
      }
    } catch (error) {
      console.error("Error updating customer:", error.message);
      toast.error("Failed to update customer");
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
      {/* Name Field */}
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

      {/* Email Field */}
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

      {/* Phone Field */}
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

      {/* Address Field */}
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

      {/* Category Dropdown */}
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
              value={field.value || ""} // Pre-populate the selected category
              onChange={(e) => field.onChange(e.target.value)} // Handle change
            >
              {/* <option value="">Select category</option> */}
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

      {/* Opening Balance Field */}
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

      {/* Due Limit Field */}
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

      {/* Status Radio Group */}
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
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Active" id="r1" />
                <Label htmlFor="r1">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Inactive" id="r2" />
                <Label htmlFor="r2">Inactive</Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.Status && (
          <p className="text-red-500 ml-4">{errors.Status.message}</p>
        )}
      </div>

      {/* Set Default Radio Group */}
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
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="default-true" />
                <Label htmlFor="default-true">True</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="default-false" />
                <Label htmlFor="default-false">False</Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.setDefault && (
          <p className="text-red-500 ml-4">{errors.setDefault.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit">Update Customer</Button>
    </form>
  );
};

export default UpdateCustomer;
