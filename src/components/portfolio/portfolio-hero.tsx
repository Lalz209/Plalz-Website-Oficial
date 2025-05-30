"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PORTFOLIO_STATS } from '@/lib/data/portfolio-data';
import { TrendingUpIcon, UsersIcon, CrownIcon, CalendarIcon, BuildingIcon, SettingsIcon } from '@/components/ui/icons';

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  label: string;
  description?: string;
}

function StatCard({ icon: Icon, value, label, description }: StatCardProps) {
  return (
    <Card className="text-center">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 rounded-full bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-sm font-medium text-muted-foreground">{label}</div>
          {description && (
            <div className="text-xs text-muted-foreground">{description}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function PortfolioHero() {
  return (
    <section className="py-16 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Content */}
          <div className="space-y-6">
            <Badge variant="outline" className="px-4 py-2">
              ✨ Nuestro Trabajo
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Portfolio de
              <span className="text-primary"> Proyectos</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Descubre cómo hemos ayudado a empresas de todos los tamaños a transformar 
              sus ideas en experiencias digitales exitosas que generan resultados reales.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            <StatCard
              icon={TrendingUpIcon}
              value={PORTFOLIO_STATS.totalProjects}
              label="Proyectos"
              description="Completados"
            />
            <StatCard
              icon={UsersIcon}
              value={PORTFOLIO_STATS.totalClients}
              label="Clientes"
              description="Satisfechos"
            />
            <StatCard
              icon={CrownIcon}
              value={PORTFOLIO_STATS.totalAwards}
              label="Premios"
              description="Ganados"
            />
            <StatCard
              icon={CalendarIcon}
              value={`${PORTFOLIO_STATS.yearsExperience}+`}
              label="Años"
              description="Experiencia"
            />
            <StatCard
              icon={BuildingIcon}
              value={PORTFOLIO_STATS.industriesServed}
              label="Industrias"
              description="Atendidas"
            />
            <StatCard
              icon={SettingsIcon}
              value={`${PORTFOLIO_STATS.technologiesUsed}+`}
              label="Tecnologías"
              description="Dominadas"
            />
          </div>

          {/* Call to Action */}
          <div className="pt-8">
            <p className="text-muted-foreground mb-4">
              ¿Listo para crear algo increíble juntos?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/cotizar"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Iniciar Proyecto
              </a>
              <a
                href="/contacto"
                className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Hablar con Experto
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 