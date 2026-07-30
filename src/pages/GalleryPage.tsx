import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../types';

export const GalleryPage: React.FC = () => {
  const { gallery } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Nursery Views', 'Fruit Saplings', 'Outdoor', 'Garden Supplies', 'Bulk Orders'];

  const filteredGallery = gallery.filter((item) => {
    if (selectedFilter === 'All') return true;
    return item.category.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          Photo Tour
        </span>
        <h1 className="text-3xl font-extrabold text-stone-900">
          Nursery Photo Gallery
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Take a look at our shade net canopy, fruit sapling rows, potting soil yard, and bulk dispatch area in Huskur, Bengaluru.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const active = selectedFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                active
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => openLightbox(idx)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between"
          >
            <div className="relative h-60 bg-stone-100 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-3 rounded-full bg-white/90 text-stone-900 shadow-lg">
                  <Maximize2 className="w-5 h-5" />
                </span>
              </div>
              <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-stone-900/80 backdrop-blur-sm text-white text-[10px] font-bold rounded-md">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-1">
              <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-stone-600 line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 text-white bg-stone-800/80 hover:bg-stone-700 p-2.5 rounded-full transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-stone-800/80 hover:bg-stone-700 p-3 rounded-full transition-colors z-40"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-stone-800/80 hover:bg-stone-700 p-3 rounded-full transition-colors z-40"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center gap-4 p-2">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-stone-800 max-h-[70vh]">
              <img
                src={filteredGallery[lightboxIndex].image}
                alt={filteredGallery[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="text-center text-white space-y-1 max-w-xl">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-800 text-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                {filteredGallery[lightboxIndex].category}
              </span>
              <h3 className="text-lg font-bold">
                {filteredGallery[lightboxIndex].title}
              </h3>
              <p className="text-xs text-stone-300">
                {filteredGallery[lightboxIndex].caption}
              </p>
              <p className="text-[11px] text-stone-400 pt-1">
                Image {lightboxIndex + 1} of {filteredGallery.length}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
