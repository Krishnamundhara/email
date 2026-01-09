import React from 'react';

interface BadgeProps {
  label: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export const Badge = ({ label, type }: BadgeProps) => {
  const styles = {
    success: 'bg-success-50 text-success-700 border border-success-200',
    error: 'bg-error-50 text-error-700 border border-error-200',
    warning: 'bg-warning-50 text-warning-700 border border-warning-200',
    info: 'bg-primary-50 text-primary-700 border border-primary-200',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[type]}`}>
      {label}
    </span>
  );
};

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
}

export const ProgressBar = ({ current, total, showLabel = true }: ProgressBarProps) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-2 text-sm text-slate-600">
          <span>Progress</span>
          <span>{current} / {total}</span>
        </div>
      )}
      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: string;
  color?: 'blue' | 'green' | 'red' | 'amber';
}

export const StatCard = ({ label, value, icon, color = 'blue' }: StatCardProps) => {
  const colorClasses = {
    blue: 'bg-primary-50 text-primary-600',
    green: 'bg-success-50 text-success-600',
    red: 'bg-error-50 text-error-600',
    amber: 'bg-warning-50 text-warning-600',
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        </div>
        {icon && (
          <div className={`text-2xl rounded-lg p-2 ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
