import React, { useEffect, useState } from 'react';
import { getKeys, createKey, renameKey, deleteKey, type ApiKey, type CreateApiKeyPayload } from '../services/ApiKeys';
import { getSubscription, getPlans, getPlanById, createSubscription, updateSubscription, cancelSubscription } from '../services/UserSubscription';
import { getBillingInfo, createBillingInfo, updateBillingInfo, deleteBillingInfo, type BillingInfo, type BillingFormPayload } from '../services/BillingInfo';
import { type UserSubscription, type SubscriptionPlan } from '../services/UserSubscription';
import { useSnackbar } from '../services/Snackbar';
import { useConfirmModal } from '../components/ConfirmModal';
import './Settings.css';

const emptyBillingForm = (): BillingFormPayload => ({
  nameOnCard: '', cardNumber: '', expMonth: '', expYear: '',
  cvv: '', address: '', state: '', zip: '', cardType: 'VISA',
});

const emptyCreateForm = (): CreateApiKeyPayload => ({
  providerType: 'GITHUB', keyName: '', apiKey: '',
});

function formatDate(dateStr: string): string {
  return new Date(dateStr).toISOString().split('T')[0];
}

interface BillingFormProps {
  billingForm: BillingFormPayload;
  setBillingForm: React.Dispatch<React.SetStateAction<BillingFormPayload>>;
  billingFormMode: 'create' | 'update';
  onSave: () => void;
  onClose: () => void;
}

function BillingForm({ billingForm, setBillingForm, billingFormMode, onSave, onClose }: BillingFormProps) {
  return (
    <div className="create-form billing-form">
      <div className="billing-form-row">
        <div className="form-field">
          <label className="field-label">name_on_card</label>
          <input type="text" autoComplete="off" placeholder="Jane Doe"
            value={billingForm.nameOnCard}
            onChange={e => setBillingForm(f => ({ ...f, nameOnCard: e.target.value }))} />
        </div>
        <div className="form-field">
          <label className="field-label">card_type</label>
          <div className="select-wrapper">
            <select autoComplete="off"
              value={billingForm.cardType}
              onChange={e => setBillingForm(f => ({ ...f, cardType: e.target.value as BillingFormPayload['cardType'] }))}>
              <option value="VISA">VISA</option>
              <option value="MASTERCARD">MASTERCARD</option>
              <option value="AMEX">AMEX</option>
              <option value="DISCOVER">DISCOVER</option>
            </select>
            <i className="ph ph-caret-down"></i>
          </div>
        </div>
      </div>
      <div className="form-field">
        <label className="field-label">card_number</label>
        <input type="text" autoComplete="off" placeholder="1234 5678 9012 3456" maxLength={16}
          value={billingForm.cardNumber}
          onChange={e => setBillingForm(f => ({ ...f, cardNumber: e.target.value }))} />
      </div>
      <div className="billing-form-row">
        <div className="form-field">
          <label className="field-label">exp_month</label>
          <input type="text" autoComplete="off" placeholder="MM" maxLength={2}
            value={billingForm.expMonth}
            onChange={e => setBillingForm(f => ({ ...f, expMonth: e.target.value }))} />
        </div>
        <div className="form-field">
          <label className="field-label">exp_year</label>
          <input type="text" autoComplete="off" placeholder="YYYY" maxLength={4}
            value={billingForm.expYear}
            onChange={e => setBillingForm(f => ({ ...f, expYear: e.target.value }))} />
        </div>
        <div className="form-field">
          <label className="field-label">cvv</label>
          <input type="text" autoComplete="off" placeholder="•••" maxLength={4}
            value={billingForm.cvv}
            onChange={e => setBillingForm(f => ({ ...f, cvv: e.target.value }))} />
        </div>
      </div>
      <div className="form-field">
        <label className="field-label">address</label>
        <input type="text" autoComplete="off" placeholder="123 Main St"
          value={billingForm.address}
          onChange={e => setBillingForm(f => ({ ...f, address: e.target.value }))} />
      </div>
      <div className="billing-form-row">
        <div className="form-field">
          <label className="field-label">state</label>
          <input type="text" autoComplete="off" placeholder="AZ" maxLength={2}
            value={billingForm.state}
            onChange={e => setBillingForm(f => ({ ...f, state: e.target.value }))} />
        </div>
        <div className="form-field">
          <label className="field-label">zip</label>
          <input type="text" autoComplete="off" placeholder="85001" maxLength={5}
            value={billingForm.zip}
            onChange={e => setBillingForm(f => ({ ...f, zip: e.target.value }))} />
        </div>
      </div>
      <div className="form-actions">
        <button className="btn-dark" onClick={onSave}>
          <i className="ph ph-check"></i>
          {billingFormMode === 'create' ? 'save_card' : 'update_card'}
        </button>
        <button className="btn-outline" onClick={onClose}>cancel</button>
      </div>
    </div>
  );
}

