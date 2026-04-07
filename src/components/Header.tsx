'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Globe } from 'lucide-react';
import { useStore } from '@/store/useStore';

export function Header() {
  const { t, i18n } = useTranslation();
  const { resetFlow } = useStore();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <button onClick={resetFlow} className="flex items-center gap-3 hover:opacity-80 transition-opacity text-left">
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-sm flex items-center justify-center p-1">
          <Image src="/logo.png" alt="Derma Guide Logo" width={40} height={40} className="object-contain" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          <span className="text-trust-blue px-1">DERMA</span>GUIDE
        </h1>
      </button>
      
      <button 
        onClick={toggleLanguage}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
      >
        <Globe size={16} />
        {i18n.language === 'en' ? 'हिन्दी' : 'EN'}
      </button>
    </header>
  );
}
