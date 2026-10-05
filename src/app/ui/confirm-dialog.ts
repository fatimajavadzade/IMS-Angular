import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    @if (open()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        (click)="cancel.emit()"
      >
        <div
          class="w-full max-w-sm rounded-xl2 bg-white p-6 shadow-xl dark:bg-ink-900 dark:ring-1 dark:ring-white/10"
          (click)="$event.stopPropagation()"
        >
          <h2 class="mb-2 text-lg font-semibold text-ink-900 dark:text-ink-100">{{ title() }}</h2>
          <p class="mb-6 text-sm text-ink-600 dark:text-ink-300">{{ message() }}</p>
          <div class="flex justify-end gap-3">
            <button
              type="button"
              (click)="cancel.emit()"
              class="rounded-lg px-4 py-2 text-sm font-medium text-ink-600 transition hover:bg-ink-100/60 dark:text-ink-300 dark:hover:bg-white/5"
            >
              {{ cancelLabel() }}
            </button>
            <button
              type="button"
              (click)="confirm.emit()"
              class="rounded-lg bg-bad-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-bad-800 dark:bg-bad-600 dark:hover:bg-bad-500"
            >
              {{ confirmLabel() }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ConfirmDialogComponent {
  readonly open = input(false);
  readonly title = input('Əminsiniz?');
  readonly message = input('');
  readonly confirmLabel = input('Sil');
  readonly cancelLabel = input('Ləğv et');

  readonly confirm = output<void>();
  readonly cancel = output<void>(); // child -> parent event gonderir
}