import { useStore } from '@/store/useStore';
import { History, Calendar, AlertTriangle, Clock, CheckCircle, ChevronDown, ChevronUp, FileDown } from 'lucide-react';
import { useState, useMemo } from 'react';

export function MedicalHistoryView() {
  const { historyLogs, user } = useStore();
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const userLogs = useMemo(() => {
    return user ? historyLogs.filter(log => log.patientName === user.name) : [];
  }, [historyLogs, user]);

  const getUrgencyConfig = (urgency: string) => {
    switch (urgency) {
      case 'Seek Care Today':
        return { color: 'bg-red-50 text-red-700 border-red-200', icon: AlertTriangle };
      case 'See Doctor':
        return { color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock };
      default:
        return { color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle };
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4 flex flex-col">
      <div className="flex items-center gap-3 mb-8 print:hidden">
        <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center text-trust-blue border border-gray-100 dark:border-slate-700 transition-colors duration-300">
          <History size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">Medical History</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">Review past AI analyses and symptomatic assessments.</p>
        </div>
      </div>

      {!user ? (
         <div className="glass-card p-10 bg-white/70 dark:bg-slate-800/70 border-gray-300 dark:border-slate-700 flex flex-col items-center justify-center text-center transition-colors">
            <History className="text-gray-300 dark:text-gray-600 mb-4" size={48} />
            <h3 className="text-lg font-bold text-gray-700 dark:text-white">Not authenticated</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Sign in via your Profile to access your medical history across devices.</p>
         </div>
      ) : userLogs.length === 0 ? (
         <div className="glass-card p-10 bg-white/70 dark:bg-slate-800/70 flex flex-col items-center justify-center text-center border border-dashed border-gray-300 dark:border-slate-600 transition-colors">
            <h3 className="text-lg font-bold text-gray-700 dark:text-white">No records found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Complete an AI analysis to see your history logged here.</p>
         </div>
      ) : (
        <div className="flex flex-col gap-4">
          {userLogs.map((log) => {
            const config = getUrgencyConfig(log.urgency || 'Routine');
            const Icon = config.icon;
            
            return (
              <div 
                key={log.id} 
                onClick={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)}
                className={`glass-card bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800/90 transition-colors cursor-pointer border-l-4 overflow-hidden shadow-sm ${expandedLogId && expandedLogId !== log.id ? 'print:hidden' : ''}`} 
                style={{borderLeftColor: log.urgency === 'Seek Care Today' ? '#dc3545' : log.urgency === 'See Doctor' ? '#ffc107' : '#28a745'}}
              >
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">{log.id}</span>
                     <h4 className="text-lg font-bold text-gray-900 dark:text-white drop-shadow-sm">{log.conditionName}</h4>
                     <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                        <Calendar size={14} />
                        {new Date(log.date).toLocaleDateString()} at {new Date(log.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                     </div>
                  </div>
                  
                  <div className="flex flex-col items-start md:items-end gap-2">
                     <div className="flex items-center gap-4">
                        <span className="text-xs font-medium text-gray-400 hidden md:block">Patient: {log.patientName}</span>
                        <div className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 text-xs font-bold ${config.color}`}>
                           <Icon size={14} />
                           {log.urgency}
                        </div>
                        {expandedLogId === log.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                     </div>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {expandedLogId === log.id && (
                  <div className="px-5 pb-6 pt-2 border-t border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/30">
                     <h5 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4 mt-2">Symptomatic Survey Answers</h5>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-100 dark:border-slate-700 shadow-sm">
                          <span className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-slate-500 mb-1">Duration</span>
                          <span className="text-sm font-semibold text-gray-800 dark:text-slate-200">{log.surveyData.duration || 'Not specified'}</span>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-100 dark:border-slate-700 shadow-sm">
                          <span className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-slate-500 mb-1">Pain Level</span>
                          <span className="text-sm font-semibold text-gray-800 dark:text-slate-200">{log.surveyData.pain || 'Not specified'}</span>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-100 dark:border-slate-700 shadow-sm">
                          <span className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-slate-500 mb-1">Spreading</span>
                          <span className="text-sm font-semibold text-gray-800 dark:text-slate-200">{log.surveyData.spreading || 'Not specified'}</span>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-100 dark:border-slate-700 shadow-sm">
                          <span className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-slate-500 mb-1">Fever</span>
                          <span className="text-sm font-semibold text-gray-800 dark:text-slate-200">{log.surveyData.fever || 'Not specified'}</span>
                        </div>
                     </div>
                     <div className="mt-5 flex justify-end print:hidden">
                        <button 
                          onClick={(e) => { e.stopPropagation(); window.print(); }}
                          className="bg-trust-blue hover:opacity-90 text-white font-semibold py-2 px-5 rounded-full flex items-center gap-2 shadow-sm transition-all text-sm"
                        >
                          <FileDown size={16} />
                          Download Report
                        </button>
                     </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
