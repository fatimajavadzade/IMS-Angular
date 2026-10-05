import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="font-display text-2xl font-bold text-ink-900 dark:text-ink-100">
          {{ title() }}
        </h1>

        @if (subtitle()) {
          <p class="text-sm text-ink-500 dark:text-ink-400">{{ subtitle() }}</p>
        }
      </div>

      <ng-content select="[actions]" />
    </div>
  `,
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
}