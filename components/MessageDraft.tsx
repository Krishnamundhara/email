import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

interface MessageDraftProps {
  onDraftChange: (subject: string, body: string) => void;
  isDirty: boolean;
}

export const MessageDraft = ({ onDraftChange, isDirty }: MessageDraftProps) => {
  const [subject, setSubject] = React.useState('');
  const [body, setBody] = React.useState('');

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
    onDraftChange(e.target.value, body);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    onDraftChange(subject, e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-6"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Draft Message</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Email Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={handleSubjectChange}
            placeholder="e.g., Verify Your Email Address"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Email Body
          </label>
          <textarea
            value={body}
            onChange={handleBodyChange}
            placeholder="Enter your email content here..."
            className="w-full h-40 px-4 py-2 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none"
          />
          <p className="text-xs text-slate-500 mt-2">
            💡 Tip: Use {'{'}EMAIL{'}'} to insert recipient email in the message
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <h4 className="text-sm font-medium text-slate-900 mb-3">Preview</h4>
          <div className="bg-white rounded p-3 border border-slate-300 text-sm text-slate-700 max-h-24 overflow-auto">
            <p className="font-semibold mb-2">{subject || '(No subject)'}</p>
            <p className="whitespace-pre-wrap">{body || '(No content)'}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface MessagePreviewProps {
  subject: string;
  body: string;
  recipientEmail?: string;
}

export const MessagePreview = ({
  subject,
  body,
  recipientEmail = 'recipient@example.com',
}: MessagePreviewProps) => {
  const processedBody = body.replace(/{EMAIL}/g, recipientEmail);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-slate-200"
    >
      <div className="bg-slate-100 rounded-t-lg p-4 border-b border-slate-200">
        <p className="text-xs text-slate-600">
          <span className="font-semibold">To:</span> {recipientEmail}
        </p>
        <p className="text-xs text-slate-600 mt-1">
          <span className="font-semibold">Subject:</span> {subject}
        </p>
      </div>

      <div className="bg-white rounded-b-lg p-6 text-slate-700 min-h-48">
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{
            __html: processedBody.replace(/\n/g, '<br />'),
          }}
        />
      </div>
    </motion.div>
  );
};
