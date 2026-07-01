'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, PlusCircle, LogOut, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const isActive = (path) => pathname === path || pathname.startsWith(path + '/');

  const navItems = [
    { href: '/admin', label: 'Control Tower', icon: LayoutDashboard },
    { href: '/admin/products/new', label: 'Add Product', icon: PlusCircle },
    { href: '/admin', label: 'All Products', icon: Package },
  ];

  if (!mounted) return null;

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-[#F0F7FF]">{children}</div>;
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="px-5 py-6 border-b border-[#E2E8F0]">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
            <LayoutDashboard size={16} className="text-white" />
          </div>
          <div className={`${!sidebarOpen && 'hidden'} transition-all`}>
            <p className="text-sm font-semibold text-[#1E293B]">Admin Panel</p>
            <p className="text-[10px] text-[#94A3B8]">Core Tech Systems</p>
          </div>
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'text-[#6B7080] hover:text-[#1E293B] hover:bg-[#F1F5F9]'
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 1.5} />
              <span className={`${!sidebarOpen && 'hidden'} transition-all`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-[#E2E8F0]">
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6B7080] hover:text-red-500 hover:bg-red-50 w-full transition-all">
          <LogOut size={18} />
          <span className={`${!sidebarOpen && 'hidden'} transition-all`}>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex">
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col bg-white border-r border-[#E2E8F0] transition-all duration-300 ${
        sidebarOpen ? 'w-56' : 'w-16'
      }`}>
        {sidebarContent}
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute bottom-20 -right-3 w-6 h-6 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] hover:text-[#1E293B] transition-colors shadow-sm">
          {sidebarOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[#E2E8F0]">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 text-[#6B7080] hover:text-[#1E293B]">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#2563EB] flex items-center justify-center">
              <LayoutDashboard size={12} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-[#1E293B]">Admin</span>
          </div>
          <div className="w-8" />
        </div>

        {/* Page Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
