import { Component, OnInit, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, AlertTriangle } from 'lucide-angular';
import { PageHeaderComponent } from '../../../ui/page-header';
import { InputComponent } from '../../../ui/input';
import { CustomerService } from '../customer.service';
import { customerSchema } from '../customer.schema';
import { toFieldErrors } from '../../../core/zod-errors';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, PageHeaderComponent, InputComponent],
  templateUrl: './customer-edit.html',
  providers: [CustomerService],
})
export class CustomerEditComponent implements OnInit {
  readonly id = input.required<string>();

  private readonly customerService = inject(CustomerService);
  private readonly router = inject(Router);

  readonly companyName = signal('');
  readonly voen = signal('');
  readonly contactPerson = signal('');
  readonly phone = signal('');
  readonly email = signal('');
  readonly address = signal('');

  readonly loading = signal(true);
  readonly fieldErrors = signal<Record<string, string>>({});
  readonly serverError = signal('');
  readonly submitting = signal(false);

  protected readonly AlertTriangle = AlertTriangle;

  ngOnInit(): void {
    this.customerService.getById(Number(this.id())).subscribe({
      next: (customer) => {
        this.companyName.set(customer.companyName);
        this.voen.set(customer.voen ?? '');
        this.contactPerson.set(customer.contactPerson);
        this.phone.set(customer.phone);
        this.email.set(customer.email);
        this.address.set(customer.address ?? '');
        this.loading.set(false);
      },
      error: () => {
        this.serverError.set('Müştəri tapılmadı və ya yüklənə bilmədi.');
        this.loading.set(false);
      },
    });
  }

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

    this.customerService.update(Number(this.id()), result.data).subscribe({
      next: () => this.router.navigateByUrl('/customers'),
      error: (err) => {
        this.submitting.set(false);
        this.serverError.set(err.error?.message ?? 'Müştəri yenilənərkən xəta baş verdi.');
      },
    });
  }
}