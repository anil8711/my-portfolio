import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  discountPercentage: number;
  discountedPrice: number;
  stock: number;
  description: string;
  benefits: string[];
  ingredients: string[];
  usage: string;
  isActive: boolean;
  isFeatured: boolean;
  mainImage: string;
  additionalImages: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    discountedPrice: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    benefits: [{ type: String }],
    ingredients: [{ type: String }],
    usage: { type: String },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    mainImage: { type: String, required: true },
    additionalImages: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);