import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Plus, Pencil, Trash2, Search } from 'lucide-angular';
import { HotToastService } from '@ngxpert/hot-toast';
import { PageHeaderComponent } from '../../../ui/page-header';
import { InputComponent } from '../../../ui/input';
import { ConfirmDialogComponent } from '../../../ui/confirm-dialog';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    RouterLink,
    LucideAngularModule,
    PageHeaderComponent,
    InputComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './customer-list.html',
  providers: [CustomerService],
})
export class CustomerListComponent {
  private readonly customerService = inject(CustomerService);
  private readonly toast = inject(HotToastService);

  private searchDebounce?: ReturnType<typeof setTimeout>;

  readonly customers = signal<Customer[]>([]);
  readonly loading = signal(false);
  readonly errorMessage = signal('');

  readonly search = signal('');
  readonly page = signal(0);
  readonly totalPages = signal(0);
  readonly isLastPage = signal(true);

  protected readonly Plus = Plus;
  protected readonly Pencil = Pencil;
  protected readonly Trash2 = Trash2;
  protected readonly Search = Search;

  constructor() {
    this.load();
  }

  onSearchChange(value: string): void {
    this.search.set(value);
    this.page.set(0);

    clearTimeout(this.searchDebounce);
    this.searchDebounce = setTimeout(() => this.load(), 400);
  }

  goToPage(next: number): void {
    if (next < 0 || next >= this.totalPages()) return;

    this.page.set(next);
    this.load();
  }

  readonly customerPendingDelete = signal<Customer | null>(null);

  deleteCustomer(customer: Customer): void {
    this.customerPendingDelete.set(customer);
  }

  cancelDelete(): void {
    this.customerPendingDelete.set(null);
  }

  confirmDelete(): void {
    const customer = this.customerPendingDelete();

    if (!customer) return;

    this.customerService.delete(customer.id).subscribe({
      next: () => {
        this.customerPendingDelete.set(null);
        this.toast.success('Müştəri uğurla silindi!');
        this.load();
      },
      error: () => {
        this.customerPendingDelete.set(null);
        this.toast.error('Müştəri silinərkən xəta baş verdi.');
        this.errorMessage.set('Müştəri silinərkən xəta baş verdi.');
      },
    });
  }

  private load(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.customerService.getPage(this.page(), PAGE_SIZE, this.search()).subscribe({
      next: (response) => {
        this.customers.set(response.content);
        this.totalPages.set(response.totalPages);
        this.isLastPage.set(response.last);
        this.loading.set(false);
      },
      error: () => {
        this.toast.error('Müştərilər yüklənərkən xəta baş verdi.');
        this.errorMessage.set('Müştərilər yüklənərkən xəta baş verdi. Backend işləyirmi?');
        this.loading.set(false);
      },
    });
  }
}