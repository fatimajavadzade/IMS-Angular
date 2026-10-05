import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Boxes, Lock, Mail, Phone } from 'lucide-angular';
import { InputComponent } from '../../ui/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, InputComponent],
  templateUrl: './register.html',
})
export class RegisterComponent {
  protected readonly Boxes = Boxes;
  protected readonly Phone = Phone;
  protected readonly Mail = Mail;
  protected readonly Lock = Lock;
}