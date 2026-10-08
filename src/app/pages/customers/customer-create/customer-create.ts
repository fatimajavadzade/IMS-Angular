import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, Info } from 'lucide-angular';
import { PageHeaderComponent } from '../../../ui/page-header';
import { InputComponent } from '../../../ui/input';
import { CustomerService } from '../customer.service';
import { customerSchema } from '../customer.schema';
import { toFieldErrors } from '../../../core/zod-errors';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-customer-create',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, PageHeaderComponent, InputComponent],
  templateUrl: './customer-create.html',
  providers: [CustomerService],
})
export class CustomerCreateComponent {
  private readonly customerService = inject(CustomerService);
  private readonly router = inject(Router);
  private readonly toast = inject(HotToastService);

  readonly companyName = signal('');
  readonly voen = signal('');
  readonly contactPerson = signal('');
  readonly phone = signal('');
  readonly email = signal('');
  readonly address = signal('');

  readonly fieldErrors = signal<Record<string, string>>({});
  readonly serverError = signal('');
  readonly submitting = signal(false);

  protected readonly Info = Info;

  submit(): void {
    this.serverError.set('');

    const result = customerSchema.safeParse({
      companyName: this.companyName(),
      voen: this.voen(),
      contactPerson: this.contactPerson(),
      phone: this.phone(),
      email: this.email(),
      address: this.address(),
    });

    if (!result.success) {
      this.fieldErrors.set(toFieldErrors(result.error));
      return;
    }

    this.fieldErrors.set({});
    this.submitting.set(true);

    this.customerService.create(result.data).subscribe({
      next: () => {
        this.toast.success('Müştəri uğurla yaradıldı!');
        this.router.navigateByUrl('/customers');
      },

      error: (err) => {
        this.submitting.set(false);

        this.toast.error('Müştəri yaradılarkən xəta baş verdi.');

        this.serverError.set(err.error?.message ?? 'Müştəri yaradılarkən xəta baş verdi.');
      },
    });
  }

  //! zDateToIsoString = z.date().transform((v) => v.toISOString());
}