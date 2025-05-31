"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO } from '@/lib/data/company-data';
import { MessageSquareIcon } from '@/components/ui/icons';

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show button after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show tooltip briefly after button appears
      setTimeout(() => {
        setShowTooltip(true);
        // Hide tooltip after 3 seconds
        setTimeout(() => setShowTooltip(false), 3000);
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "¡Hola! Me interesa conocer más sobre sus servicios de desarrollo web. ¿Podrían ayudarme?"
    );
    const whatsappUrl = `https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 animate-in slide-in-from-bottom-2 fade-in duration-300">
          <div className="bg-background border rounded-lg shadow-lg p-3 max-w-xs">
            <p className="text-sm font-medium">¿Necesitas ayuda?</p>
            <p className="text-xs text-muted-foreground">
              Chatea con nosotros por WhatsApp
            </p>
            {/* Arrow */}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-border"></div>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <Button
        onClick={handleWhatsAppClick}
        size="lg"
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-in zoom-in-50 fade-in"
        aria-label="Contactar por WhatsApp"
      >
        <MessageSquareIcon className="h-6 w-6" />
      </Button>

      {/* Pulse Animation */}
      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
    </div>
  );
} 