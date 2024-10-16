import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";

// Internal Imports
import { CreateSupplierHandler } from "@/lib/ActionHandler/SupplierCreate";

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
    .required("Name is required"),
  companyPhone: yup.string().required("Phone is required"),
  companyAddress: yup.string(),
  openingBalance: yup
    .number()
    .min(0, "Opening balance must be at least 0")
    .required("Opening balance is required"),
});

const CreateSupplier = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(supplierSchema),
    defaultValues: {
      supplierName: "",
      companyName: "",
      companyPhone: "",
      companyAddress: "",
      companyEmail: "",
      openingBalance: 0,
    },
  });

  // Submit form data
  const onSubmit = async (data) => {
    try {
      const result = await CreateSupplierHandler(data);
      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message || "Failed to Create Supplier");
      }
    } catch (error) {
      console.error("Error Creating Supplier:", error.message);
      toast.error("Failed to Create Supplier");
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
              placeholder="Enter Supplier Name"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          )}
        />
        {errors.supplierName && (
          <p className="text-red-500">{errors.supplierName.message}</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="companyName" className="w-1/4 text-lg font-bold">
          Company Name
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
          <p className="text-red-500">{errors.companyName.message}</p>
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
              placeholder="Enter Email"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          )}
        />
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
              placeholder="Enter Phone Number"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          )}
        />
        {errors.companyPhone && (
          <p className="text-red-500">{errors.companyPhone.message}</p>
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
              placeholder="Enter Address"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
            />
          )}
        />
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
              placeholder="Enter Opening Balance"
              className="w-2/4 p-2 border rounded focus-visible:outline-none"
              style={{ MozAppearance: "textfield" }}
            />
          )}
        />
        {errors.openingBalance && (
          <p className="text-red-500">{errors.openingBalance.message}</p>
        )}
      </div>
      <hr className="mb-8" />
      <Button
        type="submit"
        variant="custom"
        className="flex items-center justify-start space-x-2"
      >
        Save Supplier
      </Button>
    </form>
  );
};

export default CreateSupplier;
