"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
// Internal Dependencies
import { updateSupplierHandler } from "@/lib/ActionHandler/SupplierCreate";
import { fetchSingleSupplier } from "@/lib/FetchHandler/CreateSupFetch";

// Define validation schema using yup
const supplierSchema = yup.object().shape({
  supplierName: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be at most 30 characters")
    .required("Name is required"),
  companyName: yup
    .string()
    .min(3, "Name must be at least 3 characters long")
    .required("Company name is required"),
  companyPhone: yup.string().required("Phone is required"),
  companyAddress: yup.string(),
  openingBalance: yup
    .number()
    .min(0, "Opening balance must be at least 0")
    .required("Opening balance is required"),
});

const UpdateSupplier = () => {
  const { id } = useParams();
  // Initialize the form

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(supplierSchema),
    defaultValues: {
      supplierName: "",
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      companyAddress: "",
      openingBalance: 0,
    },
  });

  // Fetch supplier data by ID and update the form with the fetched values
  useEffect(() => {
    const fetchSupplierData = async () => {
      if (id) {
        try {
          const supplier = await fetchSingleSupplier(id);

          if (supplier) {
            reset({
              supplierName: supplier.supplierName || "",
              companyName: supplier.companyName || "",
              companyEmail: supplier.companyEmail || "",
              companyPhone: supplier.companyPhone || "",
              companyAddress: supplier.companyAddress || "",
              openingBalance: supplier.openingBalance || 0,
            });
          }
        } catch (error) {
          console.error("Error fetching supplier data:", error.message);
        }
      }
    };
    fetchSupplierData();
  }, [id, reset]);

  // Submit form data
  const onSubmit = async (data) => {
    try {
      const result = await updateSupplierHandler(id, data);

      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message || "Failed to update supplier");
      }
    } catch (error) {
      console.error("Error updating supplier:", error.message);
      toast.error("Failed to update supplier");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center space-x-2">
        <Label htmlFor="supplierName" className="w-1/4 text-lg font-bold">
          Name <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="supplierName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="supplierName"
              placeholder="Enter name"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          )}
        />
        {errors.supplierName && (
          <p className="text-red-500 ml-6">{errors.supplierName.message}</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="companyName" className="w-1/4 text-lg font-bold">
          Company Name <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="companyName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              id="companyName"
              placeholder="Enter Company Name"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          )}
        />
        {errors.companyName && (
          <p className="text-red-500 ml-4">{errors.companyName.message}</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="companyEmail" className="w-1/4 text-lg font-bold">
          Email
        </Label>
        <Controller
          name="companyEmail"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              id="companyEmail"
              placeholder="Enter email"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          )}
        />
        {errors.companyEmail && (
          <p className="text-red-500 ml-4">{errors.companyEmail.message}</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="companyPhone" className="w-1/4 text-lg font-bold">
          Phone <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="companyPhone"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="tel"
              id="companyPhone"
              placeholder="Enter phone number"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          )}
        />
        {errors.companyPhone && (
          <p className="text-red-500 ml-4">{errors.companyPhone.message}</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="companyAddress" className="w-1/4 text-lg font-bold">
          Address
        </Label>
        <Controller
          name="companyAddress"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              id="companyAddress"
              placeholder="Enter address"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          )}
        />
        {errors.companyAddress && (
          <p className="text-red-500 ml-4">{errors.companyAddress.message}</p>
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
              style={{ MozAppearance: "textfield" }}
            />
          )}
        />
        {errors.openingBalance && (
          <p className="text-red-500 ml-4">{errors.openingBalance.message}</p>
        )}
      </div>
      <hr className="mb-8" />
      <Button
        type="submit"
        variant="custom"
        className="flex items-center justify-start space-x-2"
      >
        Update Supplier
      </Button>
    </form>
  );
};

export default UpdateSupplier;
