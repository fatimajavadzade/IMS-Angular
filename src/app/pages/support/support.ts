import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ArrowRight,
  Boxes,
  Clock3,
  Headphones,
  Mail,
  MessageSquareText,
  Phone,
  ShieldCheck,
} from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './support.html',
})
export class SupportComponent {
  protected readonly Boxes = Boxes;
  protected readonly Headphones = Headphones;
  protected readonly MessageSquareText = MessageSquareText;
  protected readonly Mail = Mail;
  protected readonly Phone = Phone;
  protected readonly Clock3 = Clock3;
  protected readonly ShieldCheck = ShieldCheck;
  protected readonly ArrowRight = ArrowRight;
}