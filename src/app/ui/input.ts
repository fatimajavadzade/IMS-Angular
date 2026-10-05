import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  template: `
    <input
      [type]="type()"
      [placeholder]="placeholder()"
      [value]="value()"
      (input)="value.set($any($event.target).value)"
      [class]="
        'w-full rounded-lg border px-3 py-2 text-sm outline-none transition placeholder:text-ink-300 focus:border-brand-500 dark:bg-white/5 dark:text-ink-100 dark:placeholder:text-ink-500 dark:focus:bg-ink-900 ' +
        (error() ? 'border-bad-700 dark:border-bad-500' : 'border-ink-100 dark:border-white/10') +
        ' ' +
        className()
      "
    />
  `,
})
export class InputComponent {
  readonly type = input('text');
  readonly formControlName = input('');
  readonly placeholder = input('');
  readonly error = input(false);
  readonly className = input('');

  readonly value = model('');
}