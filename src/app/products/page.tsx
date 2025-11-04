'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Grid3X3, 
  List, 
  Tag,
  Sparkles,
  Eye,
  X
} from 'lucide-react';
import axios from '@/lib/axios';
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

interface Category {
  id: string;
  name: string;
}

const ProductsShowcase: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle modal open
  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productsResponse = await axios.get('http://localhost:8000/api/products');
        const categoriesResponse = await axios.get('http://localhost:8000/api/categories');
        
        const productsData = productsResponse.data.data || productsResponse.data;
        const categoriesData = categoriesResponse.data.data || categoriesResponse.data;
        
        const safeProductsData = Array.isArray(productsData) ? productsData : [];
        const safeCategoriesData = Array.isArray(categoriesData) ? categoriesData : [];
        
        setProducts(safeProductsData);
        setFilteredProducts(safeProductsData);
        setCategories([{ id: 'all', name: t('products.categories.all') }, ...safeCategoriesData]);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setProducts([]);
        setFilteredProducts([]);
        setCategories([{ id: 'all', name: t('products.categories.all') }]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [t]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Filter products
  useEffect(() => {
    if (!Array.isArray(products)) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter(product => {
      const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
    const isHovered = hoveredProduct === product.id;

    return (
      <div 
        onMouseEnter={() => setHoveredProduct(product.id)}
        onMouseLeave={() => setHoveredProduct(null)}
        className={`group relative bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent transform hover:-translate-y-2 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-amber-50">
          <img 
            src={getProductImageUrl(product.image_url)} 
            alt={product.name || t('products.defaults.name')}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay with View Details */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
            <button 
              onClick={() => openModal(product)}
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

          {/* Price - Commented out */}
          {/* <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">
                {product.price ? `${t('products.currency')}${Number(product.price).toFixed(2)}` : t('products.defaults.price')}
              </span>
              <span className="text-sm text-slate-500">{t('products.perUnit')}</span>
            </div>
            
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-[#f2413b] transition-colors duration-300">
              <Sparkles className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors duration-300" />
            </div>
          </div> */}
        </div>

        {/* Animated Border */}
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-transparent group-hover:border-[#f2413b] transition-all duration-500 pointer-events-none"></div>
      </div>
    );
  };

  const ProductListItem: React.FC<{ product: Product }> = ({ product }) => {
    return (
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-amber-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
          {/* Image */}
          <div className="relative flex-shrink-0 w-full sm:w-32 md:w-48 h-48 sm:h-32 md:h-48 rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-amber-50">
            <img 
              src={getProductImageUrl(product.image_url)} 
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
              {/* Price - Commented out */}
              {/* <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {product.price ? `${t('products.currency')}${Number(product.price).toFixed(2)}` : t('products.defaults.price')}
                </span>
                <span className="text-sm text-slate-500">{t('products.perUnit')}</span>
              </div> */}
              
              <button 
                onClick={() => openModal(product)}
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

  return (
    <div 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-slate-50 via-white to-amber-50/30 py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      {/* Decorative Blobs */}
      <div className="absolute top-20 right-20 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-amber-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-56 sm:w-72 md:w-80 h-56 sm:h-72 md:h-80 bg-slate-200 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-amber-50 border-2 border-[#f2413b] rounded-full mb-4 sm:mb-6 shadow-lg">
            <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-[#f2413b]" />
            <span className="text-xs sm:text-sm text-amber-800 font-semibold uppercase tracking-wider">
              {t('products.badge')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight mb-4 sm:mb-6 px-4">
            {t('products.title.line1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f2413b] to-orange-600">
              {t('products.title.line2')}
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className={`bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-xl border-2 border-slate-200 p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full lg:max-w-lg">
              <Search className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder={t('products.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 border-2 border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 transition-all duration-300 text-slate-900 placeholder-slate-400 text-sm sm:text-base"
              />
            </div>

            {/* View Toggle */}
            <div className="flex bg-slate-100 rounded-xl sm:rounded-2xl p-1.5 shadow-inner self-center">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-md text-slate-900' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Grid3X3 size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-md text-slate-900' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
            {isClient && categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#f2413b] to-orange-600 text-white border-transparent shadow-lg transform scale-105'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-[#f2413b] hover:bg-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {!loading && (
          <div className={`mb-6 sm:mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#f2413b] rounded-full animate-pulse"></div>
              <p className="text-slate-700 font-medium text-sm sm:text-base">
                {t('products.results.count')}
                {filteredProducts.length}
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden animate-pulse">
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-amber-100"></div>
                <div className="p-4 sm:p-6">
                  <div className="h-5 sm:h-6 bg-slate-200 rounded-lg mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded-lg mb-3"></div>
                  <div className="h-4 bg-slate-200 rounded-lg w-2/3 mb-3"></div>
                  <div className="h-8 bg-slate-200 rounded-lg w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8" 
            : "space-y-4 sm:space-y-6"
          }>
            {filteredProducts.map((product, index) => 
              viewMode === 'grid' ? (
                <ProductCard key={product.id || index} product={product} index={index} />
              ) : (
                <ProductListItem key={product.id || index} product={product} />
              )
            )}
          </div>
        ) : null}

        {/* No Results */}
        {!loading && (!Array.isArray(filteredProducts) || filteredProducts.length === 0) && (
          <div className="text-center py-12 sm:py-20 px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-slate-200 to-amber-200 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <Search className="text-slate-600" size={28} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              {t('products.noResults.title')}
            </h3>
            <p className="text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
              {t('products.noResults.description')}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl sm:rounded-2xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg text-sm sm:text-base"
            >
              {t('products.noResults.reset')}
            </button>
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      {isModalOpen && selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div 
            className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>

            <div className="flex flex-col md:flex-row max-h-[95vh] sm:max-h-[90vh]">
              {/* Left Side - Product Image */}
              <div className="md:w-1/2 bg-gradient-to-br from-slate-50 to-amber-50 p-6 sm:p-8 md:p-12 flex items-center justify-center relative">
                <div className="relative w-full aspect-square max-w-lg">
                  <img
                    src={getProductImageUrl(selectedProduct.image_url)}
                    alt={selectedProduct.name || t('products.defaults.name')}
                    className="w-full h-full object-cover rounded-2xl sm:rounded-3xl shadow-2xl"
                  />
                  
                  {/* Stock Badge */}
                  <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 ${
                    selectedProduct.stock_quantity > 0 
                      ? 'bg-gradient-to-r from-green-500 to-green-600' 
                      : 'bg-gradient-to-r from-red-500 to-red-600'
                  } text-white px-3 sm:px-5 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-xl`}>
                    {selectedProduct.stock_quantity > 0 ? t('products.stock.inStock') : t('products.stock.outOfStock')}
                  </div>
                </div>
              </div>

              {/* Right Side - Product Details */}
              <div className="md:w-1/2 p-6 sm:p-8 md:p-12 overflow-y-auto">
                <div className="space-y-6 sm:space-y-8">
                  {/* Product Name */}
                  <div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-2 sm:mb-3">
                      {selectedProduct.name || t('products.defaults.name')}
                    </h2>
                    <div className="h-1 sm:h-1.5 w-16 sm:w-24 bg-gradient-to-r from-[#f2413b] to-orange-600 rounded-full"></div>
                  </div>

                  {/* Price - Commented out */}
                  {/* <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-amber-200 shadow-lg">
                    <p className="text-xs sm:text-sm text-slate-600 mb-1 sm:mb-2 uppercase tracking-wider font-medium">Price</p>
                    <div className="flex items-baseline gap-2 sm:gap-3">
                      <span className="text-4xl sm:text-5xl font-bold text-slate-900">
                        {selectedProduct.price ? `${t('products.currency')}${Number(selectedProduct.price).toFixed(2)}` : t('products.defaults.price')}
                      </span>
                      <span className="text-base sm:text-lg text-slate-600">{t('products.perUnit')}</span>
                    </div>
                  </div> */}

                  {/* Description */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">Description</h3>
                    <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                      {selectedProduct.description || t('products.defaults.description')}
                    </p>
                  </div>

                  {/* Stock Information */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">Availability</h3>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold ${
                        selectedProduct.stock_quantity > 0 
                          ? 'bg-green-50 text-green-700 border-2 border-green-200' 
                          : 'bg-red-50 text-red-700 border-2 border-red-200'
                      }`}>
                        {selectedProduct.stock_quantity > 0 
                          ? `${t('products.stock.available')} (${selectedProduct.stock_quantity} ${selectedProduct.stock_quantity === 1 ? 'unit' : 'units'})`
                          : t('products.stock.unavailable')
                        }
                      </span>
                    </div>
                  </div>

                  {/* Product ID */}
                  <div className="pt-4 sm:pt-6 border-t border-slate-200">
                    <p className="text-xs sm:text-sm text-slate-500">
                      Product ID: <span className="font-mono text-slate-700 font-semibold">#{selectedProduct.id}</span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <button className="flex-1 px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-[#f2413b] to-orange-600 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:scale-105 active:scale-95 transition-transform duration-300 shadow-xl">
                      Add to Cart
                    </button>
                    <button className="px-6 sm:px-8 py-4 sm:py-5 bg-slate-100 text-slate-900 rounded-xl sm:rounded-2xl font-bold hover:bg-slate-200 transition-colors duration-300 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

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

export default ProductsShowcase;