"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FacebookIcon, 
  TwitterIcon, 
  InstagramIcon, 
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  HomeIcon
} from '@/components/ui/icons';

export function Footer() {
  const t = useTranslations('Footer');

  const serviceLinks = [
    { href: '/services/web-development', label: t('webDevelopment') },
    { href: '/services/maintenance', label: t('maintenance') },
    { href: '/services/seo', label: t('seo') },
    { href: '/services/hosting', label: t('hosting') },
  ];

  const companyLinks = [
    { href: '/about', label: t('about') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/blog', label: t('blog') },
    { href: '/careers', label: t('careers') },
  ];

  const legalLinks = [
    { href: '/privacy', label: t('privacy') },
    { href: '/terms', label: t('terms') },
    { href: '/cookies', label: t('cookies') },
    { href: '/legal', label: t('legal') },
  ];

  const socialLinks = [
    { href: 'https://facebook.com', icon: FacebookIcon, label: 'Facebook' },
    { href: 'https://twitter.com', icon: TwitterIcon, label: 'Twitter' },
    { href: 'https://instagram.com', icon: InstagramIcon, label: 'Instagram' },
    { href: 'https://linkedin.com', icon: LinkedInIcon, label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Services Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('company')}</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('legal')}</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MailIcon size={16} />
                <span>info@Plalz.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <PhoneIcon size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <HomeIcon size={16} className="mt-0.5" />
                <span>123 Business St.<br />Suite 100<br />City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-semibold text-lg mb-2">{t('newsletter.title')}</h3>
            <p className="text-muted-foreground mb-4">{t('newsletter.description')}</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1"
              />
              <Button type="submit">
                {t('newsletter.subscribe')}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Copyright */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl text-foreground">Plalz</span>
            </Link>
            <span className="text-muted-foreground text-sm">
              © 2024 Plalz. {t('copyright')}
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <IconComponent size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
} 