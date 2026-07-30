import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const { businessInfo } = useApp();

  const url = `https://wa.me/${businessInfo.whatsappPhone}?text=Hello%20Sri%20Krishna%20Nursery,%20I%20am%20interested%20in%20purchasing%20plants%20or%20getting%20a%20wholesale%20quote.`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg shadow-emerald-700/30 transition-all hover:scale-105 active:scale-95 text-xs font-bold"
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare className="w-5 h-5" />
      <span className="hidden sm:inline">WhatsApp Us</span>
    </a>
  );
};
