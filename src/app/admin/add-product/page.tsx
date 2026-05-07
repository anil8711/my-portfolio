'use client';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProductFormData {
  name: string;
  category: string;
  price: number;
  discountPercentage: number;
  discountedPrice: number;
  stock: number;
  description: string;
  benefits: string;
  ingredients: string;
  usage: string;
  isActive: boolean;
  isFeatured: boolean;
}

const categories = [
  'Immunity', 'Diabetes', 'Stress', 'Digestion', 
  'Skin Care', 'Mental Health', 'Energy', 'Detox', 
  'Weight Management', 'Hair Care', 'Liver Care', 'Heart Health'
];

export default function AddProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalFilesRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: 'Immunity',
    price: 0,
    discountPercentage: 0,
    discountedPrice: 0,
    stock: 0,
    description: '',
    benefits: '',
    ingredients: '',
    usage: '',
    isActive: true,
    isFeatured: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: target.checked });
    } else if (name === 'price' || name === 'discountPercentage' || name === 'stock') {
      const numValue = parseFloat(value) || 0;
      setFormData({ ...formData, [name]: numValue });
      
      if (name === 'price' || name === 'discountPercentage') {
        const price = name === 'price' ? numValue : formData.price;
        const discount = name === 'discountPercentage' ? numValue : formData.discountPercentage;
        const discountedPrice = price - (price * discount / 100);
        setFormData(prev => ({ ...prev, discountedPrice }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles: File[] = [];
    const validPreviews: string[] = [];
    
    files.forEach(file => {
      if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
        validFiles.push(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          validPreviews.push(reader.result as string);
          if (validPreviews.length === validFiles.length) {
            setAdditionalPreviews([...additionalPreviews, ...validPreviews]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert(`File ${file.name} is invalid. Only images under 5MB are allowed.`);
      }
    });
    
    setAdditionalImages([...additionalImages, ...validFiles]);
  };

  const removeMainImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAdditionalImage = (index: number) => {
    const newImages = additionalImages.filter((_, i) => i !== index);
    const newPreviews = additionalPreviews.filter((_, i) => i !== index);
    setAdditionalImages(newImages);
    setAdditionalPreviews(newPreviews);
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage) {
      alert('Please upload a main product image');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const mainImageBase64 = await convertToBase64(selectedImage);
      const additionalImagesBase64 = await Promise.all(additionalImages.map(img => convertToBase64(img)));
      
      const productData = {
        ...formData,
        benefits: formData.benefits,
        ingredients: formData.ingredients,
        mainImage: mainImageBase64,
        additionalImages: additionalImagesBase64,
      };
      
      // API Call to MongoDB
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(`✅ Product "${formData.name}" created successfully!`);
        resetForm();
      } else {
        alert(`❌ Failed: ${result.error}`);
      }
      
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Immunity',
      price: 0,
      discountPercentage: 0,
      discountedPrice: 0,
      stock: 0,
      description: '',
      benefits: '',
      ingredients: '',
      usage: '',
      isActive: true,
      isFeatured: false,
    });
    setSelectedImage(null);
    setImagePreview(null);
    setAdditionalImages([]);
    setAdditionalPreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (additionalFilesRef.current) additionalFilesRef.current.value = '';
  };

  const savings = formData.price - formData.discountedPrice;
  const savingsPercentage = formData.discountPercentage > 0 ? 
    ((savings / formData.price) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-200 to-emerald-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
            Add New Product
          </h1>
          <p className="text-emerald-600 mt-2">Create premium Ayurvedic products with automatic discount calculation</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 px-6 md:px-8 py-6">
            <h2 className="text-xl md:text-2xl font-bold text-amber-300">Product Information</h2>
            <p className="text-emerald-200 text-sm mt-1">Fill in the details below to add a new product</p>
          </div>

          <div className  ="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Ashwagandha Gold Plus"
                  className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-emerald-500 transition-all"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the product, its origins, and key benefits..."
                className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all resize-none"
              />
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-emerald-900 mb-4">💰 Pricing & Discount</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Base Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    value={formData.price || ''}
                    onChange={handleInputChange}
                    placeholder="e.g., 999"
                    min="0"
                    step="1"
                    className="w-full px-4 py-3 border-2 border-gray-200 text-black rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={formData.discountPercentage || ''}
                    onChange={handleInputChange}
                    placeholder="e.g., 25"
                    min="0"
                    max="100"
                    step="1"
                    className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
                  />
                  {formData.discountPercentage > 0 && (
                    <p className="text-xs text-green-600 mt-1">
                      💰 Customer saves ₹{(formData.price * formData.discountPercentage / 100).toFixed(2)}
                    </p>
                  )}
                </div>

                <div className="bg-white rounded-xl p-4 shadow-md">
                  <label className="block text-sm font-semibold text-emerald-900 mb-2">
                    Final Price
                  </label>
                  <div className="text-2xl md:text-3xl font-bold text-emerald-700">
                    ₹{formData.discountedPrice.toFixed(2)}
                  </div>
                  {formData.discountPercentage > 0 && (
                    <div className="text-xs text-green-600 mt-1">
                      🎉 {savingsPercentage}% OFF
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  required
                  value={formData.stock || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., 500"
                  min="0"
                  className="w-full px-4 py-3 text-black border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm font-semibold text-emerald-900">Active Product</span>
                </label>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm font-semibold text-emerald-900">Featured Product</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">
                  Benefits <span className="text-xs text-gray-500">(Comma-separated)</span>
                </label>
                <input
                  type="text"
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  placeholder="Boosts immunity, Reduces stress, Improves sleep"
                  className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">
                  Ingredients <span className="text-xs text-gray-500">(Comma-separated)</span>
                </label>
                <input
                  type="text"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleInputChange}
                  placeholder="Ashwagandha, Tulsi, Giloy, Turmeric"
                  className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-2">
                Usage Instructions
              </label>
              <textarea
                name="usage"
                rows={3}
                value={formData.usage}
                onChange={handleInputChange}
                placeholder="How to use this product for best results..."
                className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-2">
                Main Product Image <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Choose Image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <span className="text-sm text-gray-500">JPG, PNG, GIF up to 5MB</span>
              </div>
              
              {imagePreview && (
                <div className="mt-4">
                  <div className="relative inline-block">
                    <div className="relative h-40 w-40 rounded-xl overflow-hidden border-2 border-emerald-200 shadow-lg">
                      <Image
                        src={imagePreview}
                        alt="Product preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeMainImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-all"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-2">
                Additional Images <span className="text-xs text-gray-500">(Optional)</span>
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => additionalFilesRef.current?.click()}
                  className="px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300"
                >
                  Add More Images
                </button>
                <input
                  ref={additionalFilesRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesUpload}
                  className="hidden"
                />
                <span className="text-sm text-gray-500">You can select multiple images</span>
              </div>
              
              {additionalPreviews.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-emerald-900 mb-2">Additional Images ({additionalPreviews.length})</p>
                  <div className="flex flex-wrap gap-4">
                    {additionalPreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <div className="relative h-32 w-32 rounded-xl overflow-hidden border-2 border-gray-200 shadow-md">
                          <Image
                            src={preview}
                            alt={`Additional ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-all"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {formData.price > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-emerald-100 to-amber-100 rounded-2xl p-6"
              >
                <h3 className="font-bold text-emerald-900 mb-3">📊 Price Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-black">Original Price:</span>
                    <span className="font-semibold">₹{formData.price.toFixed(2)}</span>
                  </div>
                  {formData.discountPercentage > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Discount ({formData.discountPercentage}%):</span>
                        <span className="text-red-600">-₹{(formData.price * formData.discountPercentage / 100).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Customer Saves:</span>
                        <span className="text-green-600 font-bold">₹{savings.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                  <div className="border-t border-emerald-300 my-2"></div>
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-emerald-900">Final Price:</span>
                    <span className="text-2xl font-bold text-emerald-700">₹{formData.discountedPrice.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating Product...' : 'Create Product'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
}