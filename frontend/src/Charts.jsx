const COLORS = ["#6C5CE7", "#00b09b", "#ff4b2b", "#f0a500", "#302b63", "#e17055"];

function getTagCounts(problems) {
  const tagCounts = {};
  problems.forEach((p) => {
    (p.tags || []).forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return tagCounts;
}

export function MiniBarChart({ problems }) {
  const tagCounts = getTagCounts(problems);
  const tags = Object.keys(tagCounts);
  const counts = Object.values(tagCounts);
  const max = Math.max(...counts, 1);

  if (tags.length === 0) return <div style={{ fontSize: "12px", color: "#aaa", textAlign: "center" }}>No data yet</div>;

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "80px" }}>
      {tags.map((tag, i) => (
        <div key={i} style={{ flex: 1, height: `${(counts[i] / max) * 100}%`, background: COLORS[i % COLORS.length], borderRadius: "3px 3px 0 0" }} />
      ))}
    </div>
  );
}

export function MiniDonutChart({ problems }) {
  const struggling = problems.filter((p) => p.masteryLevel === 0).length;
  const mastered = problems.filter((p) => p.masteryLevel === 1).length;
  const total = struggling + mastered || 1;
  const circumference = 2 * Math.PI * 30;
  const strokeDash = (struggling / total) * circumference;

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
      <svg width="70" height="70" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="30" fill="none" stroke="#f0f0f0" strokeWidth="14" />
        <circle cx="40" cy="40" r="30" fill="none" stroke="#6C5CE7" strokeWidth="14"
          strokeDasharray={`${strokeDash} ${circumference}`}
          transform="rotate(-90 40 40)" />
      </svg>
      <div>
        <div style={{ fontSize: "11px", color: "#888" }}>😤 Struggling ({struggling})</div>
        <div style={{ fontSize: "11px", color: "#888", marginTop: "6px" }}>✅ Mastered ({mastered})</div>
      </div>
    </div>
  );
}

export function BarChartModal({ problems, onClose }) {
  const tagCounts = getTagCounts(problems);
  const tags = Object.keys(tagCounts);
  const counts = Object.values(tagCounts);
  const max = Math.max(...counts, 1);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={onClose}>
      <div style={{ background: "white", borderRadius: "20px", padding: "28px", width: "75%", maxWidth: "600px" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <span style={{ fontSize: "16px", fontWeight: "600" }}>Problems by topic</span>
          <span style={{ cursor: "pointer" }} onClick={onClose}>✕</span>
        </div>
        {tags.length === 0 ? <div style={{ textAlign: "center", color: "#aaa" }}>No problems yet</div> : (
          <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "200px" }}>
            {tags.map((tag, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%" }}>
                <span style={{ fontSize: "11px", fontWeight: "600", color: COLORS[i % COLORS.length] }}>{counts[i]}</span>
                <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                  <div style={{ width: "100%", height: `${(counts[i] / max) * 100}%`, background: COLORS[i % COLORS.length], borderRadius: "4px 4px 0 0" }} />
                </div>
                <span style={{ fontSize: "10px", color: "#aaa" }}>{tag}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function DonutChartModal({ problems, onClose }) {
  const struggling = problems.filter((p) => p.masteryLevel === 0).length;
  const mastered = problems.filter((p) => p.masteryLevel === 1).length;
  const total = struggling + mastered || 1;
  const circumference = 2 * Math.PI * 30;
  const strokeDash = (struggling / total) * circumference;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={onClose}>
      <div style={{ background: "white", borderRadius: "20px", padding: "28px", width: "75%", maxWidth: "600px" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <span style={{ fontSize: "16px", fontWeight: "600" }}>Struggling vs Mastered</span>
          <span style={{ cursor: "pointer" }} onClick={onClose}>✕</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "40px", padding: "20px 0" }}>
          <svg width="140" height="140" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="30" fill="none" stroke="#f0f0f0" strokeWidth="14" />
            <circle cx="40" cy="40" r="30" fill="none" stroke="#6C5CE7" strokeWidth="14"
              strokeDasharray={`${strokeDash} ${circumference}`}
              transform="rotate(-90 40 40)" />
          </svg>
          <div>
            <div style={{ fontSize: "14px", color: "#555" }}>😤 Struggling — {struggling} ({Math.round((struggling / total) * 100)}%)</div>
            <div style={{ fontSize: "14px", color: "#555", marginTop: "10px" }}>✅ Mastered — {mastered} ({Math.round((mastered / total) * 100)}%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}