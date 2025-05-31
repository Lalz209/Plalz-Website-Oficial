"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PRICING_FEATURES } from '@/lib/data/company-data';
import { CheckIcon, XIcon } from '@/components/ui/icons';

export function PricingComparison() {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckIcon className="h-5 w-5 text-green-600 mx-auto" />
      ) : (
        <XIcon className="h-5 w-5 text-red-500 mx-auto" />
      );
    }
    return (
      <Badge variant="outline" className="text-xs">
        {value}
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      {/* Mobile View - Accordion Style */}
      <div className="lg:hidden space-y-6">
        {PRICING_FEATURES.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader>
              <CardTitle className="text-lg">{category.category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="space-y-3">
                  <h4 className="font-medium">{feature.name}</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Starter</p>
                      {renderFeatureValue(feature.starter)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Professional</p>
                      {renderFeatureValue(feature.professional)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Enterprise</p>
                      {renderFeatureValue(feature.enterprise)}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop View - Table Style */}
      <div className="hidden lg:block">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Header */}
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-6 font-semibold">Características</th>
                    <th className="text-center p-6 font-semibold">
                      <div className="space-y-2">
                        <div>Starter</div>
                        <Badge variant="outline">€299/mes</Badge>
                      </div>
                    </th>
                    <th className="text-center p-6 font-semibold relative">
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          Professional
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            Popular
                          </Badge>
                        </div>
                        <Badge variant="outline">€599/mes</Badge>
                      </div>
                    </th>
                    <th className="text-center p-6 font-semibold">
                      <div className="space-y-2">
                        <div>Enterprise</div>
                        <Badge variant="outline">€1299/mes</Badge>
                      </div>
                    </th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {PRICING_FEATURES.map((category, categoryIndex) => (
                    <>
                      {/* Category Header */}
                      <tr key={`category-${categoryIndex}`} className="bg-muted/30">
                        <td colSpan={4} className="p-4 font-semibold text-primary">
                          {category.category}
                        </td>
                      </tr>
                      
                      {/* Features */}
                      {category.features.map((feature, featureIndex) => (
                        <tr 
                          key={`feature-${categoryIndex}-${featureIndex}`}
                          className="border-b hover:bg-muted/20 transition-colors"
                        >
                          <td className="p-4 font-medium">{feature.name}</td>
                          <td className="p-4 text-center">
                            {renderFeatureValue(feature.starter)}
                          </td>
                          <td className="p-4 text-center bg-primary/5">
                            {renderFeatureValue(feature.professional)}
                          </td>
                          <td className="p-4 text-center">
                            {renderFeatureValue(feature.enterprise)}
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CheckIcon className="h-4 w-4 text-green-600" />
          <span>Incluido</span>
        </div>
        <div className="flex items-center gap-2">
          <XIcon className="h-4 w-4 text-red-500" />
          <span>No incluido</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">Limitado</Badge>
          <span>Funcionalidad limitada</span>
        </div>
      </div>
    </div>
  );
} 