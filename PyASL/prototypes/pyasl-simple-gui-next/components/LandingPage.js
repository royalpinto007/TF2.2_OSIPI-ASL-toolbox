import Link from "next/link";

export function LandingPage() {
  return (
    <main className="landing-shell">
      <header className="landing-navbar">
        <Link href="/" className="landing-brand">
          <img className="landing-logo" src="/assets/OSIPI_logo_only_square.png" alt="OSIPI logo" />
          <h1>PyASL Workbench</h1>
        </Link>
        <nav className="landing-navlinks">
          <a href="#hero">Overview</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#why">Why</a>
          <a href="#benefits">Benefits</a>
        </nav>
        <div className="landing-navactions">
          <Link href="/workflows" className="button-link secondary">Workflow Guide</Link>
        </div>
      </header>

      <section className="landing-hero-section" id="hero">
        <div className="hero-splash-copy">
          <span className="eyebrow">Guided Interface</span>
          <h2>Run ASL workflows in minutes</h2>
          <p className="hero-lead">
            A guided PyASL interface for researchers who want to run study workflows
            without editing YAML or managing configuration files by hand.
          </p>
          <div className="overview-actions">
            <Link href="/workbench" className="button-link primary">Start workflow</Link>
            <Link href="/workflows" className="button-link secondary">Learn how it works</Link>
          </div>
          <div className="hero-inline-points">
            <span>No YAML editing</span>
            <span>Multi-dataset support</span>
            <span>Built for ASL researchers</span>
          </div>
        </div>

        <div className="hero-metrics">
          <div className="metric-card">
            <span className="metric">Who it is for</span>
            <strong>Researchers who want a guided PyASL interface</strong>
          </div>
          <div className="metric-card">
            <span className="metric">What you can do</span>
            <strong>Set up and run workflows across study datasets</strong>
          </div>
          <div className="metric-card">
            <span className="metric">What you get</span>
            <strong>Workflows, data selection, settings, runs, and results</strong>
          </div>
        </div>
      </section>

      <section className="modern-section" id="how-it-works">
        <div className="panel-head">
          <p className="panel-kicker">How It Works</p>
          <h3>A simple guided path from setup to results</h3>
        </div>
        <div className="landing-preview-grid">
          <div className="preview-flow">
            {[
              { title: "Choose workflow", desc: "Start from a preset instead of building a pipeline manually." },
              { title: "Select datasets", desc: "Choose the study folders you want to process." },
              { title: "Review settings", desc: "Confirm the main options before starting the run." },
              { title: "Run and view results", desc: "Start processing and open saved outputs when complete." }
            ].map((step, i) => (
              <div className="preview-step" key={i}>
                <span className="preview-step-index">{i + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="preview-surface">
            <div className="preview-window">
              <div className="preview-window-top">
                <span />
                <span />
                <span />
              </div>
              <div className="preview-window-body">
                <div className="preview-mini-card">
                  <small>Workflow</small>
                  <strong>Preclinical pCASL</strong>
                </div>
                <div className="preview-mini-grid">
                  <div className="preview-mini-card">
                    <small>Datasets</small>
                    <strong>3 selected</strong>
                  </div>
                  <div className="preview-mini-card">
                    <small>Status</small>
                    <strong>Ready</strong>
                  </div>
                </div>
                <div className="preview-list">
                  <div className="preview-list-row">Choose workflow</div>
                  <div className="preview-list-row">Select study data</div>
                  <div className="preview-list-row">Run and view results</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="modern-section" id="why">
        <div className="panel-head">
          <p className="panel-kicker">Why PyASL Workbench Exists</p>
          <h3>Removes configuration complexity</h3>
        </div>
        <div className="metric-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p className="hero-lead">
            PyASL is modular and powerful, but configuring workflows manually can be a barrier for many users.
            PyASL Workbench is designed to reduce that friction by guiding workflow setup, dataset selection,
            settings review, execution, and results access through one simpler interface.
          </p>
        </div>
      </section>

      <section className="overview-grid modern-section" id="benefits">
        <article className="overview-card">
          <p className="panel-kicker">Why this is easier</p>
          <h3>Workflow presets</h3>
          <p>Start from a preset that matches your data instead of assembling steps by hand.</p>
        </article>

        <article className="overview-card">
          <p className="panel-kicker">Built for studies</p>
          <h3>Multi-dataset processing</h3>
          <p>Apply one workflow across a study without repeating the same setup for every dataset.</p>
        </article>

        <article className="overview-card">
          <p className="panel-kicker">Results</p>
          <h3>Easy results access</h3>
          <p>Open saved outputs, run summaries, and exported configurations after processing.</p>
        </article>
      </section>

      <section className="metric-card modern-section" style={{ textAlign: 'center', marginBottom: '80px' }}>
        <p className="panel-kicker">Ready</p>
        <h3>Ready to run your first workflow?</h3>
        <div style={{ marginTop: '24px' }}>
          <Link href="/workbench" className="button-link primary">Start workflow</Link>
        </div>
      </section>

      <footer className="landing-footer">
        <div>
          <strong style={{ fontSize: '1.25rem' }}>PyASL Workbench</strong>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>A guided interface concept for simpler PyASL processing.</p>
        </div>
        <div className="landing-footer-links">
          <Link href="/workflows">Workflow Guide</Link>
          <Link href="/workbench">Start Processing</Link>
          <Link href="/reports">View Results</Link>
        </div>
      </footer>
    </main>
  );
}
