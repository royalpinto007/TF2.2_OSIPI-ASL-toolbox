import Link from "next/link";
import { sidebarItems } from "./data";

export function AppChrome({ active, children }) {
  return (
    <div className="app-frame">
      <aside className="left-rail">
        <Link href="/" className="landing-brand">
          <img className="landing-logo" src="/assets/OSIPI_logo_only_square.png" alt="OSIPI logo" />
          <h1>PyASL</h1>
        </Link>

        <nav className="rail-nav">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href} className={`rail-item ${active === item.href ? "active" : ""}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <section className="metric-card" style={{ padding: '16px' }}>
            <span className="metric">Session</span>
            <strong style={{ fontSize: '0.9rem' }}>Guided study setup</strong>
          </section>

          <section className="metric-card" style={{ padding: '16px' }}>
            <span className="metric">Support</span>
            <strong style={{ fontSize: '0.9rem' }}>OSIPI TF 2.2</strong>
          </section>
        </div>
      </aside>

      <main className="main-shell">{children}</main>
    </div>
  );
}
