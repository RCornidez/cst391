import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserSubscriptionsService, SubscriptionPlan } from '../../services/user-subscriptions.service';
import { Typewriter } from '../../utilities/typewriter/typewriter';


@Component({
  selector: 'app-landing',
  imports: [RouterLink, Typewriter],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing implements OnInit {
  plans = signal<SubscriptionPlan[]>([]);
  ctaWords = ['terminal.', 'forge.', 'pocket anvil.', 'mobile workshop.', 'iron shell.', 'field studio.', 'mobile toolkit.', 'hand-held terminal.'];

  constructor(private subscriptions: UserSubscriptionsService) {}

  ngOnInit() {
    this.subscriptions.getPlans().subscribe({
      next: (plans) => this.plans.set(plans),
      error: (err) => console.error('[Landing] error:', err),
    });
  }

  isAnnual(plan: SubscriptionPlan): boolean {
    return /annual|yearly/i.test(plan.billingPeriod);
  }

  monthlyPrice(plan: SubscriptionPlan): number {
    return Math.round(plan.price / 12);
  }
}
