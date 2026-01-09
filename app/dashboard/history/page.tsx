'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import * as api from '@/lib/api';

interface Campaign {
  id: string;
  name: string;
  subject: string;
  total_emails: number;
  verified_emails: number;
  sent_emails: number;
  failed_emails: number;
  status: string;
  created_at: string;
  started_at?: string;
  completed_at?: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const data = await api.getAllCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'sending':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'stopped':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'draft':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
            { name: 'History', icon: '📈', path: '/dashboard/history', active: true },
            { name: 'Settings', icon: '⚙️', path: '/dashboard/settings' },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active
                  ? 'bg-green-600 text-white'
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
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Campaign History</h1>
            <p className="text-slate-400 text-lg">
              View your past email campaigns and their performance
            </p>
          </motion.div>

          {isLoading ? (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-12 text-center">
              <div className="text-5xl mb-4">⏳</div>
              <p className="text-slate-400">Loading campaigns...</p>
            </div>
          ) : campaigns.length === 0 ? (
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-2xl font-bold text-white mb-2">No campaigns yet</h3>
                <p className="text-slate-400 mb-6">
                  Start sending emails to see your campaign history here
                </p>
                <button
                  onClick={() => router.push('/dashboard/bulk-email')}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all"
                >
                  Send Your First Campaign
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{campaign.subject}</h3>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(campaign.status)}`}>
                          {campaign.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">{campaign.name}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-400">Created</div>
                      <div className="text-sm text-white font-medium">{formatDate(campaign.created_at)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-slate-900 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">Total Emails</div>
                      <div className="text-2xl font-bold text-white">{campaign.total_emails}</div>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">Verified</div>
                      <div className="text-2xl font-bold text-green-400">{campaign.verified_emails}</div>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">Sent</div>
                      <div className="text-2xl font-bold text-blue-400">{campaign.sent_emails || 0}</div>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">Failed</div>
                      <div className="text-2xl font-bold text-red-400">{campaign.failed_emails || 0}</div>
                    </div>
                  </div>

                  {campaign.completed_at && (
                    <div className="text-xs text-slate-500">
                      Completed: {formatDate(campaign.completed_at)}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
