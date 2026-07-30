import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const AppContent: React.FC = () => {
  const { activeRoute, isAdminLoggedIn } = useApp();

  const renderCurrentPage = () => {
    switch (activeRoute) {
      case 'products':
        return <ProductsPage />;
      case 'about':
        return <AboutPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin-login':
        return isAdminLoggedIn ? <AdminDashboardPage /> : <AdminLoginPage />;
      case 'admin-dashboard':
        return isAdminLoggedIn ? <AdminDashboardPage /> : <AdminLoginPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9F5] text-stone-800 font-sans flex flex-col justify-between selection:bg-emerald-200 selection:text-emerald-900">
      <Header />
      
      <main className="flex-1 py-4">
        {renderCurrentPage()}
      </main>

      <Footer />
      <WhatsAppWidget />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
