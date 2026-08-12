import {
  Component,
  HostBinding,
  HostListener,
  signal,
  computed,
  OnInit,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { isPlatformBrowser } from '@angular/common';
interface NavItem {
  label: string;
  icon: string; // key into the ICONS map used in the template
  route: string;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})

export class AppShellComponent implements OnInit {
  private host = inject(ElementRef<HTMLElement>);
  private router = inject(Router);

  /** Whether the sidebar is collapsed to icon-only rail mode */
  sidebarCollapsed = signal(false);
  /** Mobile off-canvas open state (separate from desktop collapse) */
  mobileSidebarOpen = signal(false);
  /** Dark / light theme */
  darkMode = signal(false);
  /** Native fullscreen state */
  isFullscreen = signal(false);
  /** User menu dropdown */
  userMenuOpen = signal(false);

  sidebarWidth = computed(() => (this.sidebarCollapsed() ? '76px' : '264px'));

  currentUser = {
    name: 'Adrienne Calloway',
    role: 'Product Operations Lead',
    email: 'adrienne.calloway@company.com',
    initials: 'AC',
  };

  navSections: NavSection[] = [
    {
      title: 'Workspace',
      items: [
        { label: 'Dashboard', icon: 'grid', route: '/dashboard' },
        { label: 'Employees', icon: 'bar-chart', route: '/employees' },
        { label: 'Projects', icon: 'folder', route: '/projects', badge: '12' },
      ],
    },
    {
      title: 'Collaborate',
      items: [
        { label: 'Team', icon: 'users', route: '/team' },
        { label: 'Messages', icon: 'message', route: '/messages', badge: '3' },
        { label: 'Reports', icon: 'file', route: '/reports' },
      ],
    },
    {
      title: 'System',
      items: [{ label: 'Settings', icon: 'settings', route: '/settings' }],
    },
  ];

  activeRoute = signal('/dashboard');

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('app-theme');
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.darkMode.set(savedTheme ? savedTheme === 'dark' : prefersDark);

    const savedCollapsed = localStorage.getItem('app-sidebar-collapsed');
    if (savedCollapsed) this.sidebarCollapsed.set(savedCollapsed === 'true');
  }

  @HostBinding('attr.data-theme')
  get themeAttr(): string {
    return this.darkMode() ? 'dark' : 'light';
  }

  @HostListener('document:fullscreenchange')
  onFullscreenChange(): void {
    this.isFullscreen.set(!!document.fullscreenElement);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.userMenuOpen.set(false);
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update((v) => !v);
    localStorage.setItem(
      'app-sidebar-collapsed',
      String(this.sidebarCollapsed())
    );
  }

  toggleMobileSidebar(): void {
    this.mobileSidebarOpen.update((v) => !v);
  }

  closeMobileSidebar(): void {
    this.mobileSidebarOpen.set(false);
  }

  toggleTheme(): void {
    this.darkMode.update((v) => !v);
    localStorage.setItem('app-theme', this.darkMode() ? 'dark' : 'light');
  }

  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  toggleUserMenu(): void {
    this.userMenuOpen.update((v) => !v);
  }

  setActive(route: string): void {
    this.activeRoute.set(route);
    this.router.navigateByUrl(route);
    this.closeMobileSidebar();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu') && this.userMenuOpen()) {
      this.userMenuOpen.set(false);
    }
  }
  
}

