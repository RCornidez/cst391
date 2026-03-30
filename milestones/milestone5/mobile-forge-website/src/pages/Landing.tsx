import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../routes';
import { getPlans, type SubscriptionPlan } from '../services/UserSubscription';
import { useSnackbar } from '../services/Snackbar';
import Typewriter from '../utilities/Typewriter';
import './Landing.css';

const CTA_WORDS = ['terminal.', 'forge.', 'pocket anvil.', 'mobile workshop.', 'iron shell.', 'field studio.', 'mobile toolkit.', 'hand-held terminal.'];

function isAnnual(plan: SubscriptionPlan): boolean {
  return plan.billingPeriod == "YEARLY";
}


export default function Landing() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const snackbar = useSnackbar();

  useEffect(() => {
    getPlans()
      .then(setPlans)
      .catch(() => snackbar.error('Failed to load subscription plans.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <nav id="nav">
        <div className="nav-inner">
          <span className="brand">mobile_forge</span>
          <div className="nav-links">
            <a href="#pricing">pricing</a>
            <Link to={ROUTES.LOGIN}>sign_in</Link>
          </div>
        </div>
      </nav>

      <section id="call-to-action">
        <div className="cta-inner">
          <img src="icons-art.svg" alt="mobile forge icons" className="cta-image" />
          <div className="cta-text">
            <h1>Your <Typewriter words={CTA_WORDS} /></h1>
            <p>
              Desks are optional. Language agnostic.<br />
              Wanderlust compatible. Skill required.<br />
              Location irrelevant.
            </p>
            <div className="cta-actions">
              <a href="#">learn_more</a>
              <Link to={ROUTES.LOGIN} className="btn-primary">get_started</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="pricing-inner">
          <div className="pricing-cards">
            {loading && <p className="pricing-status">Loading plans...</p>}
            {!loading && plans.map((plan, index) => (
              <div key={index} className="plan-card">
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    {isAnnual(plan) ? (
                      <>
                        <span className="price">${plan.price}</span>
                        <span className="period">/ month <span className="billed-note">(billed annually)</span></span>
                      </>
                    ) : (
                      <>
                        <span className="price">${plan.price}</span>
                        <span className="period">/ {plan.billingPeriod}</span>
                      </>
                    )}
                  </div>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={feature.title} className={feature.locked ? 'locked' : ''}>
                      {feature.locked
                        ? <i className="ph ph-lock-key feature-icon locked-icon"></i>
                        : <i className="ph ph-check-circle feature-icon check-icon"></i>
                      }
                      <div className="feature-text">
                        <span className="feature-title">{feature.title}</span>
                        <span className="feature-desc">{feature.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link to={ROUTES.LOGIN} className="plan-cta">get_started</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
