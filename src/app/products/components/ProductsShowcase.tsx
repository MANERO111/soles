'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Search, Grid3X3, List, Tag, Sparkles } from 'lucide-react';
import axios from '@/lib/axios';
import { useLanguage } from '@/app/contexts/languageContext';
import ProductsCardAndList from './ProductsCardAndList';
import ProductModal from './ProductModal';

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
  const [products, setProducts] = useState<Product[]>([
    {id : 1, name: 'échantillon ', price: 70, originalPrice: 0, description: 'EVA échantillon', image_url: '25.jpg', category_id: '1', rating: 5, stock_quantity: 50},
    {id : 2, name: 'échantillon ', price: 80, originalPrice: 0, description: 'EVA échantillon  ', image_url: '24.jpg', category_id: '1', rating: 5, stock_quantity: 50},
    {id : 3, name: 'échantillon ', price: 80, originalPrice: 0, description: 'EVA échantillon  ', image_url: '23.jpg', category_id: '1', rating: 5, stock_quantity: 50},
    {id : 4, name: 'échantillon ', price: 80, originalPrice: 0, description: 'EVA échantillon  ', image_url: '19.jpg', category_id: '1', rating: 5, stock_quantity: 50},
    {id : 5, name: 'échantillon ', price: 80, originalPrice: 0, description: 'EVA échantillon  ', image_url: '21.jpg', category_id: '1', rating: 5, stock_quantity: 50},
    {id : 6, name: 'échantillon ', price: 65, originalPrice: 0, description: 'TR échantillon ', image_url: '18.jpg', category_id: '2', rating: 5, stock_quantity: 50},
    {id : 7, name: 'échantillon ', price: 65, originalPrice: 0, description: 'TR échantillon ', image_url: '17.jpg', category_id: '2', rating: 5, stock_quantity: 50},
    {id : 8, name: 'échantillon ', price: 65, originalPrice: 0, description: 'TR échantillon ', image_url: '15.jpg', category_id: '2', rating: 5, stock_quantity: 50},
    {id : 9, name: 'échantillon ', price: 65, originalPrice: 0, description: 'TR échantillon ', image_url: '14.jpg', category_id: '2', rating: 5, stock_quantity: 50},
    {id : 10, name: 'échantillon ', price: 65, originalPrice: 0, description: 'TR échantillon ', image_url: '10.jpg', category_id: '2', rating: 5, stock_quantity: 50},
    {id : 11, name: 'échantillon ', price: 85, originalPrice: 0, description: 'TPU échantillon ', image_url: '13.jpg', category_id: '3', rating: 5, stock_quantity: 50},
    {id : 12, name: 'échantillon ', price: 85, originalPrice: 0, description: 'TPU échantillon ', image_url: '12.jpg', category_id: '3', rating: 5, stock_quantity: 50},
    {id : 13, name: 'échantillon ', price: 85, originalPrice: 0, description: 'TPU échantillon ', image_url: '6.jpg', category_id: '3', rating: 5, stock_quantity: 50},
    {id : 14, name: 'échantillon ', price: 85, originalPrice: 0, description: 'PU échantillon ', image_url: '7.jpg', category_id: '4', rating: 5, stock_quantity: 50},
    {id : 15, name: 'échantillon ', price: 85, originalPrice: 0, description: 'PU échantillon ', image_url: '4.jpg', category_id: '4', rating: 5, stock_quantity: 50},
    {id : 16, name: 'échantillon ', price: 85, originalPrice: 0, description: 'PU échantillon ', image_url: '3.jpg', category_id: '4', rating: 5, stock_quantity: 50},
    {id : 17, name: 'échantillon ', price: 85, originalPrice: 0, description: 'Fabricated outsoles échantillon ', image_url: '28.jpg', category_id: '5', rating: 5, stock_quantity: 50},
    {id : 18, name: 'échantillon ', price: 85, originalPrice: 0, description: 'Fabricated outsoles échantillon ', image_url: '29.jpg', category_id: '5', rating: 5, stock_quantity: 50},
    {id : 19, name: 'échantillon ', price: 85, originalPrice: 0, description: 'Fabricated outsoles échantillon ', image_url: '30.jpg', category_id: '5', rating: 5, stock_quantity: 50},
  ]);
  const [categories, setCategories] = useState<Category[]>([
    { id: 'all', name: 'All' },
    { id: '1', name: 'EVA' },
    { id: '2', name: 'TR' },
    { id: '3', name: 'TPU' },
    { id: '4', name: 'PU' },
    { id: '5', name: 'Fabricated outsoles' },
  ]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState<boolean>(false);
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
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

//   Fetch data from API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const productsResponse = await axios.get('http://localhost:8000/api/products');
  //       const categoriesResponse = await axios.get('http://localhost:8000/api/categories');
        
  //       const productsData = productsResponse.data.data || productsResponse.data;
  //       const categoriesData = categoriesResponse.data.data || categoriesResponse.data;
        
  //       const safeProductsData = Array.isArray(productsData) ? productsData : [];
  //       const safeCategoriesData = Array.isArray(categoriesData) ? categoriesData : [];
        
  //       setProducts(safeProductsData);
  //       setFilteredProducts(safeProductsData);
  //       setCategories([{ id: 'all', name: t('products.categories.all') }, ...safeCategoriesData]);
        
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setProducts([]);
  //       setFilteredProducts([]);
  //       setCategories([{ id: 'all', name: t('products.categories.all') }]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [t]);

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

  return (
    <div 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-slate-50 via-white to-amber-50/30 py-16 sm:py-24 mt-10 md:py-32 overflow-hidden"
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
          <ProductsCardAndList
            products={filteredProducts}
            viewMode={viewMode}
            isVisible={isVisible}
            onProductHover={setHoveredProduct}
            hoveredProduct={hoveredProduct}
            onViewDetails={openModal}
          />
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

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={closeModal}
      />

      <style jsx>{`
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default ProductsShowcase;