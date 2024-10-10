"use server";
// Dependencies
import CustomerCategory from "../Model/cuscatmod";
import { connectToDB } from "../dbcon";

// Fetch customer category
export const fetchCustomerCategory = async (page = 1, limit = 10) => {
  try {
    await connectToDB();

    // Calculate total categories and total pages
    const totalCategories = await CustomerCategory.countDocuments({});
    const totalPages = Math.ceil(totalCategories / limit);

    // Fetch categories for the specified page
    const categories = await CustomerCategory.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Serialize category data for client-side use
    const serializedCategory = categories.map((cat) => ({
      ...cat,
      _id: cat._id.toString(), // Convert ObjectId to string
      createdAt: cat.createdAt ? cat.createdAt.toISOString() : null, // Convert Date to ISO string
      updatedAt: cat.updatedAt ? cat.updatedAt.toISOString() : null,
    }));

    return { categories: serializedCategory, totalPages };
  } catch (error) {
    console.error("Error fetching customer category:", error.message);
    throw new Error("Failed to fetch customer category");
  }
};

// Fetch single customer category
export const fetchSingleCustomerCategory = async (id) => {
  try {
    await connectToDB();

    const category = await CustomerCategory.findById(id).lean();

    if (!category) {
      throw new Error("Category not found");
    }
    return {
      //...category._doc, // Spread the document properties
      ...category,
      _id: category._id.toString(), // Convert ObjectId to string
      CategoryName: category.CategoryName.toString(),
      createdAt: category.createdAt ? category.createdAt.toISOString() : null, // Convert Date to ISO string
      updatedAt: category.updatedAt ? category.updatedAt.toISOString() : null,
    };
  } catch (error) {
    console.error("Error fetching single customer category:", error.message);
    throw new Error("Failed to fetch single customer category");
  }
};
