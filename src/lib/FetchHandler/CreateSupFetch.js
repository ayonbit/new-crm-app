"use server";
// Dependencies
import Supplier from "../Model/AddSupplierModel";
import { connectToDB } from "../dbcon";

//Fetch supplier data
export const fetchSupplier = async (q, page = 1, limit = 10) => {
  try {
    await connectToDB();

    const filter = q
      ? {
          $or: [
            { supplierName: { $regex: q, $options: "i" } },
            { supplierEmail: { $regex: q, $options: "i" } },
            { supplierPhone: { $regex: q, $options: "i" } },
            { supplierCode: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const totalSuppliers = await Supplier.countDocuments(filter);
    const totalPages = Math.ceil(totalSuppliers / limit);

    const suppliers = await Supplier.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const serializedSuppliers = suppliers.map((sup) => ({
      ...sup,
      _id: sup._id.toString(),
      createdAt: sup.createdAt ? sup.createdAt.toISOString() : null,
      updatedAt: sup.updatedAt ? sup.updatedAt.toISOString() : null,
    }));

    return { suppliers: serializedSuppliers, totalPages };
  } catch (error) {
    console.error("Error fetching suppliers:", error.message);
    throw new Error(
      "Unable to retrieve supplier data. Please try again later."
    );
  }
};

//Fetch single supplier data
export const fetchSingleSupplier = async (id) => {
  try {
    await connectToDB();

    const supplier = await Supplier.findById(id).lean();
    if (!supplier) {
      throw new Error("Supplier not found");
    }
    //console.log("Fetched supplier:", supplier); // Log fetched supplier
    return {
      ...supplier,
      _id: supplier._id.toString(), // Convert ObjectId to string
      createdAt: supplier.createdAt ? supplier.createdAt.toISOString() : null, // Convert Date to ISO string
      updatedAt: supplier.updatedAt ? supplier.updatedAt.toISOString() : null,
    };
  } catch (error) {
    console.error("Error fetching supplier:", error.message);
    throw new Error(
      "Unable to retrieve supplier data. Please try again later."
    );
  }
};
