import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import Product from '../../models/Product';

// ================= GET =================
export async function GET() {
  try {
    await dbConnect();

    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: products,
    });

  } catch (error) {
    console.error('GET ERROR:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// ================= POST =================
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Calculate discounted price
    const price = Number(body.price) || 0;
    const discount = Number(body.discountPercentage) || 0;

    const discountedPrice = price - (price * discount / 100);

    // Convert string → array
    const toArray = (value: any) => {
      if (Array.isArray(value)) return value;

      if (typeof value === 'string') {
        return value
          .split(',')
          .map((item: string) => item.trim())
          .filter(Boolean);
      }

      return [];
    };

    const productData = {
      ...body,
      price,
      discountPercentage: discount,
      discountedPrice,
      benefits: toArray(body.benefits),
      ingredients: toArray(body.ingredients),
    };

    const product = await Product.create(productData);

    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('POST ERROR:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}