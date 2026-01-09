'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="text-3xl">✉️</div>
          <h1 className="text-2xl font-bold text-white">Emailer Pro</h1>
        </div>

        <nav className="space-y-2">
          {[
            { name: 'Dashboard', icon: '📊', path: '/dashboard' },
            { name: 'Bulk Email', icon: '📧', path: '/dashboard/bulk-email' },
            { name: 'Templates', icon: '📝', path: '/dashboard/templates' },
            { name: 'History', icon: '📈', path: '/dashboard/history' },
            { name: 'Settings', icon: '⚙️', path: '/dashboard/settings', active: true },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active
                  ? 'bg-gray-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
            <p className="text-slate-400 text-lg">
              Configure your SMTP settings and preferences
            </p>
          </motion.div>

          <div className="space-y-6">
            {/* SMTP Configuration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>📮</span> SMTP Configuration
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">SMTP Host</label>
                    <input
                      type="text"
                      value="smtp.gmail.com"
                      disabled
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">SMTP Port</label>
                    <input
                      type="text"
                      value="587"
                      disabled
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Email Address</label>
                  <input
                    type="email"
                    value="krishnamundhara183@gmail.com"
                    disabled
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-300 mb-2 block">App Password</label>
                  <input
                    type="password"
                    value="••••••••••••••••"
                    disabled
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">ℹ️</span>
                    <div>
                      <h3 className="text-blue-400 font-bold mb-1">SMTP Settings</h3>
                      <p className="text-blue-200/80 text-sm">
                        SMTP settings are configured in your <code className="bg-slate-700 px-2 py-1 rounded">backend/.env</code> file.
                        Update the file and restart the backend to apply changes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Email Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>✉️</span> Email Settings
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Max Batch Size</label>
                    <input
                      type="number"
                      value="50"
                      disabled
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Batch Delay (ms)</label>
                    <input
                      type="number"
                      value="500"
                      disabled
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Max Retries</label>
                  <input
                    type="number"
                    value="3"
                    disabled
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>
              </div>
            </motion.div>

            {/* Database */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>🗄️</span> Database
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Supabase URL</label>
                  <input
                    type="text"
                    value="https://aeqnqruwkylpwdzjuurc.supabase.co"
                    disabled
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="text-green-400 font-bold">Database Connected</h3>
                    <p className="text-green-200/80 text-sm">All tables are configured and ready</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