interface PlanCardsProps {
  allPlans: SubscriptionPlan[];
  selectedPlanId: string;
  expandedPlanId: string | null;
  onSelectPlan: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onConfirm: () => void;
  confirmLabel: string;
}

function PlanCards({ allPlans, selectedPlanId, expandedPlanId, onSelectPlan, onToggleExpand, onConfirm, confirmLabel }: PlanCardsProps) {
  return (
    <>
      <div className="plan-cards">
        {allPlans.map(plan => (
          <div
            key={plan.id}
            className={`plan-card${selectedPlanId === plan.id ? ' selected' : ''}`}
            onClick={() => onSelectPlan(plan.id)}
          >
            <span className="plan-name">{plan.name}</span>
            <span className="plan-price">
              ${plan.price.toFixed(2)}<span className="plan-period"> / {plan.billingPeriod}</span>
            </span>
            <button
              className="plan-features-toggle"
              onClick={e => { e.stopPropagation(); onToggleExpand(plan.id); }}
            >
              <i className={expandedPlanId === plan.id ? 'ph ph-caret-up' : 'ph ph-caret-down'}></i>
              features
            </button>
            {expandedPlanId === plan.id && (
              <ul className="plan-features-list">
                {plan.features.map(feature => (
                  <li key={feature.title}>
                    <i className={feature.locked ? 'ph ph-x feature-icon restricted' : 'ph ph-check feature-icon available'}></i>
                    <span className="feature-title">{feature.title}</span> — {feature.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="form-actions" style={{ marginTop: '0.75rem' }}>
        <button className="btn-dark" onClick={onConfirm}>
          <i className="ph ph-check"></i>
          {confirmLabel}
        </button>
      </div>
    </>
  );
}

export default function Settings() {
  const snackbar = useSnackbar();
  const confirm = useConfirmModal();

  // API Keys
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState<CreateApiKeyPayload>(emptyCreateForm());
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  // Subscription
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const [allPlans, setAllPlans] = useState<SubscriptionPlan[]>([]);
  const [showPlanSelector, setShowPlanSelector] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  // Billing
  const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [billingFormMode, setBillingFormMode] = useState<'create' | 'update'>('create');
  const [billingForm, setBillingForm] = useState<BillingFormPayload>(emptyBillingForm());

  useEffect(() => {
    loadKeys();
    loadSubscription();
    loadBillingInfo();
  }, []);

  // API Keys

  function loadKeys() {
    getKeys()
      .then(setKeys)
      .catch(err => snackbar.error(err.response?.data?.message ?? 'Failed to load API keys'));
  }

  function toggleCreateForm() {
    setShowCreateForm(v => {
      if (v) setCreateForm(emptyCreateForm());
      return !v;
    });
  }

  function onCreateKey() {
    if (!createForm.keyName || !createForm.apiKey) {
      snackbar.error('All fields are required');
      return;
    }
    createKey(createForm)
      .then(res => { snackbar.success(res.message); toggleCreateForm(); loadKeys(); })
      .catch(err => snackbar.error(err.response?.data?.message ?? 'Failed to create API key'));
  }

  function startRename(key: ApiKey) { setRenamingId(key.id); setRenameValue(key.keyName); }
  function cancelRename() { setRenamingId(null); setRenameValue(''); }

  function onRenameKey(id: string) {
    renameKey(id, renameValue)
      .then(res => { snackbar.success(res.message); cancelRename(); loadKeys(); })
      .catch(err => snackbar.error(err.response?.data?.message ?? 'Failed to rename API key'));
  }

  function onDeleteKey(id: string) {
    confirm.open({
      title: 'delete_api_key',
      message: 'This key will be permanently removed. Access will be lost immediately.',
      confirmLabel: 'delete',
      danger: true,
    }).then(confirmed => {
      if (!confirmed) return;
      deleteKey(id)
        .then(res => { snackbar.success(res.message); loadKeys(); })
        .catch(err => snackbar.error(err.response?.data?.message ?? 'Failed to delete API key'));
    });
  }

  // Subscription

  function loadSubscription() {
    getSubscription()
      .then(sub => {
        setSubscription(sub);
        setSelectedPlanId(sub.planId);
        getPlanById(sub.planId).then(setCurrentPlan).catch(() => {});
      })
      .catch(() => { setSubscription(null); setCurrentPlan(null); });

    getPlans()
      .then(plans => setAllPlans(plans.filter(p => p.isActive)))
      .catch(() => {});
  }

  function togglePlanSelector() {
    setShowPlanSelector(v => {
      if (v) setSelectedPlanId(subscription?.planId ?? '');
      return !v;
    });
  }

  function onSubscribe() {
    if (!selectedPlanId) { snackbar.error('Please select a plan'); return; }
    createSubscription(selectedPlanId)
      .then(res => { snackbar.success(res.message); loadSubscription(); })
      .catch(err => snackbar.error(err.response?.data?.message ?? 'Failed to create subscription'));
  }

  function onChangePlan() {
    if (!selectedPlanId || selectedPlanId === subscription?.planId) {
      snackbar.info('Select a different plan to update');
      return;
    }
    updateSubscription(selectedPlanId)
      .then(res => { snackbar.success(res.message); setShowPlanSelector(false); loadSubscription(); })
      .catch(err => snackbar.error(err.response?.data?.message ?? 'Failed to update subscription'));
  }

  function onCancelSubscription() {
    confirm.open({
      title: 'cancel_subscription',
      message: 'Your plan will be cancelled immediately. You will lose access to all provisioning features.',
      confirmLabel: 'cancel_subscription',
      danger: true,
    }).then(confirmed => {
      if (!confirmed) return;
      cancelSubscription()
        .then(res => { snackbar.success(res.message); loadSubscription(); })
        .catch(err => snackbar.error(err.response?.data?.message ?? 'Failed to cancel subscription'));
    });
  }

  // Billing

  function loadBillingInfo() {
    getBillingInfo()
      .then(setBillingInfo)
      .catch(() => setBillingInfo(null));
  }

  function openBillingForm(mode: 'create' | 'update') {
    setBillingFormMode(mode);
    setBillingForm(emptyBillingForm());
    setShowBillingForm(true);
  }

  function closeBillingForm() {
    setShowBillingForm(false);
    setBillingForm(emptyBillingForm());
  }

  function onSaveBillingInfo() {
    const { nameOnCard, cardNumber, expMonth, expYear, cvv, address, state, zip } = billingForm;
    if (!nameOnCard || !cardNumber || !expMonth || !expYear || !cvv || !address || !state || !zip) {
      snackbar.error('All fields are required');
      return;
    }
    const request = billingFormMode === 'create' ? createBillingInfo(billingForm) : updateBillingInfo(billingForm);
    request
      .then(res => { snackbar.success(res.message); closeBillingForm(); loadBillingInfo(); })
      .catch(err => snackbar.error(err.response?.data?.message ?? 'Failed to save billing info'));
  }

  function onDeleteBillingInfo() {
    confirm.open({
      title: 'remove_payment_method',
      message: 'Your card on file will be permanently removed.',
      confirmLabel: 'remove',
      danger: true,
    }).then(confirmed => {
      if (!confirmed) return;
      deleteBillingInfo()
        .then(res => { snackbar.success(res.message); setBillingInfo(null); })
        .catch(err => snackbar.error(err.response?.data?.message ?? 'Failed to remove billing info'));
    });
  }

  return (
    <div className="settings">

      <section id="keys">
        <h2>keys</h2>
        <p>Add your GitHub and Digital Ocean API keys to enable server provisioning and automatic repository deployment.</p>

        <div className="table-placeholder keys-table">
          <div className="table-row header">
            <span>name</span>
            <span>provider</span>
            <span>created</span>
            <span>actions</span>
          </div>

          {keys.map(key => (
            <div key={key.id} className="table-row">
              {renamingId === key.id ? (
                <span>
                  <input
                    className="rename-input"
                    value={renameValue}
                    onChange={e => setRenameValue(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') onRenameKey(key.id); if (e.key === 'Escape') cancelRename(); }}
                  />
                </span>
              ) : (
                <span>{key.keyName}</span>
              )}
              <span>
                <span className={`badge ${key.providerType === 'GITHUB' ? 'github' : 'info'}`}>{key.providerType}</span>
              </span>
              <span>{formatDate(key.createdAt)}</span>
              <span className="row-actions">
                {renamingId === key.id ? (
                  <>
                    <button className="btn-action" onClick={() => onRenameKey(key.id)}>save</button>
                    <button className="btn-action muted" onClick={cancelRename}>cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn-action" onClick={() => startRename(key)}>rename</button>
                    <button className="btn-action danger" onClick={() => onDeleteKey(key.id)}>delete</button>
                  </>
                )}
              </span>
            </div>
          ))}

          {keys.length === 0 && (
            <div className="table-row empty">
              <span>no keys found</span>
            </div>
          )}
        </div>

        {showCreateForm && (
          <div className="create-form">
            <div className="form-field">
              <label className="field-label">provider</label>
              <div className="select-wrapper">
                <select
                  value={createForm.providerType}
                  onChange={e => setCreateForm(f => ({ ...f, providerType: e.target.value as CreateApiKeyPayload['providerType'] }))}
                >
                  <option value="GITHUB">GITHUB</option>
                  <option value="DIGITAL_OCEAN">DIGITAL_OCEAN</option>
                </select>
                <i className="ph ph-caret-down"></i>
              </div>
            </div>
            <div className="form-field">
              <label className="field-label">key_name</label>
              <input
                type="text"
                placeholder="e.g. my_github_key"
                autoComplete="off"
                value={createForm.keyName}
                onChange={e => setCreateForm(f => ({ ...f, keyName: e.target.value }))}
              />
            </div>
            <div className="form-field">
              <label className="field-label">api_key</label>
              <input
                type="text"
                placeholder="paste your API key here"
                autoComplete="off"
                value={createForm.apiKey}
                onChange={e => setCreateForm(f => ({ ...f, apiKey: e.target.value }))}
              />
            </div>
            <div className="form-actions">
              <button className="btn-dark" onClick={onCreateKey}>
                <i className="ph ph-check"></i>
                save_key
              </button>
              <button className="btn-outline" onClick={toggleCreateForm}>cancel</button>
            </div>
          </div>
        )}

        <button className="btn-dark" onClick={toggleCreateForm}>
          <i className="ph ph-plus"></i>
          new_key
        </button>
      </section>

      <section id="account">
        <h2>account</h2>
        <p>Manage your subscription plan.</p>

        {subscription && currentPlan ? (
          <>
            <div className="info-block">
              <div className="info-row">
                <span className="info-label">plan</span>
                <span>
                  {currentPlan.name}{' '}
                  <span className={`badge ${subscription.status === 'ACTIVE' ? 'active' : 'inactive'}`}>
                    {subscription.status.toLowerCase()}
                  </span>
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">price</span>
                <span>${currentPlan.price.toFixed(2)} / {currentPlan.billingPeriod}</span>
              </div>
              <div className="info-row">
                <span className="info-label">member_since</span>
                <span>{formatDate(subscription.startDate)}</span>
              </div>
            </div>

            {showPlanSelector && (
              <div className="plan-selector">
                <p className="field-label" style={{ marginBottom: '0.75rem' }}>select a plan</p>
                <PlanCards allPlans={allPlans} selectedPlanId={selectedPlanId} expandedPlanId={expandedPlanId} onSelectPlan={setSelectedPlanId} onToggleExpand={id => setExpandedPlanId(v => v === id ? null : id)} onConfirm={onChangePlan} confirmLabel="confirm_change" />
                <div className="form-actions" style={{ marginTop: '0.5rem' }}>
                  <button className="btn-outline" onClick={togglePlanSelector}>cancel</button>
                </div>
              </div>
            )}

            <div className="btn-row">
              <button className="btn-outline" onClick={togglePlanSelector}>change_plan</button>
              {subscription.status === 'ACTIVE' && (
                <button className="btn-outline danger" onClick={onCancelSubscription}>cancel_subscription</button>
              )}
            </div>
          </>
        ) : (
          <div className="empty-subscription">
            <p className="empty-sub-title">no active subscription</p>
            <p className="empty-sub-sub">select a plan below to get started</p>
            <PlanCards allPlans={allPlans} selectedPlanId={selectedPlanId} expandedPlanId={expandedPlanId} onSelectPlan={setSelectedPlanId} onToggleExpand={id => setExpandedPlanId(v => v === id ? null : id)} onConfirm={onSubscribe} confirmLabel="subscribe" />
          </div>
        )}
      </section>

      <section id="billing">
        <h2>billing</h2>
        <p>Manage your payment method on file.</p>

        {billingInfo ? (
          <>
            <div className="info-block">
              <div className="info-row">
                <span className="info-label">card_type</span>
                <span>{billingInfo.cardType}</span>
              </div>
              <div className="info-row">
                <span className="info-label">card_number</span>
                <span className="card-masked">•••• •••• •••• {billingInfo.cardLastFour}</span>
              </div>
            </div>

            {showBillingForm && <BillingForm billingForm={billingForm} setBillingForm={setBillingForm} billingFormMode={billingFormMode} onSave={onSaveBillingInfo} onClose={closeBillingForm} />}

            <div className="btn-row">
              <button className="btn-outline" onClick={() => openBillingForm('update')}>update_card</button>
              <button className="btn-outline danger" onClick={onDeleteBillingInfo}>remove_card</button>
            </div>
          </>
        ) : (
          <>
            <div className="info-block">
              <div className="info-row">
                <span className="info-label">card_on_file</span>
                <span className="muted-text">no payment method on file</span>
              </div>
            </div>

            {showBillingForm && <BillingForm billingForm={billingForm} setBillingForm={setBillingForm} billingFormMode={billingFormMode} onSave={onSaveBillingInfo} onClose={closeBillingForm} />}

            {!showBillingForm && (
              <button className="btn-dark" onClick={() => openBillingForm('create')}>
                <i className="ph ph-plus"></i>
                add_payment_method
              </button>
            )}
          </>
        )}
      </section>
    </div>
  );

}
