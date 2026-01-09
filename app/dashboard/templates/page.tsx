'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';

const TEMPLATES = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    subject: 'Welcome to {{company}}!',
    body: 'Hi {{name}},\n\nWelcome aboard! We\'re excited to have you join us.\n\nBest regards,\nThe Team',
    category: 'Onboarding',
  },
  {
    id: 'followup',
    name: 'Follow-up Email',
    subject: 'Following up on our conversation',
    body: 'Hi {{name}},\n\nI wanted to follow up on our recent discussion about {{topic}}.\n\nLooking forward to hearing from you.\n\nBest,\nTeam',
    category: 'Sales',
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    subject: '{{company}} Newsletter - {{month}}',
    body: 'Hi {{name}},\n\nHere\'s what\'s new this month at {{company}}:\n\n- Feature 1\n- Feature 2\n- Feature 3\n\nStay tuned!\n\nCheers,\nThe Team',
    category: 'Marketing',
  },
  {
    id: 'reminder',
    name: 'Reminder Email',
    subject: 'Reminder: {{event}} is coming up',
    body: 'Hi {{name}},\n\nThis is a friendly reminder that {{event}} is scheduled for {{date}}.\n\nSee you there!\n\nBest,\nTeam',
    category: 'General',
  },
];

export default function TemplatesPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const template = TEMPLATES.find((t) => t.id === selectedTemplate);

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
            { name: 'Templates', icon: '📝', path: '/dashboard/templates', active: true },
            { name: 'History', icon: '📈', path: '/dashboard/history' },
            { name: 'Settings', icon: '⚙️', path: '/dashboard/settings' },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active
                  ? 'bg-purple-600 text-white'
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
            <h1 className="text-4xl font-bold text-white mb-2">Email Templates</h1>
            <p className="text-slate-400 text-lg">
              Pre-built templates for common email scenarios
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Template List */}
            <div className="lg:col-span-2 space-y-4">
              {TEMPLATES.map((tmpl, index) => (
                <motion.div
                  key={tmpl.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`bg-slate-800 rounded-xl p-6 border-2 cursor-pointer transition-all hover:border-purple-500 ${
                    selectedTemplate === tmpl.id
                      ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                      : 'border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{tmpl.name}</h3>
                      <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full">
                        {tmpl.category}
                      </span>
                    </div>
                    <div className="text-3xl">📄</div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Subject:</div>
                      <div className="text-sm text-slate-300 font-medium">{tmpl.subject}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Preview:</div>
                      <div className="text-sm text-slate-300 line-clamp-2">
                        {tmpl.body.substring(0, 100)}...
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Template Preview */}
            <div className="space-y-6">
              {template ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-800 rounded-xl p-6 border border-slate-700 sticky top-8"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span>👁️</span> Template Preview
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Template Name</label>
                      <div className="text-white font-medium">{template.name}</div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Category</label>
                      <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full">
                        {template.category}
                      </span>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Subject</label>
                      <div className="p-3 bg-slate-700 rounded-lg text-sm text-white font-mono">
                        {template.subject}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Body</label>
                      <div className="p-3 bg-slate-700 rounded-lg text-sm text-white font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">
                        {template.body}
                      </div>
                    </div>

                    <button
                      onClick={() => router.push('/dashboard/bulk-email')}
                      className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <span>📧</span>
                      Use This Template
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="text-center text-slate-400 py-12">
                    <div className="text-5xl mb-4">📝</div>
                    <p>Select a template to preview</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
