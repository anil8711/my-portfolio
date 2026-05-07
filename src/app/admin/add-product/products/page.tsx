'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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
  // ================= STATE =================
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

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);

  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('create'); // 'create' or 'list'
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingImages, setExistingImages] = useState<{ main: string; additional: string[] }>({ main: '', additional: [] });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalFilesRef = useRef<HTMLInputElement>(null);

  // ================= FETCH =================
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= INPUT =================
  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: e.target.checked }));
      return;
    }

    if (['price', 'discountPercentage', 'stock'].includes(name)) {
      const num = parseFloat(value) || 0;

      const price = name === 'price' ? num : formData.price;
      const discount = name === 'discountPercentage' ? num : formData.discountPercentage;

      const discountedPrice = price - (price * discount / 100);

      setFormData(prev => ({
        ...prev,
        [name]: num,
        discountedPrice,
      }));

      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ================= IMAGE HANDLING =================
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAdditionalImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = Array.from(e.target.files || []);

    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdditionalPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    setAdditionalImages(prev => [...prev, ...files]);
  };

  const removeMainImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
    setAdditionalPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // ================= BASE64 =================
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  // ================= EDIT PRODUCT =================
  const handleEdit = (product: any) => {
    setIsEditing(true);
    setEditingId(product._id);
    setActiveTab('create');
    
    // Populate form with product data
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      discountPercentage: product.discountPercentage,
      discountedPrice: product.discountedPrice,
      stock: product.stock,
      description: product.description,
      benefits: product.benefits?.join(', ') || '',
      ingredients: product.ingredients?.join(', ') || '',
      usage: product.usage || '',
      isActive: product.isActive,
      isFeatured: product.isFeatured,
    });
    
    // Store existing images
    setExistingImages({
      main: product.mainImage,
      additional: product.additionalImages || []
    });
    
    // Show existing images as previews
    setImagePreview(product.mainImage);
    setAdditionalPreviews(product.additionalImages || []);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ================= UPDATE PRODUCT =================
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    try {
      let mainImage = existingImages.main;
      let extraImages = [...existingImages.additional];

      // Upload new main image if selected
      if (selectedImage) {
        mainImage = await convertToBase64(selectedImage);
      }

      // Upload new additional images
      if (additionalImages.length > 0) {
        const newImages = await Promise.all(additionalImages.map(img => convertToBase64(img)));
        extraImages = [...extraImages, ...newImages];
      }

      const productData = {
        ...formData,
        mainImage,
        additionalImages: extraImages,
      };

      const res = await fetch(`/api/products/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const result = await res.json();

      if (!result.success) throw new Error();

      alert('✅ Product Updated Successfully!');
      resetForm();
      fetchProducts();
      setIsEditing(false);
      setEditingId(null);

    } catch (err) {
      console.error(err);
      alert('❌ Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedImage && !isEditing) {
      alert('Please upload a main product image');
      return;
    }

    if (isEditing) {
      await handleUpdate(e);
      return;
    }

    setIsSubmitting(true);

    try {
      const mainImage = await convertToBase64(selectedImage!);

      const extraImages = await Promise.all(
        additionalImages.map((img: File) => convertToBase64(img))
      );

      const productData = {
        ...formData,
        mainImage,
        additionalImages: extraImages,
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const result = await res.json();

      if (!result.success) throw new Error();

      alert('✅ Product Created Successfully!');
      resetForm();
      fetchProducts();

    } catch (err) {
      console.error(err);
      alert('❌ Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= RESET =================
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
    setExistingImages({ main: '', additional: [] });
    setIsEditing(false);
    setEditingId(null);
    
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (additionalFilesRef.current) additionalFilesRef.current.value = '';
  };

  // ================= DELETE PRODUCT =================
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        alert('Product deleted successfully');
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const viewProductDetails = (product: any) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const savings = formData.price - formData.discountedPrice;
  const savingsPercentage = formData.discountPercentage > 0 ? 
    ((savings / formData.price) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-emerald-600 to-amber-600 bg-clip-text text-transparent">
            Product Management
          </h1>
          <p className="text-gray-600 mt-2">Create and manage your premium Ayurvedic products</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => {
              setActiveTab('create');
              resetForm();
            }}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'create'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {isEditing ? 'Edit Product' : 'Create Product'}
          </button>
          <button
            onClick={() => {
              setActiveTab('list');
              resetForm();
            }}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'list'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Product List ({products.length})
          </button>
        </div>

        {/* Create/Edit Product Form */}
        {activeTab === 'create' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 px-8 py-6">
              <h2 className="text-2xl font-bold text-amber-300">
                {isEditing ? 'Edit Product' : 'Create New Product'}
              </h2>
              <p className="text-emerald-200 text-sm mt-1">
                {isEditing ? 'Update product information' : 'Fill in the details to add a new product'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Ashwagandha Gold Plus"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all text-gray-900"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the product, its origins, and key benefits..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all resize-none text-gray-900"
                />
              </div>

              {/* Pricing Section */}
              <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">💰 Pricing & Discount</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-gray-900"
                    />
                    {formData.discountPercentage > 0 && (
                      <p className="text-xs text-green-600 mt-1">
                        💰 Customer saves ₹{(formData.price * formData.discountPercentage / 100).toFixed(2)}
                      </p>
                    )}
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-gray-900"
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
                    <span className="text-sm font-semibold text-gray-700">Active Product</span>
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
                    <span className="text-sm font-semibold text-gray-700">Featured Product</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Benefits <span className="text-xs text-gray-500">(Comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}
                    placeholder="Boosts immunity, Reduces stress, Improves sleep"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ingredients <span className="text-xs text-gray-500">(Comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleInputChange}
                    placeholder="Ashwagandha, Tulsi, Giloy, Turmeric"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Usage Instructions
                </label>
                <textarea
                  name="usage"
                  rows={3}
                  value={formData.usage}
                  onChange={handleInputChange}
                  placeholder="How to use this product for best results..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all resize-none text-gray-900"
                />
              </div>

              {/* Main Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Main Product Image <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    {imagePreview ? 'Change Image' : 'Choose Image'}
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

              {/* Additional Images Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Images <span className="text-xs text-gray-500">(Optional - Max 5MB each)</span>
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
                    <p className="text-sm font-semibold text-gray-700 mb-2">Additional Images ({additionalPreviews.length})</p>
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

              {/* Price Summary Card */}
              {formData.price > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-emerald-100 to-amber-100 rounded-2xl p-6"
                >
                  <h3 className="font-bold text-gray-900 mb-3">📊 Price Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Original Price:</span>
                      <span className="font-semibold text-gray-900">₹{formData.price.toFixed(2)}</span>
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
                      <span className="text-lg font-bold text-gray-900">Final Price:</span>
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
                  {isSubmitting ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Product' : 'Create Product')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Product List */}
        {activeTab === 'list' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 px-8 py-6">
              <h2 className="text-2xl font-bold text-amber-300">Product List</h2>
              <p className="text-emerald-200 text-sm mt-1">Manage your product inventory</p>
            </div>

            <div className="p-8">
              {loadingProducts ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No products found</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    Create Your First Product
                  </button>
                </div>
              ) : (
                <>
                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-4">
                      <p className="text-sm text-gray-600">Total Products</p>
                      <p className="text-2xl font-bold text-emerald-700">{products.length}</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
                      <p className="text-sm text-gray-600">In Stock</p>
                      <p className="text-2xl font-bold text-green-700">{products.filter((p: any) => p.stock > 0).length}</p>
                    </div>
                    <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4">
                      <p className="text-sm text-gray-600">Featured</p>
                      <p className="text-2xl font-bold text-amber-700">{products.filter((p: any) => p.isFeatured).length}</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4">
                      <p className="text-sm text-gray-600">Active</p>
                      <p className="text-2xl font-bold text-purple-700">{products.filter((p: any) => p.isActive).length}</p>
                    </div>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                      >
                        <div className="relative h-48 w-full bg-gray-100 cursor-pointer" onClick={() => viewProductDetails(product)}>
                          {product.mainImage && (
                            <Image
                              src={product.mainImage}
                              alt={product.name}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                          )}
                          {product.discountPercentage > 0 && (
                            <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                              {product.discountPercentage}% OFF
                            </div>
                          )}
                          {product.isFeatured && (
                            <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                              ⭐ Featured
                            </div>
                          )}
                          {product.stock === 0 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                              <span className="text-white font-bold text-lg">Out of Stock</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-5">
                          <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                          <p className="text-sm text-emerald-600 mb-2">{product.category}</p>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                          
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              {product.discountPercentage > 0 ? (
                                <>
                                  <span className="text-xl font-bold text-emerald-600">₹{product.discountedPrice}</span>
                                  <span className="text-gray-400 line-through ml-2 text-sm">₹{product.price}</span>
                                </>
                              ) : (
                                <span className="text-xl font-bold text-emerald-600">₹{product.price}</span>
                              )}
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
                            </span>
                          </div>
                          
                          {/* Additional Images Thumbnails */}
                          {product.additionalImages && product.additionalImages.length > 0 && (
                            <div className="flex gap-1 mb-3">
                              {product.additionalImages.slice(0, 3).map((img: string, idx: number) => (
                                <div key={idx} className="relative w-8 h-8 rounded overflow-hidden border border-gray-200">
                                  <Image src={img} alt={`thumb ${idx}`} fill className="object-cover" />
                                </div>
                              ))}
                              {product.additionalImages.length > 3 && (
                                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-600">
                                  +{product.additionalImages.length - 3}
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="flex-1 bg-amber-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => viewProductDetails(product)}
                              className="flex-1 bg-emerald-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-600 transition"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Product Detail Modal */}
      {showDetailModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-emerald-900 to-emerald-800 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-amber-300">Product Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-white hover:text-amber-300 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Main Image */}
                <div>
                  <div className="relative h-64 w-full rounded-xl overflow-hidden bg-gray-100 mb-4">
                    {selectedProduct.mainImage && (
                      <Image
                        src={selectedProduct.mainImage}
                        alt={selectedProduct.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  
                  {/* Additional Images */}
                  {selectedProduct.additionalImages && selectedProduct.additionalImages.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Additional Images</h3>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {selectedProduct.additionalImages.map((img: string, idx: number) => (
                          <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 flex-shrink-0">
                            <Image src={img} alt={`Additional ${idx + 1}`} fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Product Info */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
                  <p className="text-emerald-600 mb-4 font-semibold">{selectedProduct.category}</p>
                  
                  <div className="mb-4">
                    {selectedProduct.discountPercentage > 0 ? (
                      <>
                        <span className="text-3xl font-bold text-emerald-700">₹{selectedProduct.discountedPrice}</span>
                        <span className="text-gray-400 line-through ml-2">₹{selectedProduct.price}</span>
                        <span className="text-green-600 ml-2">({selectedProduct.discountPercentage}% OFF)</span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-emerald-700">₹{selectedProduct.price}</span>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${selectedProduct.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock} units)` : 'Out of Stock'}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-700">{selectedProduct.description}</p>
                  </div>
                  
                  {selectedProduct.benefits && selectedProduct.benefits.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Benefits</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {selectedProduct.benefits.map((b: string, i: number) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedProduct.ingredients && selectedProduct.ingredients.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Ingredients</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {selectedProduct.ingredients.map((i: string, idx: number) => (
                          <li key={idx}>{i}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedProduct.usage && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">How to Use</h4>
                      <p className="text-gray-700">{selectedProduct.usage}</p>
                    </div>
                  )}
                  
                  <div className="mt-6 flex gap-2">
                    <button
                      onClick={() => {
                        setShowDetailModal(false);
                        handleEdit(selectedProduct);
                      }}
                      className="px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition"
                    >
                      Edit Product
                    </button>
                    <span className={`px-2 py-1 rounded-full text-xs ${selectedProduct.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {selectedProduct.isActive ? 'Active' : 'Inactive'}
                    </span>
                    {selectedProduct.isFeatured && (
                      <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-700">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}