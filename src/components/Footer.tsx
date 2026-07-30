import React from 'react';
import { useApp } from '../context/AppContext';
import { Leaf, MapPin, Phone, Clock, Mail, ExternalLink, Lock, Heart, ShieldCheck } from 'lucide-react';
import { AppRoute } from '../types';

export const Footer: React.FC = () => {
  const { businessInfo, navigateTo, isAdminLoggedIn } = useApp();

  const handleNav = (route: AppRoute) => {
    navigateTo(route);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-emerald-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5 text-emerald-100" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white leading-tight">
                  {businessInfo.name}
                </h3>
                <p className="text-xs font-medium text-emerald-400">
                  {businessInfo.kannadaName}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Leading wholesale plant nursery in Sanjeevinagar, Huskur Village, Bengaluru. We specialize in high-quality indoor & outdoor plants, fruit saplings, and bulk garden supplies for landscaping & home gardens.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800/80 text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>4.8 ★ Google Rated (168+ Reviews)</span>
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <span>›</span> Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <span>›</span> Wholesale Products Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <span>›</span> About Sri Krishna Nursery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <span>›</span> Nursery Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <span>›</span> Contact & Directions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login')}
                  className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium pt-1"
                >
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Admin Panel (Demo Portal)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">
              Contact & Location
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {businessInfo.address}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`} 
                  className="text-amber-300 hover:underline font-bold"
                >
                  {businessInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{businessInfo.hours}</span>
              </div>

              <div className="pt-1">
                <a
                  href={businessInfo.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] font-medium transition-colors border border-stone-700"
                >
                  <span>Google Maps Plus Code: {businessInfo.plusCode}</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Service Areas */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">
              Service Coverage
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              We cater to bulk wholesale & retail plant requirements across Bengaluru:
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {['Huskur Village', 'Electronic City Phase 1 & 2', 'Sarjapur Road', 'Whitefield', 'Chandapura', 'Bommasandra', 'Attibele', 'Hosur Road'].map(area => (
                <span key={area} className="px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 border border-stone-700">
                  {area}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} {businessInfo.name}. All rights reserved. Wholesale Plant Nursery in Bengaluru.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-stone-400">Demo Website & CMS Portal</span>
            <span>•</span>
            <button
              onClick={() => handleNav(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login')}
              className="text-emerald-400 hover:underline"
            >
              Demo Admin (admin / admin123)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
