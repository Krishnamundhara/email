import React from 'react';
import { motion } from 'framer-motion';
import { StatCard, Badge } from './UI';
import { Button } from './Button';
import { Card, CardHeader, CardContent } from './Card';

interface DeliveryReport {
  totalEmails: number;
  sentEmails: number;
  failedEmails: number;
  verifiedEmails: number;
  completedAt: string;
  campaignName: string;
}

interface ReportPageProps {
  report: DeliveryReport;
  details: Array<{
    email: string;
    status: 'sent' | 'failed';
    error?: string;
  }>;
  onDownload: (format: 'csv' | 'json') => void;
  onNewCampaign: () => void;
}

export const ReportPage = ({
  report,
  details,
  onDownload,
  onNewCampaign,
}: ReportPageProps) => {
  const successRate =
    report.totalEmails > 0
      ? Math.round((report.sentEmails / report.totalEmails) * 100)
      : 0;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={item} className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          🎉 Campaign Completed!
        </h1>
        <p className="text-lg text-slate-600">{report.campaignName}</p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={item}>
          <StatCard
            label="Total Recipients"
            value={report.totalEmails}
            icon="📧"
            color="blue"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            label="Successfully Sent"
            value={report.sentEmails}
            icon="✅"
            color="green"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            label="Failed"
            value={report.failedEmails}
            icon="❌"
            color="red"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            label="Success Rate"
            value={`${successRate}%`}
            icon="📊"
            color="amber"
          />
        </motion.div>
      </motion.div>

      {/* Details Card */}
      <motion.div variants={item}>
        <Card>
          <CardHeader
            title="Delivery Details"
            subtitle="Complete email delivery report"
            icon="📋"
          />
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">
                      Email
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-900">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((detail, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-slate-800">{detail.email}</td>
                      <td className="py-3 px-4 text-center">
                        {detail.status === 'sent' ? (
                          <Badge label="Sent" type="success" />
                        ) : (
                          <Badge label="Failed" type="error" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-sm">
                        {detail.error || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Actions */}
      <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="secondary"
          onClick={() => onDownload('csv')}
          fullWidth
        >
          📥 Download CSV
        </Button>
        <Button
          variant="secondary"
          onClick={() => onDownload('json')}
          fullWidth
        >
          📥 Download JSON
        </Button>
        <Button
          variant="primary"
          onClick={onNewCampaign}
          fullWidth
        >
          🚀 New Campaign
        </Button>
      </motion.div>
    </motion.div>
  );
};
