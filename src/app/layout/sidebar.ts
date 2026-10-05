import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LogOut, Plus, ChevronsLeft, ChevronsRight } from 'lucide-angular';
import { NavLinksService } from '../core/nav-links.service';
import { AuthService } from '../core/auth.service';

const COLLAPSE_KEY = 'ims-sidebar-collapsed';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.html',
})
export class SidebarComponent {
  protected readonly auth = inject(AuthService);
  private readonly navLinksService = inject(NavLinksService);
  readonly links = this.navLinksService.links;

  readonly collapsed = signal(this.readInitialCollapsed());

  protected readonly Plus = Plus;
  protected readonly LogOut = LogOut;
  protected readonly ChevronsLeft = ChevronsLeft;
  protected readonly ChevronsRight = ChevronsRight;

  toggleCollapsed(): void {
    const collapseResult = !this.collapsed();
    this.collapsed.set(collapseResult);
    localStorage.setItem(COLLAPSE_KEY, String(collapseResult));
  }

  private readInitialCollapsed(): boolean {
    return localStorage.getItem(COLLAPSE_KEY) === 'true';
  }
}