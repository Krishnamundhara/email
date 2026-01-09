'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';

export default function DashboardPage() {
  const router = useRouter();

  const cards = [
    {
      title: 'Send Bulk Email',
      description: 'Send emails to multiple recipients at once',
      icon: '📧',
      color: 'from-blue-500 to-blue-600',
      action: () => router.push('/dashboard/bulk-email'),
    },
    {
      title: 'Templates',
      description: 'Manage your email templates',
      icon: '📝',
      color: 'from-purple-500 to-purple-600',
      action: () => router.push('/dashboard/templates'),
    },
    {
      title: 'Campaign History',
      description: 'View past email campaigns',
      icon: '📊',
      color: 'from-green-500 to-green-600',
      action: () => router.push('/dashboard/history'),
    },
    {
      title: 'Settings',
      description: 'Configure SMTP and preferences',
      icon: '⚙️',
      color: 'from-gray-500 to-gray-600',
      action: () => router.push('/dashboard/settings'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar activePage="dashboard" />

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-slate-400 text-lg">
              Welcome to your email campaign manager
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={card.action}
                  className="w-full text-left group"
                >
                  <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16" />
                    <div className="relative z-10">
                      <div className="text-5xl mb-4">{card.icon}</div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {card.title}
                      </h3>
                      <p className="text-white/80">{card.description}</p>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
