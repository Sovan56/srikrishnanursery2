import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PlantImage } from '../components/PlantImage';
import { 
  Search, 
  Filter, 
  Printer, 
  Sparkles, 
  ShoppingBag, 
  CheckCircle2, 
  MessageSquare, 
  Phone 
} from 'lucide-react';
import { Product, ProductCategory } from '../types';

export const ProductsPage: React.FC = () => {
  const { 
    products, 
    selectedCategoryFilter, 
    setSelectedCategoryFilter, 
    openQuoteModal, 
    businessInfo 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories: string[] = ['All', 'Indoor', 'Outdoor', 'Fruit Plants', 'Garden Supplies'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = 
        selectedCategoryFilter === 'All' || p.category === selectedCategoryFilter;
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStock = !inStockOnly || p.inStock !== false;

      return matchesCategory && matchesSearch && matchesStock;
    });
  }, [products, selectedCategoryFilter, searchQuery, inStockOnly]);

  const handlePrintCatalog = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title & Print CTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6 print:hidden">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Wholesale Nursery Stock
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Plants & Gardening Catalog
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Browse indoor, outdoor, fruit saplings, soil, and pots. Direct wholesale rates for Bengaluru buyers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintCatalog}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl border border-stone-300 transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4 text-emerald-700" />
            <span>Print Catalog</span>
          </button>

          <button
            onClick={() => openQuoteModal()}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bulk Quote Request</span>
          </button>
        </div>
      </div>

      {/* PRINT-ONLY HEADER */}
      <div className="hidden print:block space-y-2 border-b-2 border-emerald-800 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-stone-900">{businessInfo.name}</h1>
        <p className="text-sm font-semibold text-emerald-800">{businessInfo.kannadaName}</p>
        <p className="text-xs text-stone-600">Address: {businessInfo.address}</p>
        <p className="text-xs text-stone-600">Phone: {businessInfo.phone} | Hours: {businessInfo.hours}</p>
      </div>

      {/* Filter & Search Controls Bar */}
      <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 shadow-xs space-y-4 print:hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            {categories.map((cat) => {
              const active = selectedCategoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-stone-200/70 border border-stone-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search plant, fruit tree, soil..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
            />
          </div>

        </div>

        {/* Stock Filter Checkbox */}
        <div className="flex items-center justify-between text-xs text-stone-600 pt-2 border-t border-stone-200/60">
          <p>Showing <strong className="text-stone-900">{filteredProducts.length}</strong> available plant items</p>
          <label className="flex items-center gap-2 cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded-xs text-emerald-600 focus:ring-emerald-500"
            />
            <span>Show In-Stock Only</span>
          </label>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
          <p className="text-stone-500 text-sm font-medium">No plants matched your search criteria.</p>
          <button
            onClick={() => {
              setSelectedCategoryFilter('All');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-emerald-800 hover:underline"
          >
            Clear Search & Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group print:break-inside-avoid"
            >
              <div>
                {/* Product Thumbnail */}
                <div className="relative h-48 bg-stone-100 overflow-hidden">
                  <PlantImage
                    src={product.image}
                    alt={`${product.name} at Sri Krishna Nursery`}
                    fallbackCategory={product.category}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-stone-900/80 backdrop-blur-sm text-white text-[10px] font-bold rounded-md uppercase z-10">
                    {product.category}
                  </span>
                  {product.featured && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-amber-400 text-stone-900 font-bold text-[10px] rounded-md shadow-xs z-10">
                      Popular Choice
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                  <h3 className="text-base font-bold text-stone-900 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-stone-100">
                    <span className="text-stone-500">Indicative Price:</span>
                    <span className="font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                      {product.priceRange}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Action */}
              <div className="p-4 pt-0 print:hidden">
                <button
                  onClick={() => openQuoteModal(product)}
                  className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Enquire / Get Quote</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BULK ORDER BANNER */}
      <section className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md print:hidden">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-700 text-emerald-200 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Apartment Societies & Landscape Contractors</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Need Bulk Plants in Bengaluru?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            We deliver bulk orders of Areca Palms, Snake Plants, Flowering Shrubs, and Red Soil directly to your site across Huskur, Electronic City, Sarjapur, and Whitefield.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-stone-900" />
            <span>Call {businessInfo.phone}</span>
          </a>

          <button
            onClick={() => openQuoteModal()}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white text-emerald-900 hover:bg-emerald-100 font-bold text-xs shadow-md transition-all"
          >
            Submit Bulk Requirement
          </button>
        </div>
      </section>

    </div>
  );
};
