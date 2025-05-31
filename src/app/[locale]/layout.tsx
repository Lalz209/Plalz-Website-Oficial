import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { LocaleProvider } from '@/components/i18n/locale-provider';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { locales, type Locale } from '@/lib/navigation';
import { getLocaleMetadata } from '@/lib/i18n/config';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo' });
  const localeData = getLocaleMetadata(locale as Locale);
  
  const title = t('default_title');
  const description = t('default_description');
  const keywords = t('keywords');
  
  return {
    title,
    description,
    keywords: keywords.split(', '),
    authors: [{ name: 'Plalz Team' }],
    creator: 'Plalz',
    publisher: 'Plalz',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://plalz.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'es': '/es',
        'en': '/en',
        'x-default': '/es', // Default locale
      },
    },
    openGraph: {
      title,
      description,
      url: `https://plalz.com/${locale}`,
      siteName: 'Plalz',
      images: [
        {
          url: `/og-image-${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/twitter-image-${locale}.jpg`],
      creator: '@plalz',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
    other: {
      'google-site-verification': 'your-google-verification-code',
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'seo' });
  const localeData = getLocaleMetadata(locale as Locale);

  // Generate hreflang links
  const hreflangLinks: Array<{
    rel: 'alternate';
    hrefLang: string;
    href: string;
  }> = locales.map(loc => ({
    rel: 'alternate' as const,
    hrefLang: loc,
    href: `https://plalz.com/${loc}`
  }));

  // Add x-default
  hreflangLinks.push({
    rel: 'alternate' as const,
    hrefLang: 'x-default',
    href: 'https://plalz.com/es'
  });

  return (
    <html lang={locale} dir={localeData.direction}>
      <head>
        {/* Hreflang links */}
        {hreflangLinks.map(link => (
          <link
            key={link.hrefLang}
            rel={link.rel}
            hrefLang={link.hrefLang}
            href={link.href}
          />
        ))}
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Plalz",
              "url": "https://plalz.com",
              "logo": "https://plalz.com/logo.png",
              "description": t('default_description'),
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Calle Gran Vía 123",
                "addressLocality": "Madrid",
                "addressRegion": "Madrid",
                "postalCode": "28013",
                "addressCountry": "ES"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+34 91 123 45 67",
                "contactType": "customer service",
                "email": "info@plalz.com",
                "availableLanguage": ["Spanish", "English"]
              },
              "sameAs": [
                "https://facebook.com/plalz",
                "https://twitter.com/plalz",
                "https://linkedin.com/company/plalz",
                "https://instagram.com/plalz"
              ],
              "offers": {
                "@type": "Offer",
                "description": locale === 'es' ? "Desarrollo web desde €299" : "Web development from €299",
                "price": "299",
                "priceCurrency": localeData.currency
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "127"
              },
              "foundingDate": "2020",
              "numberOfEmployees": "10-50",
              "areaServed": {
                "@type": "Country",
                "name": locale === 'es' ? "España" : "Spain"
              }
            })
          }}
        />

        {/* WebSite schema for search box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Plalz",
              "url": "https://plalz.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `https://plalz.com/${locale}/buscar?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <LocaleProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 