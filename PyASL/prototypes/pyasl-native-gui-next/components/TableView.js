export function TableView({ kicker, title, headers, rows }) {
  return (
    <section className="panel full-panel">
      <div className="panel-head">
        <div>
          <p className="panel-kicker">{kicker}</p>
          <h3>{title}</h3>
        </div>
      </div>
      <div className="table-like">
        <div className="table-row head">
          {headers.map((header) => (
            <span key={header}>{header}</span>
          ))}
        </div>
        {rows.map((row, idx) => (
          <div className="table-row" key={idx}>
            {row.map((cell) => (
              <span key={cell}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
