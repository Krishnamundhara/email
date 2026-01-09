'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import * as api from '@/lib/api';

const PLACEHOLDERS = [
  { key: '{{name}}', description: 'Recipient name' },
  { key: '{{email}}', description: 'Recipient email' },
  { key: '{{company}}', description: 'Company name' },
  { key: '{{position}}', description: 'Job position' },
];

const EMAIL_TEMPLATES = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    subject: 'Welcome to {{company}}!',
    body: 'Hi {{name}},\n\nWelcome aboard! We\'re excited to have you.\n\nBest regards,\nThe Team',
  },
  {
    id: 'followup',
    name: 'Follow-up Email',
    subject: 'Following up on our conversation',
    body: 'Hi {{name}},\n\nI wanted to follow up on our recent discussion.\n\nLooking forward to hearing from you.\n\nBest,\nTeam',
  },
  {
    id: 'custom',
    name: 'Custom Email',
    subject: '',
    body: '',
  },
];

export default function BulkEmailPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'template' | 'custom'>('custom');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [emails, setEmails] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verifyOnly, setVerifyOnly] = useState(false);

  const handleTemplateSelect = (templateId: string) => {
    const template = EMAIL_TEMPLATES.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSubject(template.subject);
      setBody(template.body);
    }
  };

  const insertPlaceholder = (placeholder: string) => {
    setBody((prev) => prev + placeholder);
  };

  const handleSend = async () => {
    try {
      setIsLoading(true);

      const emailList = emails
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (emailList.length === 0) {
        toast.error('Please enter at least one email');
        return;
      }

      if (!subject.trim()) {
        toast.error('Please enter a subject');
        return;
      }

      if (!body.trim()) {
        toast.error('Please enter message body');
        return;
      }

      const campaignName = `Campaign-${Date.now()}`;
      const response = await api.createCampaign(
        campaignName,
        emailList,
        subject,
        body
      );

      toast.success(`Processed ${response.totalEmails} emails successfully!`);
      
      if (!verifyOnly) {
        await api.sendCampaign(response.campaignId);
        toast.success('Emails are being sent!');
      }

      // Reset form
      setEmails('');
      setSubject('');
      setBody('');
      setSelectedTemplate('');
    } catch (error) {
      toast.error('Failed to process emails');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="text-3xl">✉️</div>
          <h1 className="text-2xl font-bold text-white">Emailer Pro</h1>
        </div>

        <nav className="space-y-2">
          {[
            { name: 'Dashboard', icon: '📊', path: '/dashboard' },
            { name: 'Bulk Email', icon: '📧', path: '/dashboard/bulk-email', active: true },
            { name: 'Templates', icon: '📝', path: '/dashboard/templates' },
            { name: 'History', icon: '📈', path: '/dashboard/history' },
            { name: 'Settings', icon: '⚙️', path: '/dashboard/settings' },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active
                  ? 'bg-blue-600 text-white'
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
            <h1 className="text-4xl font-bold text-white mb-2">Bulk Email</h1>
            <p className="text-slate-400 text-lg">
              Send emails to all recipients at once
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Email Configuration */}
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h2 className="text-xl font-bold text-white mb-6">Email Configuration</h2>

                {/* Composition Mode */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-slate-300 mb-3 block">
                    Composition Mode
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setMode('template')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        mode === 'template'
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-slate-600 bg-slate-700/50 text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-2xl mb-2">📄</div>
                      <div className="font-semibold">Use Template</div>
                    </button>
                    <button
                      onClick={() => setMode('custom')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        mode === 'custom'
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-slate-600 bg-slate-700/50 text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-2xl mb-2">✍️</div>
                      <div className="font-semibold">Custom Email</div>
                    </button>
                  </div>
                </div>

                {/* Template Selection */}
                {mode === 'template' && (
                  <div className="mb-6">
                    <label className="text-sm font-semibold text-slate-300 mb-2 block">
                      Select Template
                    </label>
                    <select
                      value={selectedTemplate}
                      onChange={(e) => handleTemplateSelect(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="">-- Choose a template --</option>
                      {EMAIL_TEMPLATES.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Email Addresses */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                    📧 Email Addresses
                  </label>
                  <textarea
                    value={emails}
                    onChange={(e) => setEmails(e.target.value)}
                    placeholder="Enter email addresses (one per line):&#10;user1@example.com&#10;user2@example.com"
                    className="w-full h-32 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                  />
                  <p className="text-xs text-slate-400 mt-2">
                    Separate multiple emails with line breaks
                  </p>
                </div>

                {/* Subject */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                    📝 Email Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter email subject..."
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Body */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                    ✍️ Email Body
                  </label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Enter email message/body content..."
                    className="w-full h-48 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                  />
                </div>

                {/* Options */}
                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={verifyOnly}
                      onChange={(e) => setVerifyOnly(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-slate-300">
                      Verify emails only (don't send)
                    </span>
                  </label>
                </div>

                {/* Send Button */}
                <button
                  onClick={handleSend}
                  disabled={isLoading || !emails.trim() || !subject.trim() || !body.trim()}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span>📤</span>
                  {isLoading ? 'Processing...' : verifyOnly ? 'Verify Emails' : 'Send Bulk Email'}
                </button>
              </div>
            </div>

            {/* Right Panel - Info */}
            <div className="space-y-6">
              {/* How It Works */}
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span>👥</span> How It Works
                </h3>
                <ol className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-bold">1.</span>
                    <span>Choose between a template or custom email</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-bold">2.</span>
                    <span>Customize subject and body if needed</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-bold">3.</span>
                    <span>Add recipient emails (one per line)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-bold">4.</span>
                    <span>Send to all recipients at once</span>
                  </li>
                </ol>
              </div>

              {/* Available Placeholders */}
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span>📌</span> Available Placeholders
                </h3>
                <div className="space-y-2">
                  {PLACEHOLDERS.map((placeholder) => (
                    <button
                      key={placeholder.key}
                      onClick={() => insertPlaceholder(placeholder.key)}
                      className="w-full text-left px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors group"
                    >
                      <div className="font-mono text-sm text-green-400 mb-1">
                        {placeholder.key}
                      </div>
                      <div className="text-xs text-slate-400">
                        {placeholder.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Important Note */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h3 className="text-yellow-400 font-bold mb-2">Important</h3>
                    <p className="text-yellow-200/80 text-sm">
                      Bulk emails are sent with rate limiting (500ms delay between emails) to avoid spam filters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
