import { Component, input } from '@angular/core';
import { LucideAngularModule, Construction } from 'lucide-angular';
import { PageHeaderComponent } from '../../ui/page-header';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [LucideAngularModule, PageHeaderComponent],
  template: `
    <app-page-header [title]="title()" [subtitle]="subtitle()" />

    <div
      class="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-ink-200 bg-white py-20 text-center dark:border-white/10 dark:bg-ink-900"
    >
      <div
        class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
      >
        <lucide-angular [img]="Construction" [size]="22" />
      </div>
      <p class="font-display text-base font-semibold text-ink-900 dark:text-ink-100">
        Bu bölmə hələ hazır deyil
      </p>
      <p class="max-w-sm text-sm text-ink-500 dark:text-ink-400">
        Bu, dizaynı və naviqasiyanı göstərmək üçün bir yerdir.
      </p>
    </div>
  `,
})
export class ComingSoonComponent {
  readonly title = input('Tezliklə');
  readonly subtitle = input('');

  protected readonly Construction = Construction;
}