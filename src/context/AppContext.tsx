import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  BusinessInfo, 
  Product, 
  CustomerReview, 
  GalleryItem, 
  Inquiry, 
  AppRoute, 
  ProductCategory 
} from '../types';
import { 
  INITIAL_BUSINESS_INFO, 
  INITIAL_PRODUCTS, 
  INITIAL_REVIEWS, 
  INITIAL_GALLERY, 
  INITIAL_INQUIRIES 
} from '../data/initialData';

interface AppContextType {
  businessInfo: BusinessInfo;
  products: Product[];
  reviews: CustomerReview[];
  gallery: GalleryItem[];
  inquiries: Inquiry[];
  activeRoute: AppRoute;
  selectedCategoryFilter: string;
  selectedProductForQuote: Product | null;
  isAdminLoggedIn: boolean;
  toastMessage: string | null;
  
  // Navigation & Actions
  navigateTo: (route: AppRoute, categoryFilter?: string) => void;
  setSelectedCategoryFilter: (cat: string) => void;
  openQuoteModal: (product?: Product | null) => void;
  closeQuoteModal: () => void;
  showToast: (msg: string) => void;
  
  // Admin Methods
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateBusinessInfo: (info: BusinessInfo) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: 'New' | 'Contacted' | 'Closed') => void;
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_INFO = 'sk_nursery_business_info';
const LOCAL_STORAGE_KEY_PRODUCTS = 'sk_nursery_products';
const LOCAL_STORAGE_KEY_INQUIRIES = 'sk_nursery_inquiries';
const LOCAL_STORAGE_KEY_ADMIN = 'sk_nursery_admin_logged_in';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Business Info
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_INFO);
      return saved ? JSON.parse(saved) : INITIAL_BUSINESS_INFO;
    } catch {
      return INITIAL_BUSINESS_INFO;
    }
  });

  // 2. Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // 3. Inquiries
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_INQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  // 4. Admin Login State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEY_ADMIN) === 'true';
    } catch {
      return false;
    }
  });

  // 5. Active Route & Category Filter
  const [activeRoute, setActiveRoute] = useState<AppRoute>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_INFO, JSON.stringify(businessInfo));
    } catch (e) {
      console.error(e);
    }
  }, [businessInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error(e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_ADMIN, isAdminLoggedIn ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [isAdminLoggedIn]);

  // Read URL hash on load if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'products', 'about', 'gallery', 'contact', 'admin-login', 'admin-dashboard'].includes(hash)) {
        setActiveRoute(hash as AppRoute);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: AppRoute, categoryFilter?: string) => {
    setActiveRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (categoryFilter) {
      setSelectedCategoryFilter(categoryFilter);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const openQuoteModal = (product?: Product | null) => {
    setSelectedProductForQuote(product || null);
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedProductForQuote(null);
  };

  const loginAdmin = (username: string, pass: string): boolean => {
    if (username.trim().toLowerCase() === 'admin' && pass === 'admin123') {
      setIsAdminLoggedIn(true);
      showToast('Welcome back Admin! Demo login successful.');
      navigateTo('admin-dashboard');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    showToast('Logged out successfully.');
    navigateTo('home');
  };

  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const created: Product = {
      ...newProd,
      id: 'prod-' + Date.now(),
    };
    setProducts(prev => [created, ...prev]);
    showToast(`Product "${created.name}" added successfully.`);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast(`Product "${updated.name}" updated successfully.`);
  };

  const deleteProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`Product "${target?.name || 'Item'}" deleted.`);
  };

  const updateBusinessInfo = (newInfo: BusinessInfo) => {
    setBusinessInfo(newInfo);
    showToast('Business Information updated live!');
  };

  const addInquiry = (inq: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('en-IN')} ${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
    const newInquiry: Inquiry = {
      ...inq,
      id: 'inq-' + Date.now(),
      createdAt: formattedDate,
      status: 'New',
    };
    setInquiries(prev => [newInquiry, ...prev]);
    showToast('Thank you! Your inquiry has been sent to Sri Krishna Nursery.');
  };

  const updateInquiryStatus = (id: string, status: 'New' | 'Contacted' | 'Closed') => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    showToast('Inquiry status updated.');
  };

  const resetToDefaultData = () => {
    setBusinessInfo(INITIAL_BUSINESS_INFO);
    setProducts(INITIAL_PRODUCTS);
    setInquiries(INITIAL_INQUIRIES);
    localStorage.removeItem(LOCAL_STORAGE_KEY_INFO);
    localStorage.removeItem(LOCAL_STORAGE_KEY_PRODUCTS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_INQUIRIES);
    showToast('All demo data reset to defaults.');
  };

  return (
    <AppContext.Provider
      value={{
        businessInfo,
        products,
        reviews: INITIAL_REVIEWS,
        gallery: INITIAL_GALLERY,
        inquiries,
        activeRoute,
        selectedCategoryFilter,
        selectedProductForQuote,
        isAdminLoggedIn,
        toastMessage,

        navigateTo,
        setSelectedCategoryFilter,
        openQuoteModal,
        closeQuoteModal,
        showToast,

        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        updateBusinessInfo,
        addInquiry,
        updateInquiryStatus,
        resetToDefaultData,
      }}
    >
      {children}
      
      {/* Global Quick Quote Modal */}
      {isQuoteModalOpen && (
        <QuoteModalInternal
          product={selectedProductForQuote}
          onClose={closeQuoteModal}
          onSubmit={addInquiry}
        />
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Internal Quick Quote Modal Component
const QuoteModalInternal: React.FC<{
  product: Product | null;
  onClose: () => void;
  onSubmit: (inq: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
}> = ({ product, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState(product ? product.category : 'Bulk / Wholesale');
  const [message, setMessage] = useState(
    product ? `Hello, I am interested in ordering/inquiring about ${product.name} (${product.priceRange}). Please share wholesale details.` : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    onSubmit({
      name,
      phone,
      email,
      interest,
      message,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-emerald-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg transition-colors"
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl">
            🪴
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900">
              {product ? `Inquire for ${product.name}` : 'Wholesale Plant Inquiry'}
            </h3>
            <p className="text-xs text-stone-500">Sri Krishna Nursery & Farm · Bengaluru</p>
          </div>
        </div>

        {product && (
          <div className="flex items-center gap-3 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100/80 mb-4">
            <img 
              src={product.image} 
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 object-cover rounded-lg border border-emerald-200/50"
            />
            <div>
              <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">{product.category}</p>
              <p className="text-sm font-bold text-stone-800">{product.name}</p>
              <p className="text-xs text-amber-700 font-medium">Indicative Wholesale Price: {product.priceRange}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Your Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Gowda"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="e.g. 099003 87803"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Category Interest</label>
              <select
                value={interest}
                onChange={e => setInterest(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-hidden bg-white"
              >
                <option value="Indoor">Indoor Plants</option>
                <option value="Outdoor">Outdoor Plants</option>
                <option value="Fruit Plants">Fruit Plants</option>
                <option value="Garden Supplies">Garden Supplies</option>
                <option value="Bulk / Wholesale">Bulk / Wholesale Project</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Email Address (Optional)</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Requirement Details</label>
            <textarea
              rows={3}
              placeholder="Specify quantity needed, delivery location in Bengaluru, or specific plant varieties..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-hidden resize-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Submit Inquiry</span>
              <span>→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
