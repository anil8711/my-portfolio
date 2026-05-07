'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Product {
  _id: string;
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
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            <svg className="w-16 h-16 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7L9 18l-5-5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No Products Found</h2>
          <p className="text-gray-500">No products available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-4 bg-white rounded-2xl shadow-lg mb-4">
            <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7L9 18l-5-5" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-emerald-600 to-amber-600 bg-clip-text text-transparent">
            Our Premium Collection
          </h1>
          <p className="text-gray-600 mt-2">Discover our range of authentic Ayurvedic products</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg"
          >
            <p className="text-sm opacity-90">Total Products</p>
            <p className="text-3xl font-bold">{products.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 text-white shadow-lg"
          >
            <p className="text-sm opacity-90">In Stock</p>
            <p className="text-3xl font-bold">{products.filter(p => p.stock > 0).length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-5 text-white shadow-lg"
          >
            <p className="text-sm opacity-90">Featured</p>
            <p className="text-3xl font-bold">{products.filter(p => p.isFeatured).length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg"
          >
            <p className="text-sm opacity-90">Active</p>
            <p className="text-3xl font-bold">{products.filter(p => p.isActive).length}</p>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {product.mainImage && (
                  <Image
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                
                {/* Discount Badge */}
                {product.discountPercentage > 0 && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg z-10">
                    {product.discountPercentage}% OFF
                  </div>
                )}
                
                {/* Featured Badge */}
                {product.isFeatured && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg z-10 flex items-center gap-1">
                    <span>⭐</span> Featured
                  </div>
                )}
                
                {/* Out of Stock Overlay */}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10 backdrop-blur-sm">
                    <span className="text-white font-bold text-lg px-4 py-2 bg-red-600 rounded-full">Out of Stock</span>
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1 group-hover:text-emerald-600 transition">
                  {product.name}
                </h3>
                <p className="text-xs text-emerald-600 font-semibold mb-2">{product.category}</p>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                {/* Price Section */}
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
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    product.stock > 0 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
                  </span>
                </div>
                
                {/* Additional Images Thumbnails */}
                {/* {product.additionalImages && product.additionalImages.length > 0 && (
                  <div className="flex gap-1 mt-3 pt-3 border-t border-gray-100">
                    {product.additionalImages.slice(0, 3).map((img, idx) => (
                      <div key={idx} className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-200">
                        <Image src={img} alt={`thumb ${idx}`} fill className="object-cover" />
                      </div>
                    ))}
                    {product.additionalImages.length > 3 && (
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-600 font-semibold">
                        +{product.additionalImages.length - 3}
                      </div>
                    )}
                  </div>
                )} */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}