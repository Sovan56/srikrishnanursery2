import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, Leaf, ShieldAlert, KeyRound, Info } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, navigateTo } = useApp();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const success = loginAdmin(username, password);
    if (!success) {
      setErrorMsg('Invalid username or password. Please use admin / admin123.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center max-w-md mx-auto px-4 py-12">
      <div className="w-full bg-white rounded-3xl p-8 border border-stone-200/90 shadow-xl space-y-6 relative overflow-hidden">
        
        {/* Top Decorative Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold mx-auto shadow-md shadow-emerald-700/20">
            <Lock className="w-6 h-6 text-emerald-100" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900">Admin Portal Login</h1>
          <p className="text-xs text-stone-500">Sri Krishna Nursery & Farm Demo Management</p>
        </div>

        {/* DEMO CREDENTIALS HINT BOX */}
        <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-900">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Demo Portal Access Credentials</span>
          </div>
          <p className="text-[11px] text-amber-800">
            Username: <code className="bg-amber-100 px-1.5 py-0.5 rounded font-bold">admin</code> | Password: <code className="bg-amber-100 px-1.5 py-0.5 rounded font-bold">admin123</code>
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-800 text-xs font-semibold rounded-xl border border-red-200 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Sign In to Admin Dashboard</span>
          </button>
        </form>

        <div className="text-center pt-2 border-t border-stone-100">
          <button
            onClick={() => navigateTo('home')}
            className="text-xs font-bold text-stone-500 hover:text-stone-800 hover:underline"
          >
            ← Return to Public Website
          </button>
        </div>

      </div>
    </div>
  );
};
