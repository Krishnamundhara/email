'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

interface SidebarProps {
  activePage?: string;
}

export default function Sidebar({ activePage }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated && pathname !== '/signin') {
      router.push('/signin');
    }
  }, [pathname, router]);

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    toast.success('Signed out successfully');
    router.push('/signin');
  };

  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/dashboard' },
    { name: 'Bulk Email', icon: '📧', path: '/dashboard/bulk-email' },
    { name: 'Templates', icon: '📝', path: '/dashboard/templates' },
    { name: 'History', icon: '📈', path: '/dashboard/history' },
    { name: 'Settings', icon: '⚙️', path: '/dashboard/settings' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-700 p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="text-3xl">✉️</div>
        <h1 className="text-2xl font-bold text-white">Emailer Pro</h1>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => router.push(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              pathname === item.path || activePage === item.name.toLowerCase()
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all mt-4 border border-red-500/20 hover:border-red-500/40"
      >
        <span className="text-xl">🚪</span>
        <span className="font-medium">Sign Out</span>
      </button>
    </div>
  );
}
