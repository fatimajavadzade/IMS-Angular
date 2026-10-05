import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Home, SearchX } from 'lucide-angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-ink-100 px-4 dark:bg-ink-950">
      <div
        class="w-full max-w-xl rounded-2xl border border-ink-200 bg-white p-8 text-center shadow-xl dark:border-white/10 dark:bg-ink-900"
      >
        <div class="mb-6 flex justify-center">
          <div
            class="flex h-16 w-16 items-center justify-center rounded-full bg-bad-100 text-bad-700 dark:bg-bad-900/30 dark:text-bad-400"
          >
            <lucide-angular [img]="SearchX" [size]="30" />
          </div>
        </div>

        <h1 class="font-display text-4xl font-bold text-ink-900 dark:text-ink-100">
          Səhifə tapılmadı
        </h1>

        <p class="mt-4 text-base text-ink-500 dark:text-ink-400">
          Axtardığınız səhifə mövcud deyil və ya ünvan dəyişdirilib.
        </p>

        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            (click)="goBack()"
            class="flex w-full items-center justify-center gap-2 rounded-lg border border-ink-100 px-4 py-2.5 text-sm font-semibold text-ink-700 transition hover:bg-ink-100/60 dark:border-white/10 dark:text-ink-300 dark:hover:bg-white/5 sm:w-auto"
          >
            <lucide-angular [img]="ArrowLeft" [size]="16" />
            Geri dön
          </a>

          <a
            routerLink="/dashboard"
            class="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-500 sm:w-auto"
          >
            <lucide-angular [img]="Home" [size]="16" />
            Ana səhifə
          </a>
        </div>
      </div>
    </div>
  `,
})
export class NotFoundComponent {
  // Browser history-də əvvəl harada idiksə ora qayıtmaq üçün Location istifadə edəcəyik.
  private readonly location = inject(Location);

  protected readonly ArrowLeft = ArrowLeft;
  protected readonly Home = Home;
  protected readonly SearchX = SearchX;

  goBack(): void {
    this.location.back();
  }
}