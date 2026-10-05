import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, LogOut, Moon, Sun } from 'lucide-angular';
import { ThemeService } from '../core/theme.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './navbar.html',
})

//! pulic - her yer, protected -> class ve onun template-i, private -> yalniz class
export class NavbarComponent {
  readonly theme = inject(ThemeService);
  protected readonly auth = inject(AuthService);

  readonly user = this.auth.currentUser;

  protected readonly Sun = Sun;
  protected readonly Moon = Moon;
  protected readonly LogOut = LogOut;
}