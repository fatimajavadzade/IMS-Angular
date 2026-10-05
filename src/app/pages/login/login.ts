import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, Boxes, Lock, Mail } from 'lucide-angular';
import { InputComponent } from '../../ui/input';
import { AuthService } from '../../core/auth.service';
import { toFieldErrors } from '../../core/zod-errors';
import { loginSchema } from './login.schema';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly email = signal('');
  readonly password = signal('');

  readonly fieldErrors = signal<Record<string, string>>({});
  readonly serverError = signal('');
  readonly submitting = signal(false);

  protected readonly Boxes = Boxes;
  protected readonly Mail = Mail;
  protected readonly Lock = Lock;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  submit(): void {
    this.serverError.set('');

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const result = loginSchema.safeParse({
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    });

    if (!result.success) {
      this.fieldErrors.set(toFieldErrors(result.error));
      return;
    }

    this.fieldErrors.set({});
    this.submitting.set(true);

    this.auth.login(result.data.email, result.data.password).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        this.submitting.set(false);
        this.serverError.set(err.error?.message ?? 'Daxil olmaq mümkün olmadı.');
      },
    });
  }

  // submit(): void {
  //   this.serverError.set('');

  //   if (this.loginForm.invalid) {
  //     this.loginForm.markAllAsTouched();
  //     return;
  //   }

  //   const result = loginSchema.safeParse({
  //     email: this.email(),
  //     password: this.password(),
  //   });

  //   if (!result.success) {
  //     this.fieldErrors.set(toFieldErrors(result.error));
  //     return;
  //   }

  //   this.fieldErrors.set({});
  //   this.submitting.set(true);

  //   this.auth.login(result.data.email, result.data.password).subscribe({
  //     next: () => {
  //       this.submitting.set(false);
  //       this.router.navigateByUrl('/dashboard');
  //     },
  //     error: (err) => {
  //       this.submitting.set(false);
  //       this.serverError.set(err.error?.message ?? 'Daxil olmaq mümkün olmadı.');
  //     },
  //   });
  // }
}