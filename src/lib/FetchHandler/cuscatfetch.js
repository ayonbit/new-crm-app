"use server";
// Dependencies
import CustomerCategory from "../Model/cuscatmod";
import { connectToDB } from "../dbcon";

// Fetch customer category
export const fetchCustomerCategory = async () => {
  try {
    await connectToDB();
    const category = await CustomerCategory.find({});
    // Convert Mongoose documents to plain objects
    const plainCategory = category.map((cat) => cat.toObject());
    return plainCategory;
  } catch (error) {
    console.error("Error fetching customer category:", error.message);
    throw new Error("Failed to fetch customer category");
  }
};
