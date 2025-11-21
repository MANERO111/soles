'use client';
import React from 'react';
import { Eye } from 'lucide-react';
import { getProductImageUrl } from '@/utils/imageHelper';
import { useLanguage } from '@/app/contexts/languageContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image_url: string;
  category_id: string;
  rating?: number;
  stock_quantity: number;
}

interface ProductsCardAndListProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  isVisible: boolean;
  onProductHover: (productId: number | null) => void;
  hoveredProduct: number | null;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<{ 
  product: Product; 
  index: number;
  isVisible: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onViewDetails: () => void;
}> = ({ product, index, isVisible, isHovered, onMouseEnter, onMouseLeave, onViewDetails }) => {
  const { t } = useLanguage();

  return (
    <div 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group relative bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent transform hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-amber-50">
        <img 
        //   src={getProductImageUrl(product.image_url)} 
          src={'img/'+product.image_url}
          alt={product.name || t('products.defaults.name')}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay with View Details */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <button 
            onClick={onViewDetails}
            className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 px-4 sm:px-6 py-2 sm:py-3 bg-white text-slate-900 rounded-full font-semibold flex items-center gap-2 hover:scale-110 active:scale-95 text-sm sm:text-base"
          >
            <Eye size={18} />
            {t('products.actions.viewDetails')}
          </button>
        </div>

        {/* Stock Badge */}
        {product.stock_quantity > 0 ? (
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
            {t('products.stock.inStock')}
          </div>
        ) : (
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
            {t('products.stock.outOfStock')}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-[#f2413b] transition-colors duration-300 line-clamp-1">
          {product.name || t('products.defaults.name')}
        </h3>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {product.description || t('products.defaults.description')}
        </p>

        {/* Stock Info */}
        <div className="mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            product.stock_quantity > 0 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {product.stock_quantity > 0 
              ? t('products.stock.available')
              : t('products.stock.unavailable')
            }
            {product.stock_quantity > 0 && ` (${product.stock_quantity})`}
          </span>
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-transparent group-hover:border-[#f2413b] transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};

export const ProductListItem: React.FC<{ 
  product: Product;
  onViewDetails: () => void;
}> = ({ product, onViewDetails }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-amber-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
        {/* Image */}
        <div className="relative flex-shrink-0 w-full sm:w-32 md:w-48 h-48 sm:h-32 md:h-48 rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-amber-50">
          <img 
            // src={getProductImageUrl(product.image_url)} 
            src={'img/'+product.image_url}
            alt={product.name || t('products.defaults.name')}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 ${
            product.stock_quantity > 0 
              ? 'bg-gradient-to-r from-green-500 to-green-600' 
              : 'bg-gradient-to-r from-red-500 to-red-600'
          } text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
            {product.stock_quantity > 0 ? t('products.stock.inStock') : t('products.stock.outOfStock')}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 hover:text-[#f2413b] transition-colors duration-300">
              {product.name || t('products.defaults.name')}
            </h3>
            
            <p className="text-slate-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
              {product.description || t('products.defaults.description')}
            </p>

            {/* Stock Badge */}
            <div className="mb-3 sm:mb-4">
              <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                product.stock_quantity > 0 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {product.stock_quantity > 0 
                  ? t('products.stock.available')
                  : t('products.stock.unavailable')
                }
                {product.stock_quantity > 0 && ` (${product.stock_quantity})`}
              </span>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pt-4 border-t border-slate-100">
            <button 
              onClick={onViewDetails}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#f2413b] to-orange-500 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-300 shadow-lg text-sm sm:text-base"
            >
              <Eye size={18} />
              {t('products.actions.viewDetails')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsCardAndList: React.FC<ProductsCardAndListProps> = ({
  products,
  viewMode,
  isVisible,
  onProductHover,
  hoveredProduct,
  onViewDetails,
}) => {
  return (
    <div className={viewMode === 'grid' 
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8" 
      : "space-y-4 sm:space-y-6"
    }>
      {products.map((product, index) => 
        viewMode === 'grid' ? (
          <ProductCard 
            key={product.id || index} 
            product={product} 
            index={index}
            isVisible={isVisible}
            isHovered={hoveredProduct === product.id}
            onMouseEnter={() => onProductHover(product.id)}
            onMouseLeave={() => onProductHover(null)}
            onViewDetails={() => onViewDetails(product)}
          />
        ) : (
          <ProductListItem 
            key={product.id || index} 
            product={product}
            onViewDetails={() => onViewDetails(product)}
          />
        )
      )}
    </div>
  );
};

export default ProductsCardAndList;