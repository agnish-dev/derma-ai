'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Footer } from '@/components/layout/Footer';
import { DashboardHome } from '@/components/features/DashboardHome';
import { ProfileView } from '@/components/features/ProfileView';
import { MedicalHistoryView } from '@/components/features/MedicalHistoryView';
import { CameraView } from '@/components/features/CameraView';
import { SurveyWizard } from '@/components/features/SurveyWizard';
import { TriageDashboard } from '@/components/features/TriageDashboard';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { currentStep, currentView, isSidebarOpen } = useStore();

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gradient-to-b from-blue-50/50 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 transition-colors duration-500">
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, x: -256 }}
            animate={{ width: 256, x: 0 }}
            exit={{ width: 0, x: -256 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-shrink-0 h-full overflow-hidden border-r dark:border-slate-800 print:hidden"
          >
            <div className="w-64 h-full">
               <Sidebar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex-1 flex flex-col relative z-10 w-full overflow-y-auto">
         {/* Moving Stars Background (Only visible in dark mode via opacity transition) */}
         <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute inset-0 w-[200vw] h-[200vh] stars-bg" />
         </div>

         {/* Decorative tech background elements */}
         <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_50%_0%,rgba(32,86,179,0.05)_0%,transparent_70%)] pointer-events-none z-0" />
         
         <div className="relative z-10 print:hidden">
            <DashboardHeader />
         </div>
         
         <main className="flex-1 p-6 relative print:p-0 print:bg-white">
            <AnimatePresence mode="wait">
              {currentView === 'analysis' ? (
                <motion.div
                  key="analysis-flow"
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full flex flex-col items-center max-w-4xl mx-auto"
                >
                  {/* Minimal breadcrumb for the analysis flow */}
                  <div className="w-full mb-4 px-4 flex items-center justify-between text-sm text-gray-500 font-medium">
                     <span>Symptom Consultation Request</span>
                  </div>

                  {currentStep === 0 && <CameraView />}
                  {currentStep === 1 && <SurveyWizard />}
                  {currentStep === 2 && <TriageDashboard />}
                </motion.div>
              ) : currentView === 'profile' ? (
                <motion.div key="profile-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ProfileView />
                </motion.div>
              ) : currentView === 'history' ? (
                <motion.div key="history-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <MedicalHistoryView />
                </motion.div>
              ) : (
                <motion.div key="dashboard-home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <DashboardHome />
                </motion.div>
              )}
            </AnimatePresence>
         </main>
         
         <Footer />
      </div>
    </div>
  );
}
