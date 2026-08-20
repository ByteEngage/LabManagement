import {
  Component,
  HostBinding,
  HostListener,
  signal,
  computed,
  OnInit,
  ElementRef,
  inject,
  PLATFORM_ID,
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';

import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
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
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppShellComponent implements OnInit {

  private host = inject(ElementRef<HTMLElement>);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  sidebarCollapsed = signal(false);

  mobileSidebarOpen = signal(false);

  darkMode = signal(false);

  isFullscreen = signal(false);

  userMenuOpen = signal(false);

  sidebarWidth = computed(() =>
    this.sidebarCollapsed() ? '76px' : '264px'
  );

  currentUser = {
    name: 'Harshit Pandey',
    role: 'Product Operations Lead',
    email: 'harshit.pandey@company.com',
    initials: 'HP',
  };

  navSections: NavSection[] = [
    {
      title: 'Workspace',
      items: [
        {
          label: 'Dashboard',
          icon: 'grid',
          route: '/dashboard'
        },
        {
          label: 'Employee',
          icon: 'bar-chart',
          route: '/employees',
          badge: '10'
        },
        {
          label: 'Departments',
          icon: 'folder',
          route: '/departments',
          badge: '4'
        },
      ],
    },

    {
      title: 'Collaborate',
      items: [
        {
          label: 'Team',
          icon: 'users',
          route: '/team'
        },
        {
          label: 'Messages',
          icon: 'message',
          route: '/messages',
          badge: '3'
        },
        {
          label: 'Reports',
          icon: 'file',
          route: '/report'
        },
      ],
    },

    {
      title: 'System',
      items: [
        {
          label: 'Settings',
          icon: 'settings',
          route: '/settings'
        }
      ],
    },
  ];

  ngOnInit(): void {

    // Browser-only code
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const savedTheme =
      localStorage.getItem('app-theme');

    const prefersDark =
      window.matchMedia &&
      window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

    this.darkMode.set(
      savedTheme
        ? savedTheme === 'dark'
        : prefersDark
    );


    const savedCollapsed =
      localStorage.getItem(
        'app-sidebar-collapsed'
      );

    if (savedCollapsed !== null) {

      this.sidebarCollapsed.set(
        savedCollapsed === 'true'
      );

    }

  }


  @HostBinding('attr.data-theme')
  get themeAttr(): string {

    return this.darkMode()
      ? 'dark'
      : 'light';

  }


  @HostListener('document:fullscreenchange')
  onFullscreenChange(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.isFullscreen.set(
      !!document.fullscreenElement
    );

  }


  @HostListener('document:keydown.escape')
  onEscape(): void {

    this.userMenuOpen.set(false);

    this.closeMobileSidebar();

  }


  toggleSidebar(): void {

    this.sidebarCollapsed.update(
      value => !value
    );

    if (isPlatformBrowser(this.platformId)) {

      localStorage.setItem(
        'app-sidebar-collapsed',
        String(this.sidebarCollapsed())
      );

    }

  }


  toggleMobileSidebar(): void {

    this.mobileSidebarOpen.update(
      value => !value
    );

  }


  closeMobileSidebar(): void {

    this.mobileSidebarOpen.set(false);

  }


  toggleTheme(): void {

    this.darkMode.update(
      value => !value
    );

    if (isPlatformBrowser(this.platformId)) {

      localStorage.setItem(
        'app-theme',
        this.darkMode()
          ? 'dark'
          : 'light'
      );

    }

  }


  toggleFullscreen(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!document.fullscreenElement) {

      document.documentElement
        .requestFullscreen?.();

    } else {

      document.exitFullscreen?.();

    }

  }


  toggleUserMenu(): void {

    this.userMenuOpen.update(
      value => !value
    );

  }


  onNavClick(): void {

    this.closeMobileSidebar();

  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {

    const target =
      event.target as HTMLElement;

    if (
      !target.closest('.user-menu') &&
      this.userMenuOpen()
    ) {

      this.userMenuOpen.set(false);

    }

  }

}