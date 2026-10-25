import React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'navy' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
  dot = false,
}) => {
  const styles: Record<BadgeVariant, { bg: string; text: string; dotColor: string }> = {
    success: {
      bg: 'bg-teal-50 border-teal-200/80',
      text: 'text-teal-700',
      dotColor: 'bg-teal-500',
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200/80',
      text: 'text-amber-800',
      dotColor: 'bg-amber-500',
    },
    danger: {
      bg: 'bg-rose-50 border-rose-200/80',
      text: 'text-rose-700',
      dotColor: 'bg-rose-500',
    },
    info: {
      bg: 'bg-sky-50 border-sky-200/80',
      text: 'text-sky-700',
      dotColor: 'bg-sky-500',
    },
    navy: {
      bg: 'bg-navy-50 border-navy-200/80',
      text: 'text-navy-900',
      dotColor: 'bg-navy-600',
    },
    neutral: {
      bg: 'bg-slate-100 border-slate-200',
      text: 'text-slate-700',
      dotColor: 'bg-slate-400',
    },
  };

  const current = styles[variant] || styles.neutral;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${current.bg} ${current.text} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${current.dotColor}`} />}
      {children}
    </span>
  );
};
