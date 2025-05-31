"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO } from '@/lib/data/company-data';
import { MapPinIcon, ExternalLinkIcon } from '@/components/ui/icons';

export function ContactMap() {
  const { address } = COMPANY_INFO.contact;
  const { coordinates } = address;
  
  // Generate Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <Card className="overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative">
          {/* Placeholder Map - In production, integrate with Google Maps or similar */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <MapPinIcon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Nuestra Oficina</h3>
                <address className="text-muted-foreground not-italic">
                  {address.street}<br />
                  {address.postalCode} {address.city}<br />
                  {address.country}
                </address>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" size="sm" asChild>
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    Ver en Google Maps
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLinkIcon className="h-4 w-4 mr-2" />
                    Cómo Llegar
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Overlay for future map integration */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
        </div>
      </Card>

      {/* Location Details */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <CardContent className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-primary" />
              Ubicación
            </h3>
            <div className="space-y-2 text-sm">
              <p><strong>Dirección:</strong> {address.street}</p>
              <p><strong>Ciudad:</strong> {address.city}</p>
              <p><strong>Código Postal:</strong> {address.postalCode}</p>
              <p><strong>País:</strong> {address.country}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent className="space-y-4">
            <h3 className="font-semibold text-lg">Transporte Público</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Metro:</strong> Línea 1, 2 y 3 - Estación Sol (5 min caminando)</p>
              <p><strong>Autobús:</strong> Líneas 3, 25, 39, 148</p>
              <p><strong>Cercanías:</strong> Estación Sol (3 min caminando)</p>
              <p><strong>Parking:</strong> Parking público a 100m</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Note */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          💡 <strong>Nota de desarrollo:</strong> En producción, aquí se integraría Google Maps, 
          Mapbox o similar para mostrar un mapa interactivo real.
        </p>
      </div>
    </div>
  );
} 