import { NextRequest, NextResponse } from "next/server";
import Contact from "@/app/models/contact";

// Update contact
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } } // ✅ plain object, no Promise here
) {
  // Prevent build crash if env var missing
  if (!process.env.MONGODB_URI) {
    return NextResponse.json(
      { message: "Database connection not configured" },
      { status: 500 }
    );
  }

  // Lazy import DB connection so it's only loaded when route runs
  const connectDB = (await import("@/app/lib/db")).default;
  await connectDB();

  try {
    const body = await req.json();
    const contact = await Contact.findByIdAndUpdate(context.params.id, body, {
      new: true,
    });

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
  context: { params: { id: string } }
) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json(
      { message: "Database connection not configured" },
      { status: 500 }
    );
  }

  const connectDB = (await import("@/app/lib/db")).default;
  await connectDB();

  try {
    const contact = await Contact.findByIdAndDelete(context.params.id);

    if (!contact) {
      return NextResponse.json({ message: "Contact not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 });
  }
}
