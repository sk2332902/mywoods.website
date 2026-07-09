import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, ShieldAlert, Key, User } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in both fields.');
      return;
    }

    setLoading(true);
    // Mimic API delay
    setTimeout(() => {
      if (username.trim() === 'admin' && password.trim() === 'admin') {
        onLogin();
        navigate('/cms');
      } else {
        setError('Invalid username or password. (Hint: use admin / admin)');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="bg-slate-50 flex-grow flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-md p-8 relative overflow-hidden">
        
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-cyan-400 to-teal-400"></div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-cyan-50 rounded-2xl text-cyan-600 mb-3">
            <Key className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Admin Portal</h2>
          <p className="text-slate-500 text-sm mt-1">
            Access protected inventory and CMS dashboard.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg flex items-start gap-2">
            <ShieldAlert className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <User className="h-5 w-5" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Key className="h-5 w-5" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Help Info Box */}
          <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-lg text-xs text-slate-500 leading-relaxed">
            <span className="font-bold text-slate-700 block mb-0.5">Demo Credentials</span>
            Use Username: <code className="bg-slate-200/80 px-1 py-0.5 rounded font-mono font-bold text-slate-700">admin</code> and Password: <code className="bg-slate-200/80 px-1 py-0.5 rounded font-mono font-bold text-slate-700">admin</code>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-900 rounded-xl text-sm font-bold shadow-md shadow-cyan-500/15 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              'Authenticating...'
            ) : (
              <>
                <LogIn className="mr-2 h-4.5 w-4.5" />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
