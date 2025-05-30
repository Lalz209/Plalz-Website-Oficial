import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

const locales = ['en', 'es'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isSpanish = params.locale === 'es';
  
  return {
    title: isSpanish 
      ? 'Plalz - Desarrollo Web Profesional | Sitios Web Modernos y Rápidos'
      : 'Plalz - Professional Web Development | Modern & Fast Websites',
    description: isSpanish
      ? 'Desarrollo web profesional con diseño moderno, velocidad optimizada y soporte 24/7. Desde $299 tu presencia digital estará lista en 7 días. ¡Consulta gratuita!'
      : 'Professional web development with modern design, optimized speed and 24/7 support. From $299 your digital presence will be ready in 7 days. Free consultation!',
    keywords: isSpanish
      ? 'desarrollo web, diseño web, sitios web, páginas web, e-commerce, SEO, hosting, mantenimiento web, desarrollo frontend, desarrollo backend'
      : 'web development, web design, websites, web pages, e-commerce, SEO, hosting, web maintenance, frontend development, backend development',
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
      canonical: '/',
      languages: {
        'es': '/es',
        'en': '/en',
      },
    },
    openGraph: {
      title: isSpanish 
        ? 'Plalz - Desarrollo Web Profesional | Sitios Web Modernos y Rápidos'
        : 'Plalz - Professional Web Development | Modern & Fast Websites',
      description: isSpanish
        ? 'Desarrollo web profesional con diseño moderno, velocidad optimizada y soporte 24/7. Desde $299 tu presencia digital estará lista en 7 días.'
        : 'Professional web development with modern design, optimized speed and 24/7 support. From $299 your digital presence will be ready in 7 days.',
      url: 'https://plalz.com',
      siteName: 'Plalz',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: isSpanish ? 'Plalz - Desarrollo Web Profesional' : 'Plalz - Professional Web Development',
        },
      ],
      locale: params.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: isSpanish 
        ? 'Plalz - Desarrollo Web Profesional'
        : 'Plalz - Professional Web Development',
      description: isSpanish
        ? 'Desarrollo web profesional desde $299. Consulta gratuita disponible.'
        : 'Professional web development from $299. Free consultation available.',
      images: ['/twitter-image.jpg'],
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
  if (!locale || !locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
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
              "description": locale === 'es' 
                ? "Desarrollo web profesional con diseño moderno, velocidad optimizada y soporte 24/7."
                : "Professional web development with modern design, optimized speed and 24/7 support.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Business St.",
                "addressLocality": "City",
                "addressRegion": "State",
                "postalCode": "12345",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-123-4567",
                "contactType": "customer service",
                "email": "info@plalz.com",
                "availableLanguage": ["English", "Spanish"]
              },
              "sameAs": [
                "https://facebook.com/plalz",
                "https://twitter.com/plalz",
                "https://linkedin.com/company/plalz",
                "https://instagram.com/plalz"
              ],
              "offers": {
                "@type": "Offer",
                "description": locale === 'es' ? "Desarrollo web desde $299" : "Web development from $299",
                "price": "299",
                "priceCurrency": "USD"
              }
            })
          }}
        />
        
        {/* Additional meta tags for better SEO */}
        <meta name="theme-color" content="#12355B" />
        <meta name="msapplication-TileColor" content="#12355B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Plalz" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 