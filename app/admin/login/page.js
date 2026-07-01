'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Invalid password');
      }

      router.push('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F0F7FF] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#2563EB]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield size={32} className="text-[#2563EB]" />
          </div>
          <h1 className="text-2xl font-semibold text-[#1E293B]">Admin Login</h1>
          <p className="text-sm text-[#6B7080] mt-1">CoreTech Systems Control Tower</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-2.5 border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#475569] mb-1.5">Admin Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent pr-10"
                autoFocus
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading || !password}
            className="w-full bg-[#2563EB] text-white rounded-xl py-2.5 text-sm font-medium hover:bg-[#1D4ED8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? 'Verifying...' : 'Sign In'}
          </button>

          <p className="text-xs text-[#94A3B8] text-center">
            Default password is set via <code className="bg-[#F1F5F9] px-1 rounded">ADMIN_PASSWORD</code> env var
          </p>
        </form>
      </div>
    </main>
  );
}
