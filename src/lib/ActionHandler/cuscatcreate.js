"use server";
// Dependencies
import CustomerCategory from "../Model/cuscatmod";
import { connectToDB } from "../dbcon";

// Create customer category
export const CreateCategoryHandler = async (formData) => {
  const { CategoryName, Description, Amount, AmountOf, Type, Status } =
    formData;

  try {
    // Connect to the database
    await connectToDB();

    // Validation
    const existingCategory = await CustomerCategory.findOne({ CategoryName });
    if (existingCategory) {
      return { success: false, message: "Category already exists" };
    }
    const newCategory = new CustomerCategory({
      CategoryName,
      Description,
      AmountOf,
      Amount,
      Type,
      Status,
    });

    // Save the new category
    await newCategory.save();

    return { success: true, message: "Category created successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
