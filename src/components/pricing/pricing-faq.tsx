import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PRICING_FAQ } from '@/lib/data/company-data';

export function PricingFAQ() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {PRICING_FAQ.map((faq, index) => (
        <Card key={index} className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">{faq.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 