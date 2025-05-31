"use client";

import { Button } from '@/components/ui/button';
import { PrinterIcon } from '@/components/ui/icons';

interface PrintButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function PrintButton({ className, children }: PrintButtonProps) {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePrint}
      className={className}
    >
      <PrinterIcon className="h-4 w-4 mr-2" />
      {children || 'Imprimir'}
    </Button>
  );
} 