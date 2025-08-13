import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Contact from "@/app/models/contact";

// Update contact
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 fix: params is now Promise-based
) {
  try {
    await connectDB();
    const body = await req.json();

    const { id } = await context.params; // 👈 await to unwrap
    const contact = await Contact.findByIdAndUpdate(id, body, { new: true });

    if (!contact) {
      return NextResponse.json({ message: "Contact not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Contact updated", data: contact });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update" }, { status: 500 });
  }
}

// Delete contact
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return NextResponse.json({ message: "Contact not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 });
  }
}
