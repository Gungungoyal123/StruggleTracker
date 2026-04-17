import { useState } from "react";

function ProblemCard({ problem, onUpdate }) {
  const [masteryLevel, setMasteryLevel] = useState(problem.masteryLevel);

  const markasmastered = async () => {
    try {
      const token = localStorage.getItem("mytoken");
      await fetch(`http://localhost:8000/user/markasmastered/${problem._id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setMasteryLevel(1);
      onUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  const deleteproblem = async () => {
    try {
      const token = localStorage.getItem("mytoken");
      await fetch(`http://localhost:8000/user/deleteproblem/${problem._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  const markasstruggling = async () => {
    try {
      const token = localStorage.getItem("mytoken");
      await fetch(`http://localhost:8000/user/markasstruggling/${problem._id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setMasteryLevel(0);
      onUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={styles.card}>
      <div style={styles.info}>
        <a href={problem.link} target="_blank" rel="noreferrer" style={styles.title}>
          {problem.title}
        </a>
        <div style={styles.meta}>{problem.level}</div>
        <div style={styles.log}>{problem.logs.join(", ")}</div>
        {problem.description && (
          <div style={styles.description}>{problem.description}</div>
        )}
      </div>

      <div style={styles.buttons}>
        <button
          style={{ ...styles.btn, ...(masteryLevel === 0 ? styles.btnActiveRed : {}) }}
          onClick={markasstruggling}
        >
          Struggling
        </button>
        <button
          style={{ ...styles.btn, ...(masteryLevel === 1 ? styles.btnActiveGreen : {}) }}
          onClick={markasmastered}
        >
          Mastered
        </button>
        <button
          style={{ ...styles.btn, ...styles.btnDelete }}
          onClick={deleteproblem}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default ProblemCard;

const styles = {
  card: {
    background: "white",
    borderRadius: "14px",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  description: { fontSize: "12px", color: "#6C5CE7", marginTop: "6px", fontStyle: "italic" },
  info: { flex: 1 },
  title: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a1a2e",
    textDecoration: "none",
    display: "block",
    marginBottom: "4px",
  },
  meta: { fontSize: "11px", color: "#888", marginBottom: "8px" },
  log: { fontSize: "12px", color: "#aaa" },
  buttons: { display: "flex", gap: "8px", flexShrink: 0 },
  btn: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "white",
    fontSize: "12px",
    fontWeight: "500",
    color: "#555",
    cursor: "pointer",
  },
  btnActiveRed: { background: "#fff0f0", borderColor: "#ff4b2b", color: "#ff4b2b" },
  btnActiveGreen: { background: "#f0fff4", borderColor: "#00b09b", color: "#00b09b" },
  btnDelete: { borderColor: "#ff4b2b", color: "#ff4b2b" },
};