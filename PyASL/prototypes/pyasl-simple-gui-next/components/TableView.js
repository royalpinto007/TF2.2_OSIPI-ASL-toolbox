import Link from "next/link";

export function TableView({ kicker, title, headers, rows, description, actionLabel, actionHref }) {
  return (
    <section className="overview-card" style={{ padding: '40px' }}>
      <div className="panel-head" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div>
          <p className="panel-kicker">{kicker}</p>
          <h3>{title}</h3>
        </div>
      </div>
      <p className="inspector-helper">{description || "Review the current items below and continue to the next step."}</p>
      
      <div className="table-like">
        <div className="table-row head">
          {headers.map((header) => (
            <span key={header}>{header}</span>
          ))}
        </div>
        {rows.map((row, idx) => (
          <div className="table-row" key={idx}>
            {row.map((cell, cidx) => (
              <span key={cidx} style={cidx === 0 ? { fontWeight: 700 } : {}}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
      
      {actionLabel && actionHref ? (
        <div className="topbar" style={{ marginTop: '32px' }}>
          <div />
          <Link href={actionHref} className="button-link primary">{actionLabel}</Link>
        </div>
      ) : null}
    </section>
  );
}

