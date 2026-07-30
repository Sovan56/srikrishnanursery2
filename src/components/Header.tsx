import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Leaf, 
  ShieldCheck, 
  MessageSquare, 
  Lock, 
  Star 
} from 'lucide-react';
import { AppRoute } from '../types';

export const Header: React.FC = () => {
  const { businessInfo, activeRoute, navigateTo, isAdminLoggedIn } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; route: AppRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Products & Plants', route: 'products' },
    { label: 'About Nursery', route: 'about' },
    { label: 'Gallery', route: 'gallery' },
    { label: 'Contact Us', route: 'contact' },
  ];

  const handleNav = (route: AppRoute) => {
    navigateTo(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-emerald-100">
      {/* Top Announcement Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-emerald-200 text-xs">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Huskur Village, Sanjeevinagar, Bengaluru</span>
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{businessInfo.hours}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-1 bg-emerald-800/80 px-2.5 py-0.5 rounded-full text-amber-300 font-semibold text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{businessInfo.rating} ★ (168+ Google Reviews)</span>
            </div>

            <button
              onClick={() => handleNav(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login')}
              className="flex items-center gap-1.5 text-xs font-medium text-emerald-200 hover:text-white transition-colors py-0.5 px-2 rounded-sm bg-emerald-800/50 hover:bg-emerald-800"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>{isAdminLoggedIn ? 'Admin Panel' : 'Demo Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <Leaf className="w-6 h-6 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 group-hover:text-emerald-700 transition-colors">
                {businessInfo.name}
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-md">
                Wholesale
              </span>
            </div>
            <p className="text-xs font-medium text-emerald-800 tracking-wide">
              {businessInfo.kannadaName}
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-stone-50 p-1.5 rounded-xl border border-stone-200/80">
          {navItems.map((item) => {
            const isActive = activeRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-700 hover:text-emerald-800 hover:bg-stone-200/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons (Call Now & WhatsApp) */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-800 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-xs transition-all active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 text-stone-900" />
            <span>Call {businessInfo.phone}</span>
          </a>

          <a
            href={`https://wa.me/${businessInfo.whatsappPhone}?text=Hello%20Sri%20Krishna%20Nursery,%20I%20am%20interested%20in%20wholesale%20plants.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-stone-100 text-stone-700 hover:text-stone-900 hover:bg-stone-200 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-50 border-t border-stone-200 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNav(item.route)}
                  className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white'
                      : 'text-stone-700 hover:bg-stone-200/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <a
              href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-400 text-stone-900 font-bold text-xs rounded-xl shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now: {businessInfo.phone}</span>
            </a>

            <button
              onClick={() => handleNav(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs rounded-xl"
            >
              <Lock className="w-4 h-4 text-emerald-800" />
              <span>{isAdminLoggedIn ? 'Go to Admin Dashboard' : 'Open Admin Login (Demo)'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
