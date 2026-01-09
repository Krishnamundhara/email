import React from 'react';
import { motion } from 'framer-motion';
import { ProgressBar, StatCard, Badge } from './UI';
import { Button } from './Button';

interface SendingProgressProps {
  totalEmails: number;
  sentEmails: number;
  failedEmails: number;
  status: 'idle' | 'sending' | 'completed' | 'stopped';
  onStop: () => void;
}

export const SendingProgress = ({
  totalEmails,
  sentEmails,
  failedEmails,
  status,
  onStop,
}: SendingProgressProps) => {
  const processingEmails = totalEmails - sentEmails - failedEmails;
  const percentageSent = ((sentEmails + failedEmails) / totalEmails) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Sending Campaign</h2>
        <p className="text-slate-600">
          {status === 'sending' && 'Emails are being sent...'}
          {status === 'completed' && 'Campaign completed!'}
          {status === 'stopped' && 'Campaign stopped.'}
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar current={sentEmails + failedEmails} total={totalEmails} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Sent Successfully"
          value={sentEmails}
          icon="✉️"
          color="green"
        />
        <StatCard
          label="Failed"
          value={failedEmails}
          icon="❌"
          color="red"
        />
        <StatCard
          label="Processing"
          value={processingEmails}
          icon="⏳"
          color="amber"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {status === 'sending' && (
          <Button
            variant="danger"
            onClick={onStop}
            fullWidth
          >
            🛑 STOP CAMPAIGN
          </Button>
        )}
        {(status === 'completed' || status === 'stopped') && (
          <Button
            variant="primary"
            fullWidth
            disabled
          >
            ✓ Done
          </Button>
        )}
      </div>

      {status === 'sending' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg"
        >
          <p className="text-sm text-primary-900">
            ℹ️ Campaign is running. Keep this window open for best results.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
