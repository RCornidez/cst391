import './Features.css';

export default function Features() {
  return (
    <section id="feature_voting">
      <h2>feature_voting</h2>
      <p>Vote on what you want built next. Top requests shape the roadmap.</p>
      <div className="wip">
        <i className="ph ph-lightbulb wip-icon"></i>
        <span className="wip-label">coming soon</span>
        <span className="wip-detail">Feature voting is on its way.</span>
      </div>
    </section>
  );
}
