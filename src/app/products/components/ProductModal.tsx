'use client';
import React from 'react';
import { X } from 'lucide-react';
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

interface ProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, product, onClose }) => {
  const { t } = useLanguage();
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  if (!isOpen || !product) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };



  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden animate-in zoom-in duration-300"
        onClick={handleModalClick}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="flex flex-col md:flex-row max-h-[95vh] sm:max-h-[90vh]">
          {/* Left Side - Product Image */}
          <div className="md:w-1/2 bg-gradient-to-br from-slate-50 to-amber-50 p-6 sm:p-8 md:p-12 flex items-center justify-center relative">
            <div className="relative w-full aspect-square max-w-lg">
              <img
                // src={getProductImageUrl(product.image_url)}
                src={'img/'+product.image_url}
                alt={product.name || t('products.defaults.name')}
                className="w-full h-full object-cover rounded-2xl sm:rounded-3xl shadow-2xl"
              />
              
              {/* Stock Badge */}
              <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 ${
                product.stock_quantity > 0 
                  ? 'bg-gradient-to-r from-green-500 to-green-600' 
                  : 'bg-gradient-to-r from-red-500 to-red-600'
              } text-white px-3 sm:px-5 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-xl`}>
                {product.stock_quantity > 0 ? t('products.stock.inStock') : t('products.stock.outOfStock')}
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="md:w-1/2 p-6 sm:p-8 md:p-12 overflow-y-auto">
            <div className="space-y-6 sm:space-y-8">
              {/* Product Name */}
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-2 sm:mb-3">
                  {product.name || t('products.defaults.name')}
                </h2>
                <div className="h-1 sm:h-1.5 w-16 sm:w-24 bg-gradient-to-r from-[#f2413b] to-orange-600 rounded-full"></div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">Description</h3>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                  {product.description || t('products.defaults.description')}
                </p>
              </div>

              {/* Stock Information */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">Availability</h3>
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold ${
                    product.stock_quantity > 0 
                      ? 'bg-green-50 text-green-700 border-2 border-green-200' 
                      : 'bg-red-50 text-red-700 border-2 border-red-200'
                  }`}>
                    {product.stock_quantity > 0 
                      ? `${t('products.stock.available')} (${product.stock_quantity} ${product.stock_quantity === 1 ? 'unit' : 'units'})`
                      : t('products.stock.unavailable')
                    }
                  </span>
                </div>
              </div>

              {/* Product ID */}
              <div className="pt-4 sm:pt-6 border-t border-slate-200">
                <p className="text-xs sm:text-sm text-slate-500">
                  Product ID: <span className="font-mono text-slate-700 font-semibold">#{product.id}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoom-in {
          from { transform: scale(0.95); }
          to { transform: scale(1); }
        }

        .animate-in {
          animation-duration: 0.3s;
          animation-fill-mode: both;
        }

        .fade-in {
          animation-name: fade-in;
        }

        .zoom-in {
          animation-name: zoom-in;
        }
      `}</style>
    </div>
  );
};

export default ProductModal;