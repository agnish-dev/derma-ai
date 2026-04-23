'use client';

import { useTranslation } from 'react-i18next';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { FileDown, RefreshCcw, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export function TriageDashboard() {
  const { t } = useTranslation();
  const { triageResult, conditionName, capturedImage, resetFlow } = useStore();

  const getUrgencyConfig = () => {
    switch (triageResult) {
      case 'Seek Care Today':
        return { color: 'bg-urgency-red', text: 'text-urgency-red', icon: AlertTriangle, label: t('results.seekCareToday') };
      case 'See Doctor':
        return { color: 'bg-warning-yellow', text: 'text-warning-yellow', icon: Clock, label: t('results.seeDoctor') };
      default:
        return { color: 'bg-success-green', text: 'text-success-green', icon: CheckCircle, label: t('results.routine') };
    }
  };

  const config = getUrgencyConfig();
  const Icon = config.icon;

  return (
    <div className="flex flex-col w-full max-w-md mx-auto mt-6 space-y-4">
      {/* Result Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card p-6 bg-white/80 dark:bg-slate-800/80 dark:border-slate-700 transition-colors relative overflow-hidden"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white transition-colors">{t('results.title')}</h2>
        
        {/* Status Bar */}
        <div className="flex items-center justify-between text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 transition-colors">
          <span>{t('results.routine')}</span>
          <span>{t('results.seeDoctor')} / Seek Care</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full mb-6 overflow-hidden flex transition-colors">
           <div className={`h-full ${config.color} transition-all duration-500 delay-300`} style={{ width: triageResult === 'Routine' ? '33%' : triageResult === 'See Doctor' ? '66%' : '100%' }} />
        </div>

        <div className="flex items-center gap-4 bg-white/50 dark:bg-slate-700/50 p-4 rounded-xl border border-white/60 dark:border-slate-600/50 shadow-sm transition-colors">
          {capturedImage && (
            <img src={capturedImage} alt="Scanned region" className="w-20 h-20 object-cover rounded-lg shadow-sm" />
          )}
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase transition-colors">{t('results.predicted')}</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white mt-1 leading-tight drop-shadow-sm">{conditionName || 'Unknown'}</span>
            <div className="mt-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border dark:border-slate-600 shadow-sm ${config.text} text-xs font-bold transition-colors`}>
                <Icon size={14} />
                {config.label}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4 print:hidden"
      >
        <button 
          onClick={() => window.print()}
          className="flex-1 min-h-[48px] bg-trust-blue hover:opacity-90 text-white font-semibold rounded-full flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <FileDown size={20} />
          {t('results.download')}
        </button>
        <button 
          onClick={resetFlow}
          className="min-h-[48px] px-6 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-semibold rounded-full flex items-center justify-center transition-all border dark:border-slate-600 shadow-sm"
        >
          <RefreshCcw size={20} />
        </button>
      </motion.div>
    </div>
  );
}
