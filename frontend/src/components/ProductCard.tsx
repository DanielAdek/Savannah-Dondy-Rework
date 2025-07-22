import React from "react";
import { Heart, Star } from 'lucide-react';
import { Product } from "../types/product";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
    <div className="relative">
      <img 
        src={product.image} 
        alt={product.title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {product.badge && (
        <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
          {product.badge}
        </span>
      )}
      {product.discount && (
        <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
          -{product.discount}%
        </span>
      )}
      <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors">
        <Heart className="w-4 h-4 text-gray-600" />
      </button>
    </div>
    <div className="p-4">
      <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
        {product.title}
      </h3>
      <div className="flex items-center mb-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
          ))}
          <span className="ml-1 text-xs text-gray-600">({product.reviews})</span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
      <div className="text-xs text-gray-600 mb-2">{product.shipping}</div>
      <div className="text-xs text-gray-500">by {product.seller}</div>
    </div>
  </div>
);