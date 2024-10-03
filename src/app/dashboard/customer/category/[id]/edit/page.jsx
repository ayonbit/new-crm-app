"use client";
// Dependencies
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaListOl } from "react-icons/fa";
import * as yup from "yup";
//Internal Dependencies
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateCategoryHandler } from "@/lib/ActionHandler/cuscatcreate";
import { fetchSingleCustomerCategory } from "@/lib/FetchHandler/cuscatfetch";
import Link from "next/link";
// Define validation schema using yup
const categorySchema = yup.object().shape({
  CategoryName: yup
    .string()
    .min(3, "Category name must be at least 3 characters")
    .required("Category name is required"),
  Description: yup.string(),
  Amount: yup
    .number()
    .min(0, "Amount must be at least 0")
    .required("Amount is required"),
  AmountOf: yup
    .number()
    .min(0, "Amount of must be at least 0")
    .max(100, "Amount of must be at most 100")
    .required("Amount of is required"),
  Type: yup
    .string()
    .oneOf(["Amount", "Percent"], "Invalid Type")
    .required("Type is required"),
  Status: yup
    .string()
    .oneOf(["Active", "Inactive"], "Invalid Status")
    .required("Status is required"),
});

const EditCategory = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      CategoryName: "",
      Description: "",
      Amount: 0,
      AmountOf: 0,
      Type: "Amount",
      Status: "Active",
    },
  });

  useEffect(() => {
    if (id) {
      fetchSingleCustomerCategory(id)
        .then((data) => {
          reset(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching category data:", error);
          setLoading(false);
        });
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const result = await updateCategoryHandler(id, data);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message || "Failed to update customer category");
      }
    } catch (error) {
      console.error("Error updating customer category:", error.message);
      toast.error("Failed to update customer category");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2 h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <FaListOl className="mr-2" /> Edit Customer Category
            </div>
            <Link href={"/dashboard/customer/category"}>
              <Button
                size="sm"
                variant="custom"
                className="flex items-center space-x-2"
              >
                Back to List
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid grid-cols-1 gap-8 mt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center space-x-4">
              <Label htmlFor="CategoryName" className="w-1/3">
                Category Name
                <span className="text-red-500 ml-2">*</span>
              </Label>
              <Controller
                name="CategoryName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="w-2/3 focus-visible:outline-none"
                    placeholder="Enter category name"
                    id="CategoryName"
                  />
                )}
              />
            </div>
            {errors.CategoryName && (
              <p className="text-red-500 mt-1">{errors.CategoryName.message}</p>
            )}

            <div className="flex items-center space-x-4">
              <Label htmlFor="Description" className="w-1/3">
                Description
              </Label>
              <Controller
                name="Description"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="w-2/3 focus-visible:outline-none"
                    placeholder="Enter description"
                    id="Description"
                  />
                )}
              />
            </div>
            {errors.Description && (
              <p className="text-red-500 mt-1">{errors.Description.message}</p>
            )}

            <div className="flex items-center space-x-4">
              <Label htmlFor="Amount" className="w-1/3">
                Amount
              </Label>
              <Controller
                name="Amount"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    className="w-2/3 focus-visible:outline-none"
                    placeholder="Amount number"
                    id="Amount"
                  />
                )}
              />
            </div>
            {errors.Amount && (
              <p className="text-red-500 mt-1">{errors.Amount.message}</p>
            )}

            <div className="flex items-center space-x-4">
              <Label htmlFor="AmountOf" className="w-1/3">
                Amount (%)
              </Label>
              <Controller
                name="AmountOf"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    className="w-2/3 focus-visible:outline-none"
                    placeholder="Amount number"
                    id="AmountOf"
                  />
                )}
              />
            </div>
            {errors.AmountOf && (
              <p className="text-red-500 mt-1">{errors.AmountOf.message}</p>
            )}

            <div className="flex items-center space-x-4">
              <Label htmlFor="Type" className="w-1/3">
                Amount Type
              </Label>
              <Controller
                name="Type"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex items-center space-x-4"
                    id="Type"
                  >
                    <RadioGroupItem
                      className="w-1/3"
                      value="Amount"
                      id="amount"
                    />
                    <Label htmlFor="amount">Amount</Label>
                    <RadioGroupItem
                      className="w-1/3"
                      value="Percent"
                      id="percent"
                    />
                    <Label htmlFor="percent">Percent</Label>
                  </RadioGroup>
                )}
              />
            </div>
            {errors.Type && (
              <p className="text-red-500 mt-1">{errors.Type.message}</p>
            )}

            <div className="flex items-center space-x-4">
              <Label htmlFor="Status" className="w-1/3">
                Status
              </Label>
              <Controller
                name="Status"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex items-center space-x-4"
                    id="Status"
                  >
                    <RadioGroupItem
                      className="w-1/3"
                      value="Active"
                      id="active"
                    />
                    <Label htmlFor="active">Active</Label>
                    <RadioGroupItem
                      className="w-1/3"
                      value="Inactive"
                      id="inactive"
                    />
                    <Label htmlFor="inactive">Inactive</Label>
                  </RadioGroup>
                )}
              />
            </div>
            {errors.Status && (
              <p className="text-red-500 mt-1">{errors.Status.message}</p>
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <Button type="submit" variant="custom">
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCategory;
