"use server";
//Dependencies
import Quotation from "../Model/addquationmod";
import { connectToDB } from "../dbcon";

// Fetch Quotation
export const fetchQuotation = async (q, page = 1, limit = 10) => {
  try {
    await connectToDB();

    // Create a filter object based on the search query
    const filter = q
      ? {
          $or: [
            { quotationId: { $regex: q, $options: "i" } },
            { customerName: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    // Calculate total quotations and total pages
    const totalQuotations = await Quotation.countDocuments(filter);
    const totalPages = Math.ceil(totalQuotations / limit);

    // Fetch quotations for the specified page
    const quotations = await Quotation.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Serialize quotation data for client-side use
    const serializedQuotations = quotations.map((quote) => ({
      ...quote,
      _id: quote._id.toString(), // Convert _id to a simple string
      createdAt: quote.createdAt ? quote.createdAt.toISOString() : null,
      updatedAt: quote.updatedAt ? quote.updatedAt.toISOString() : null,
      quotes: quote.quotes.map((item) => ({
        ...item,
        _id: item._id.toString(), // Convert nested _id to a simple string
      })),
    }));

    return { quotations: serializedQuotations, totalPages };
  } catch (error) {
    console.error("Error fetching quotation:", error.message);
    throw new Error(
      "Unable to retrieve quotation data. Please try again later."
    );
  }
};
