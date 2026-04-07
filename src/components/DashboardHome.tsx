import { useStore } from '@/store/useStore';
import { Sparkles, Activity, FileText, Calendar, AlertTriangle, Clock, CheckCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function DashboardHome() {
  const { setCurrentView, historyLogs, user } = useStore();
  
  // Filter logs to match the signed in user's profile
  const userLogs = user ? historyLogs.filter(log => log.patientName === user.name) : [];
  const lastLog = userLogs.length > 0 ? userLogs[0] : null;
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const getUrgencyConfig = (urgency: string) => {
    switch (urgency) {
      case 'Seek Care Today':
        return { color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800', icon: AlertTriangle };
      case 'See Doctor':
        return { color: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800', icon: Clock };
      default:
        return { color: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800', icon: CheckCircle };
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4 flex flex-col items-center relative gap-8 pb-12">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full glass-card p-10 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-800/80 dark:border-slate-700 transition-colors duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
      >
        <div className="w-20 h-20 bg-blue-50 dark:bg-trust-blue/20 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100 dark:border-trust-blue/30">
          <Activity size={36} className="text-trust-blue dark:text-blue-400" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 tracking-tight">Symptom Consultation Dashboard</h2>
        <p className="text-center text-gray-500 dark:text-slate-300 max-w-lg mb-10 leading-relaxed">
          Welcome to your interactive medical dashboard. Click below to begin a new reactive symptom consultation and receive an instant AI skin analysis triage.
        </p>
        
        <button 
          onClick={() => setCurrentView('analysis')}
          className="px-8 py-4 bg-trust-blue hover:opacity-90 text-white font-bold rounded-full flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/30 text-lg"
        >
          <Sparkles size={24} />
          Start New AI Analysis
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-2">
         <div className="glass-card p-6 bg-white/60 dark:bg-slate-800/60 dark:border-slate-700 transition-colors duration-300">
            <h3 className="font-semibold text-gray-700 dark:text-slate-200 flex items-center gap-2 mb-4"><FileText size={18}/> Recent Consultations</h3>
            <div className="flex flex-col gap-3">
              {lastLog ? (() => {
                 const config = getUrgencyConfig(lastLog.urgency || 'Routine');
                 const Icon = config.icon;
                 return (
                   <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-100 dark:border-slate-600 flex flex-col gap-2 cursor-pointer hover:bg-white dark:hover:bg-slate-600 transition-colors" onClick={() => setCurrentView('history')}>
                      <div className="flex justify-between items-start">
                         <h4 className="font-bold text-gray-900 dark:text-white">{lastLog.conditionName}</h4>
                         <div className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${config.color}`}>
                            <Icon size={10} />
                            {lastLog.urgency}
                         </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                         <Calendar size={12} />
                         {new Date(lastLog.date).toLocaleDateString()}
                      </div>
                   </div>
                 );
              })() : (
                 <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg text-sm text-gray-600 dark:text-slate-300 border border-gray-100 dark:border-slate-600">No recent consultations found.</div>
              )}
            </div>
         </div>
         
         <div 
           onClick={() => setIsAboutOpen(true)}
           className="glass-card p-6 bg-white/60 dark:bg-slate-800/60 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors duration-300 cursor-pointer flex flex-col items-center justify-center text-center group"
         >
           <div className="w-12 h-12 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Info size={24} className="text-gray-500 dark:text-slate-400" />
           </div>
           <h3 className="font-bold text-gray-800 dark:text-slate-200 mb-2">About Section</h3>
           <p className="text-xs text-gray-500 dark:text-slate-400 max-w-xs">Click here to learn more about DermaGuide&apos;s AI analysis system and capabilities.</p>
         </div>
      </div>

      <AnimatePresence>
        {isAboutOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsAboutOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg glass-card bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Info className="text-trust-blue dark:text-blue-400" size={24} /> 
                  About DermaGuide
                </h3>
                <button 
                  onClick={() => setIsAboutOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-500 dark:text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 text-sm text-gray-600 dark:text-slate-300 leading-relaxed space-y-4">
                <p>
                  DermaGuide is an AI-powered skin support system that analyzes user-uploaded images along with symptoms to provide early, non-diagnostic guidance.
                </p>
                <p>
                  It identifies possible conditions, assigns confidence levels, and classifies risk to help users understand the seriousness of their situation. The system offers clear explanations and suggests next steps such as home care, monitoring, or consulting a doctor. 
                </p>
                <p className="font-semibold text-gray-800 dark:text-slate-200 border-l-4 border-trust-blue dark:border-blue-500 pl-3">
                  Designed as a decision-support tool, it focuses on safety, clarity, and accessibility.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
