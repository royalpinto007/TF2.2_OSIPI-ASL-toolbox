import Link from "next/link";
import { profiles } from "./data";

export function WorkbenchPage() {
  const profile = profiles.pcasl;

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">PyASL Interface</p>
          <h2>Build, inspect, and launch PyASL pipelines</h2>
        </div>
        <div className="topbar-actions">
          <Link href="/workbench" className="button-link">Load Preset</Link>
          <Link href="/reports" className="button-link">Export YAML</Link>
          <Link href="/runs" className="button-link primary">Run Batch</Link>
        </div>
      </header>

      <section className="hero-band">
        <div className="hero-copy">
          <h3>Build a reusable PyASL workflow, then run it at study scale.</h3>
          <p>
            Start from a pipeline family, inspect module settings, validate the generated config, and
            launch batch runs with QC and YAML export built in.
          </p>
        </div>
        <div className="hero-stats compact">
          <span className="hero-chip">7 pipeline families</span>
          <span className="hero-chip">12 queued runs</span>
          <span className="hero-chip">Active: <strong>pCASL</strong></span>
        </div>
      </section>

      <section className="work-area">
        <div className="column canvas-column">
          <section className="panel pipeline-panel">
            <div className="panel-head">
              <div>
                <p className="panel-kicker">Pipeline Builder</p>
                <h3>Compose a PyASL workflow</h3>
              </div>
              <select className="header-select" defaultValue="pcasl">
                <option value="pcasl">Preclinical pCASL</option>
                <option value="mti">Preclinical multi-TI PASL</option>
                <option value="custom">Custom mixed pipeline</option>
              </select>
            </div>

            <div className="builder-toolbar">
              <Link href="/workbench" className="button-link small">Add Module</Link>
              <Link href="/templates" className="button-link small">Use Template</Link>
              <Link href="/runs" className="button-link small">Validate</Link>
              <Link href="/reports" className="button-link small">Show YAML</Link>
            </div>

            <div className="module-stack">
              {profile.modules.map((module, index) => (
                <article className={`module-card ${index === 0 ? "selected" : ""}`} key={module}>
                  <div className="module-line">
                    <span className="module-index">{String(index + 1).padStart(2, "0")}</span>
                    <div className="module-copy">
                      <strong className="module-name">{module}</strong>
                      <p className="module-note">Configured inside the selected PyASL workflow profile.</p>
                    </div>
                    <span className="module-kind">{index >= 5 ? "2026" : "Core"}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="column side-column">
          <section className="panel inspector-panel">
            <div className="panel-head">
              <div>
                <p className="panel-kicker">Inspector</p>
                <h3>Selected module settings</h3>
              </div>
              <span className="tag">BrukerLoader</span>
            </div>
            <p className="inspector-helper">
              Editable defaults for the selected module. Change them here before export or batch run.
            </p>
            <div className="field-group">
              <label>Input root</label>
              <input type="text" value="/study/rawdata/cohort-a" readOnly />
            </div>
            <div className="field-row">
              <div className="field-group">
                <label>Format</label>
                <select defaultValue="Bruker 2dseq">
                  <option>Bruker 2dseq</option>
                </select>
              </div>
              <div className="field-group">
                <label>Experiment number</label>
                <input type="text" value="18" readOnly />
              </div>
            </div>
            <div className="field-group">
              <label>Output folder</label>
              <input type="text" value="/study/results/cohort-a" readOnly />
            </div>
            <div className="inspector-note">Load raw preclinical pCASL data and initialize study metadata.</div>
          </section>

          <section className="panel yaml-panel">
            <div className="panel-head">
              <div>
                <p className="panel-kicker">Config Preview</p>
                <h3>Generated YAML</h3>
              </div>
            </div>
            <pre>{profile.yaml}</pre>
          </section>
        </div>
      </section>
    </>
  );
}
