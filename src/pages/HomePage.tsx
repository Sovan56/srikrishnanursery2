import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Phone, 
  Star, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  TreeDeciduous, 
  Flower2, 
  Sprout, 
  PackageCheck,
  ExternalLink
} from 'lucide-react';
import { ProductCategory } from '../types';

export const HomePage: React.FC = () => {
  const { businessInfo, products, reviews, navigateTo, openQuoteModal } = useApp();

  const featuredCategories: { title: ProductCategory; count: string; image: string; icon: React.ReactNode; desc: string }[] = [
    {
      title: 'Indoor',
      count: '40+ Varieties',
      image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80',
      icon: <Sprout className="w-5 h-5 text-emerald-600" />,
      desc: 'Air-purifying snake plants, money plants, monstera, and ZZ plants.'
    },
    {
      title: 'Outdoor',
      count: '60+ Varieties',
      image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
      icon: <Flower2 className="w-5 h-5 text-emerald-600" />,
      desc: 'Flowering bougainvillea, ficus, hedging shrubs, and avenue trees.'
    },
    {
      title: 'Fruit Plants',
      count: '35+ Varieties',
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
      icon: <TreeDeciduous className="w-5 h-5 text-emerald-600" />,
      desc: 'Grafted Alphonso mango, pink guava, seedless lemon, and pomegranate.'
    },
    {
      title: 'Garden Supplies',
      count: 'Complete Range',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
      icon: <PackageCheck className="w-5 h-5 text-emerald-600" />,
      desc: 'Nutrient vermicompost, red soil, clay pots, and garden fertilizers.'
    }
  ];

  const handleCategoryClick = (cat: ProductCategory) => {
    navigateTo('products', cat);
  };

  const featuredProductsList = products.filter(p => p.featured).slice(0, 4);

  return (
    <div className="space-y-16 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-stone-900 to-emerald-950 text-white overflow-hidden rounded-b-3xl shadow-xl">
        <div className="absolute inset-0 opacity-25">
          <img 
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1920&q=80"
            alt="Sri Krishna Nursery Plants Banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-500/30 backdrop-blur-sm text-emerald-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Top Rated Wholesale Nursery in Bengaluru · {businessInfo.rating} ★ (168+ Reviews)</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Wholesale Plants & Garden Solutions in Bengaluru
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-lg font-medium leading-relaxed">
              Indoor plants, outdoor plants, fruit plants, and garden supplies – available at direct wholesale prices for home gardeners, landscape contractors, and housing societies.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('products')}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Explore Products Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 rounded-xl bg-stone-800/90 hover:bg-stone-800 text-stone-100 font-bold text-sm border border-stone-700 backdrop-blur-sm transition-all hover:border-emerald-400"
            >
              Contact Us & Location
            </button>

            <a
              href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`}
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-stone-900" />
              <span>Call {businessInfo.phone}</span>
            </a>
          </div>

          {/* Quick Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-8 border-t border-emerald-800/60 text-xs text-emerald-100/90">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>4.8★ Rated on Google</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Wholesale Bulk Pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100+ Plant Varieties</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Serving Bengaluru Daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SNAPSHOT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
              <span>About Sri Krishna Nursery & Farm</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Your Trusted Plant Partner in Huskur, Bengaluru
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              <strong className="text-stone-800">{businessInfo.name}</strong> ({businessInfo.kannadaName}) is a premier wholesale plant nursery situated in Huskur Village, Sanjeevinagar, near Electronic City & Sarjapur Road. We nurture and supply healthy indoor air-purifying plants, lush outdoor shrubs, grafted fruit trees, red soil, and organic vermicompost.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">4.8★ Rated Business</h4>
                  <p className="text-[11px] text-stone-500">Over 168+ happy Google reviews from local gardeners & landscapers.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200">
                <Truck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Bulk & Retail Supply</h4>
                  <p className="text-[11px] text-stone-500">Direct wholesale prices for apartments, villas, resorts & offices.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('about')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 hover:underline"
              >
                <span>Read Full Nursery Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white">
              <img 
                src="https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80"
                alt="Indoor & Outdoor plants at Sri Krishna Nursery"
                referrerPolicy="no-referrer"
                className="w-full h-72 object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-stone-900/80 backdrop-blur-md p-3 rounded-xl text-white text-xs">
                <p className="font-bold text-amber-300">Open Daily: 8:00 AM – 6:00 PM</p>
                <p className="text-[11px] text-stone-300">Phase II, Sanjeevinagar, Huskur Village, Bengaluru</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            Explore Wholesale Plant Categories
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Select a category to view healthy saplings, indicative wholesale rates, and care guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((cat) => (
            <div
              key={cat.title}
              onClick={() => handleCategoryClick(cat.title)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-44 overflow-hidden bg-stone-100">
                <img 
                  src={cat.image} 
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-stone-900/80 backdrop-blur-sm text-white text-[11px] font-bold rounded-lg">
                  {cat.count}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    {cat.icon}
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-emerald-900">
                  <span>Browse Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS HIGHLIGHT */}
      <section className="bg-emerald-50/50 py-12 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Popular Wholesale Picks</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                Featured Plants & Saplings
              </h2>
            </div>
            <button
              onClick={() => navigateTo('products')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-auto"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProductsList.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 bg-stone-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-emerald-100 text-emerald-900 font-bold text-[10px] rounded-md uppercase">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-stone-900 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{product.description}</p>
                    <p className="text-xs font-bold text-emerald-800 pt-1">
                      Price: <span className="text-amber-700">{product.priceRange}</span>
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => openQuoteModal(product)}
                    className="w-full py-2 px-3 bg-stone-100 hover:bg-emerald-700 hover:text-white text-stone-800 font-bold text-xs rounded-lg transition-colors border border-stone-200 text-center"
                  >
                    Inquire Wholesale Price
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            Why Choose Sri Krishna Nursery & Farm?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Dedicated horticulture expertise, honest bulk pricing, and healthy plants nurtured for Bengaluru climate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              💰
            </div>
            <h3 className="text-base font-bold text-stone-900">Wholesale Pricing</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Direct farm rates with no middlemen. Special discounted pricing for bulk orders by apartments and landscapers.
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              🌿
            </div>
            <h3 className="text-base font-bold text-stone-900">Healthy & Well-Maintained</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Grown under proper shade nets with organic vermicompost. High root stability and survival rate post-transplant.
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              🏢
            </div>
            <h3 className="text-base font-bold text-stone-900">Bulk Orders for Societies</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We supply Areca palms, hedge plants, and red soil bags for large residential projects and tech parks.
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              📍
            </div>
            <h3 className="text-base font-bold text-stone-900">Prime Huskur Location</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Conveniently accessible near Madduramma Temple, Sanjeevinagar, Electronic City Phase 2, and Sarjapur.
            </p>
          </div>
        </div>
      </section>

      {/* REVIEWS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 space-y-8 relative overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-white ml-2">4.8 / 5 Rating on Google</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Customer Google Reviews</h2>
            </div>
            <p className="text-xs text-emerald-200 max-w-xs">
              Based on 168+ authentic Google map reviews from home gardeners and commercial landscape buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-stone-900/80 border border-emerald-700/50 p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">{rev.author}</span>
                  <span className="text-[10px] text-emerald-300">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-stone-200 leading-relaxed italic">
                  "{rev.comment}"
                </p>
                {rev.tag && (
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-950 text-[10px] font-semibold text-emerald-300">
                    {rev.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION & GOOGLE MAPS EMBED PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">Visit Our Nursery</h2>
          <p className="text-xs sm:text-sm text-stone-600">Open daily from 8:00 AM to 6:00 PM in Sanjeevinagar, Huskur Village.</p>
        </div>

        <div className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xs">
          {/* Map Preview */}
          <div className="lg:col-span-7 h-80 lg:h-auto min-h-[320px] bg-stone-200 relative">
            <iframe
              title="Sri Krishna Nursery Google Map Location"
              src={businessInfo.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Contact Details Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>Nursery Location</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900">{businessInfo.name}</h3>
                <p className="text-xs font-semibold text-emerald-800">{businessInfo.kannadaName}</p>
              </div>

              <div className="space-y-2 text-xs text-stone-700">
                <p><strong>Address:</strong> {businessInfo.address}</p>
                <p><strong>Google Plus Code:</strong> <code className="bg-stone-200 px-1.5 py-0.5 rounded text-stone-900 font-mono">{businessInfo.plusCode}</code></p>
                <p><strong>Hours:</strong> {businessInfo.hours}</p>
                <p><strong>Phone:</strong> <a href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`} className="text-amber-700 font-bold hover:underline">{businessInfo.phone}</a></p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href={businessInfo.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Get Google Maps Directions</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => navigateTo('contact')}
                className="w-full py-2.5 px-4 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs rounded-xl transition-colors text-center"
              >
                Send Online Inquiry Form
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
