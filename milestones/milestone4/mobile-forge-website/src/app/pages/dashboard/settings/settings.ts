import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { ApiKeysService, ApiKey, CreateApiKeyPayload } from '../../../services/api-keys.service';
import { UserSubscriptionsService, UserSubscription, SubscriptionPlan } from '../../../services/user-subscriptions.service';
import { BillingInfoService, BillingInfo, BillingFormPayload } from '../../../services/billing-info.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { ConfirmModalService } from '../../../services/confirm-modal.service';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
  // api keys
  keys: ApiKey[] = [];
  showCreateForm = false;
  createForm: CreateApiKeyPayload = { providerType: 'GITHUB', keyName: '', apiKey: '' };
  renamingId: string | null = null;
  renameValue = '';

  // subscription
  subscription: UserSubscription | null = null;
  currentPlan: SubscriptionPlan | null = null;
  allPlans: SubscriptionPlan[] = [];
  showPlanSelector = false;
  selectedPlanId = '';
  expandedPlanId: string | null = null;

  // billing
  billingInfo: BillingInfo | null = null;
  showBillingForm = false;
  billingFormMode: 'create' | 'update' = 'create';
  billingForm: BillingFormPayload = this.emptyBillingForm();

  private emptyBillingForm(): BillingFormPayload {
    return { nameOnCard: '', cardNumber: '', expMonth: '', expYear: '', cvv: '', address: '', state: '', zip: '', cardType: 'VISA' };
  }

  constructor(
    private apiKeysService: ApiKeysService,
    private subscriptionsService: UserSubscriptionsService,
    private billingInfoService: BillingInfoService,
    private snackbar: SnackbarService,
    private confirmModal: ConfirmModalService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadKeys();
    this.loadSubscription();
    this.loadBillingInfo();
  }

  // API Keys

  loadKeys() {
    this.apiKeysService.getKeys().subscribe({
      next: (keys) => { this.keys = keys; this.cdr.detectChanges(); },
      error: (err) => this.snackbar.error(err.error?.message ?? 'Failed to load API keys'),
    });
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.createForm = { providerType: 'GITHUB', keyName: '', apiKey: '' };
    }
  }

  onCreateKey() {
    if (!this.createForm.keyName || !this.createForm.apiKey) {
      this.snackbar.error('All fields are required');
      return;
    }
    this.apiKeysService.createKey(this.createForm).subscribe({
      next: (res) => { this.snackbar.success(res.message); this.toggleCreateForm(); this.loadKeys(); },
      error: (err) => this.snackbar.error(err.error?.message ?? 'Failed to create API key'),
    });
  }

  startRename(key: ApiKey) { this.renamingId = key.id; this.renameValue = key.keyName; }
  cancelRename() { this.renamingId = null; this.renameValue = ''; }

  onRenameKey(id: string) {
    this.apiKeysService.renameKey(id, this.renameValue).subscribe({
      next: (res) => { this.snackbar.success(res.message); this.cancelRename(); this.loadKeys(); },
      error: (err) => this.snackbar.error(err.error?.message ?? 'Failed to rename API key'),
    });
  }

  onDeleteKey(id: string) {
    this.confirmModal.open({
      title: 'delete_api_key',
      message: 'This key will be permanently removed. Access will be lost immediately.',
      confirmLabel: 'delete',
      danger: true,
    }).subscribe(confirmed => {
      if (!confirmed) return;
      this.apiKeysService.deleteKey(id).subscribe({
        next: (res) => { this.snackbar.success(res.message); this.loadKeys(); },
        error: (err) => this.snackbar.error(err.error?.message ?? 'Failed to delete API key'),
      });
    });
  }

  // Subscription

  loadSubscription() {
    this.subscriptionsService.getSubscription().subscribe({
      next: (sub) => {
        this.subscription = sub;
        this.selectedPlanId = sub.planId;
        this.cdr.detectChanges();
        this.subscriptionsService.getPlanById(sub.planId).subscribe({
          next: (plan) => { this.currentPlan = plan; this.cdr.detectChanges(); },
        });
      },
      error: () => { this.subscription = null; this.currentPlan = null; this.cdr.detectChanges(); },
    });

    this.subscriptionsService.getPlans().subscribe({
      next: (plans) => { this.allPlans = plans.filter(p => p.isActive); this.cdr.detectChanges(); },
    });
  }

  togglePlanSelector() {
    this.showPlanSelector = !this.showPlanSelector;
    if (!this.showPlanSelector) this.selectedPlanId = this.subscription?.planId ?? '';
  }

  onSubscribe() {
    if (!this.selectedPlanId) {
      this.snackbar.error('Please select a plan');
      return;
    }
    this.subscriptionsService.createSubscription(this.selectedPlanId).subscribe({
      next: (res) => { this.snackbar.success(res.message); this.loadSubscription(); },
      error: (err) => this.snackbar.error(err.error?.message ?? 'Failed to create subscription'),
    });
  }

  onChangePlan() {
    if (!this.selectedPlanId || this.selectedPlanId === this.subscription?.planId) {
      this.snackbar.info('Select a different plan to update');
      return;
    }
    this.subscriptionsService.updateSubscription(this.selectedPlanId).subscribe({
      next: (res) => { this.snackbar.success(res.message); this.showPlanSelector = false; this.loadSubscription(); },
      error: (err) => this.snackbar.error(err.error?.message ?? 'Failed to update subscription'),
    });
  }

  onCancelSubscription() {
    this.confirmModal.open({
      title: 'cancel_subscription',
      message: 'Your plan will be cancelled immediately. You will lose access to all provisioning features.',
      confirmLabel: 'cancel_subscription',
      danger: true,
    }).subscribe(confirmed => {
      if (!confirmed) return;
      this.subscriptionsService.cancelSubscription().subscribe({
        next: (res) => { this.snackbar.success(res.message); this.loadSubscription(); },
        error: (err) => this.snackbar.error(err.error?.message ?? 'Failed to cancel subscription'),
      });
    });
  }

  // Billing

  loadBillingInfo() {
    this.billingInfoService.getBillingInfo().subscribe({
      next: (info) => { this.billingInfo = info; this.cdr.detectChanges(); },
      error: () => { this.billingInfo = null; this.cdr.detectChanges(); },
    });
  }

  openBillingForm(mode: 'create' | 'update') {
    this.billingFormMode = mode;
    this.billingForm = this.emptyBillingForm();
    this.showBillingForm = true;
  }

  closeBillingForm() {
    this.showBillingForm = false;
    this.billingForm = this.emptyBillingForm();
    this.cdr.detectChanges();
  }

  onSaveBillingInfo() {
    const { nameOnCard, cardNumber, expMonth, expYear, cvv, address, state, zip } = this.billingForm;
    if (!nameOnCard || !cardNumber || !expMonth || !expYear || !cvv || !address || !state || !zip) {
      this.snackbar.error('All fields are required');
      return;
    }
    const request$ = this.billingFormMode === 'create'
      ? this.billingInfoService.createBillingInfo(this.billingForm)
      : this.billingInfoService.updateBillingInfo(this.billingForm);

    request$.subscribe({
      next: (res) => { this.snackbar.success(res.message); this.closeBillingForm(); this.loadBillingInfo(); },
      error: (err) => this.snackbar.error(err.error?.message ?? 'Failed to save billing info'),
    });
  }

  onDeleteBillingInfo() {
    this.confirmModal.open({
      title: 'remove_payment_method',
      message: 'Your card on file will be permanently removed.',
      confirmLabel: 'remove',
      danger: true,
    }).subscribe(confirmed => {
      if (!confirmed) return;
      this.billingInfoService.deleteBillingInfo().subscribe({
        next: (res) => { this.snackbar.success(res.message); this.billingInfo = null; this.cdr.detectChanges(); },
        error: (err) => this.snackbar.error(err.error?.message ?? 'Failed to remove billing info'),
      });
    });
  }

  // Helpers

  formatDate(dateStr: string): string {
    return new Date(dateStr).toISOString().split('T')[0];
  }
}
