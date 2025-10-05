'use client';
import { Toaster as Sonner, ToasterProps } from 'sonner';
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--toast-bg)',
          '--normal-text': 'var(--toast-text)',
          '--normal-border': 'transparent',
          '--normal-font-size': '16px',
          '--normal-font-weight': '500',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};
export { Toaster };
