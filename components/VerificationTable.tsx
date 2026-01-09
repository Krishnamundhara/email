import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './UI';

interface VerificationResult {
  email: string;
  isValid: boolean;
  error?: string;
}

interface VerificationTableProps {
  results: VerificationResult[];
  isLoading?: boolean;
}

export const VerificationTable = ({ results, isLoading }: VerificationTableProps) => {
  const validCount = results.filter(r => r.isValid).length;
  const invalidCount = results.length - validCount;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Verification Results</h3>
        <div className="flex gap-2">
          <Badge label={`Valid: ${validCount}`} type="success" />
          <Badge label={`Invalid: ${invalidCount}`} type="error" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left py-3 px-4 font-semibold text-slate-900">Email</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-900">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">Error</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 && (
              <motion.div variants={container} initial="hidden" animate="show">
                {results.map((result, idx) => (
                  <motion.tr
                    key={idx}
                    variants={item}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                  <td className="py-3 px-4 text-slate-800">{result.email}</td>
                  <td className="py-3 px-4 text-center">
                    {result.isValid ? (
                      <Badge label="Valid" type="success" />
                    ) : (
                      <Badge label="Invalid" type="error" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-600 text-sm">
                    {result.error || '-'}
                  </td>
                </motion.tr>
                ))}
              </motion.div>
            )}
          </tbody>
        </table>
      </div>

      {results.length === 0 && !isLoading && (
        <div className="text-center py-8 text-slate-500">
          <p>No results yet. Upload or paste emails to get started.</p>
        </div>
      )}
    </motion.div>
  );
};
