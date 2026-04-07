import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { UserCircle, Mail, Hash, LogOut, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

export function ProfileView() {
  const { user, loginUser, logoutUser } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      loginUser(name, email);
    }
  };

  if (user) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 flex flex-col items-center">
        <div className="w-full glass-card p-10 bg-white/80 dark:bg-slate-800/80 dark:border-slate-700 transition-colors duration-300 relative overflow-hidden">
           {/* Decorative BG */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-trust-blue/5 dark:bg-trust-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

           <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
              <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden shrink-0">
                 <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 flex flex-col text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                   <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                   <ShieldCheck className="text-success-green dark:text-green-400" size={24} />
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium mb-6 flex items-center justify-center md:justify-start gap-2">
                  <Mail size={16} /> {user.email}
                </p>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 p-4 rounded-xl flex flex-col transition-colors duration-300">
                     <span className="text-xs text-gray-400 dark:text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Hash size={14}/> Patient ID</span>
                     <span className="font-mono text-gray-800 dark:text-slate-200 font-medium">{user.patientId}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 p-4 rounded-xl flex flex-col transition-colors duration-300">
                     <span className="text-xs text-gray-400 dark:text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Activity size={14}/> Status</span>
                     <span className="text-trust-blue dark:text-blue-400 font-bold">Active</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 w-full flex justify-end">
                   <button 
                     onClick={logoutUser}
                     className="flex items-center gap-2 px-6 py-2.5 rounded-full text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 font-semibold transition-colors text-sm"
                   >
                     <LogOut size={16} />
                     Sign Out
                   </button>
                </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mt-12">
      <div className="glass-card p-8 bg-white/80 dark:bg-slate-800/80 dark:border-slate-700 transition-colors duration-300 flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-50 dark:bg-slate-700 rounded-full flex items-center justify-center mb-6 border border-blue-100 dark:border-slate-600 transition-colors">
          <UserCircle size={32} className="text-trust-blue dark:text-blue-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Welcome!</h2>
        <p className="text-gray-500 dark:text-slate-400 text-sm text-center mb-8 transition-colors">
          Please sign in to view your profile and sync your medical history across your devices.
        </p>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-slate-300 ml-1 transition-colors">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Smith"
              className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 dark:text-white dark:placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-trust-blue/50 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-slate-300 ml-1 transition-colors">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 dark:text-white dark:placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-trust-blue/50 transition-colors"
            />
          </div>

          <button 
            type="submit"
            className="mt-4 w-full bg-trust-blue hover:opacity-90 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
          >
            Access Profile
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
