"use server";
// Dependencies
import CustomerCategory from "../Model/cuscatmod";
import { connectToDB } from "../dbcon";

// Fetch customer category
export const fetchCustomerCategory = async () => {
  try {
    await connectToDB();
    const category = await CustomerCategory.find({}).lean();
    const serializedCategory = category.map((cat) => ({
      ...cat,
      _id: cat._id.toString(), // Convert ObjectId to string
      createdAt: cat.createdAt ? cat.createdAt.toISOString() : null, // Convert Date to ISO string
      updatedAt: cat.updatedAt ? cat.updatedAt.toISOString() : null,
    }));

    return serializedCategory;
  } catch (error) {
    console.error("Error fetching customer category:", error.message);
    throw new Error("Failed to fetch customer category");
  }
};
