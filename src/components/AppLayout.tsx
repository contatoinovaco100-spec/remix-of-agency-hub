import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Target,
  CheckSquare,
  UserCog,
  Calendar,
  ChevronLeft,
  LogOut,
  Shield,
  FileText,
  BarChart3,
  Video,
  Film,
  Camera,
  Clapperboard,
  Palette,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useModuleAccess, ROUTE_MODULE_MAP, type AppModule } from '@/hooks/useUserRole';
import logoInova from '@/assets/logo-inova.png';

type NavItem = { title: string; url: string; icon: any; module?: AppModule };

const allNavItems: NavItem[] = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'CRM', url: '/crm', icon: Target, module: 'comercial' },
  { title: 'Clientes', url: '/clientes', icon: Users, module: 'operacional' },
  { title: 'Tarefas', url: '/tarefas', icon: CheckSquare, module: 'operacional' },
  { title: 'Equipe', url: '/equipe', icon: UserCog, module: 'operacional' },
  { title: 'Calendário', url: '/calendario', icon: Calendar, module: 'operacional' },
  { title: 'Reuniões', url: '/reunioes', icon: Video, module: 'operacional' },
  { title: 'Portfólio', url: '/portfolio', icon: Film, module: 'operacional' },
  { title: 'Equipamentos', url: '/equipamentos', icon: Camera, module: 'operacional' },
  { title: 'Gravações', url: '/gravacoes', icon: Clapperboard, module: 'operacional' },
  { title: 'Whiteboard', url: '/whiteboard', icon: Palette },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { signOut, user } = useAuth();
  const { hasModule, isAdmin } = useModuleAccess();

  const navItems = [
    ...allNavItems.filter(item => !item.module || hasModule(item.module)),
    ...(isAdmin ? [
      { title: 'Contratos', url: '/contratos', icon: FileText },
      { title: 'Relatórios', url: '/relatorios', icon: BarChart3 },
      { title: 'Permissões', url: '/permissoes', icon: Shield },
    ] : []),
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-sidebar transition-default',
          collapsed ? 'w-16' : 'w-60'
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <img src={logoInova} alt="INOVA Co." className={cn('transition-default', collapsed ? 'h-8 w-8 object-contain' : 'h-8')} />
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.url || (item.url !== '/' && location.pathname.startsWith(item.url));
            return (
              <NavLink
                key={item.url}
                to={item.url}
                end={item.url === '/'}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-body transition-default',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
                activeClassName=""
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* User & Logout */}
        <div className="border-t border-border">
          {!collapsed && user && (
            <div className="px-4 py-2 text-xs text-muted-foreground truncate">
              {user.email}
            </div>
          )}
          <div className="flex">
            <button
              onClick={signOut}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground transition-default hover:text-destructive',
                collapsed ? 'w-full justify-center' : 'flex-1'
              )}
              title="Sair"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {!collapsed && <span>Sair</span>}
            </button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex h-10 items-center justify-center px-3 text-muted-foreground transition-default hover:text-foreground"
            >
              <ChevronLeft className={cn('h-4 w-4 transition-default', collapsed && 'rotate-180')} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className={cn('flex-1 transition-default overflow-x-hidden', collapsed ? 'ml-16' : 'ml-60')}>
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
