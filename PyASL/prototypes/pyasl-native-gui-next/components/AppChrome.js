import Link from "next/link";
import { sidebarItems } from "./data";

export function AppChrome({ active, children }) {
  return (
    <div className="app-frame">
      <aside className="left-rail">
        <Link href="/" className="brand-block">
          <img className="brand-mark-image" src="/assets/OSIPI_logo_only_square.png" alt="OSIPI logo" />
          <div>
            <p className="eyebrow">OSIPI PyASL</p>
            <h1>PyASL Workbench</h1>
          </div>
        </Link>

        <nav className="rail-nav">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href} className={`rail-item ${active === item.href ? "active" : ""}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <section className="rail-card">
          <p className="card-label">Current Session</p>
          <strong>Preclinical pCASL cohort</strong>
          <span>12 datasets queued · 1 active run</span>
        </section>

        <section className="rail-card">
          <p className="card-label">Built For</p>
          <strong>Preclinical and human ASL research</strong>
          <span>Designed for reproducible workflows, study-scale runs, and QC review.</span>
        </section>
      </aside>

      <main className="main-shell">{children}</main>
    </div>
  );
}
