import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProblemCard from "./ProblemCard";
import AddProblemModal from "./AddProblemModal";
import { MiniBarChart, MiniDonutChart, BarChartModal, DonutChartModal } from "./Charts";

const BASE_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("struggling");
  const [strugglingproblems, setstrugglingProblems] = useState([]);
  const [mastered, setmasteredproblems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBarModal, setShowBarModal] = useState(false);
  const [showDonutModal, setShowDonutModal] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchProblems();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("mytoken");
      const response = await fetch(`${BASE_URL}/user/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setUsername(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProblems = async () => {
    try {
      const token = localStorage.getItem("mytoken");
      const response = await fetch(`${BASE_URL}/user/getproblem/struggling`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response2 = await fetch(`${BASE_URL}/user/getproblem/mastered`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      const data2 = await response2.json();
      if (response.ok) setstrugglingProblems(data.data);
      if (response2.ok) setmasteredproblems(data2.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProblems = tab === "struggling" ? strugglingproblems : mastered;
  const todaysDue = strugglingproblems.slice(0, 3);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>⚡</div>
          <span style={styles.logoText}>StruggleTracker</span>
        </div>
        <div>
          <div style={styles.username}>Hello, {username} 👋</div>
          <div style={styles.date}>{today}</div>
        </div>
      </div>

      <div style={styles.mainLayout}>
        <div style={styles.leftSide}>
          <div style={styles.card}>
            <div style={styles.sectionTitle}>Today's due problems</div>
            <div style={styles.dueRow}>
              {todaysDue.length === 0 && (
                <span style={styles.emptyText}>No problems due today 🎉</span>
              )}
              {todaysDue.map((p) => (
                <div key={p._id} style={styles.duePill}>{p.title}</div>
              ))}
            </div>
          </div>

          <div style={styles.tabContainer}>
            <div style={styles.tabs}>
              <button
                style={{ ...styles.tab, ...(tab === "struggling" ? styles.tabActive : {}) }}
                onClick={() => setTab("struggling")}
              >
                Struggling
              </button>
              <button
                style={{ ...styles.tab, ...(tab === "mastered" ? styles.tabActive : {}) }}
                onClick={() => setTab("mastered")}
              >
                Mastered
              </button>
            </div>
          </div>

          <div style={styles.cardsList}>
            {filteredProblems.length === 0 && (
              <div style={styles.emptyState}>No problems here yet!</div>
            )}
            {filteredProblems.map((problem) => (
              <ProblemCard
                key={problem._id}
                problem={problem}
                onUpdate={fetchProblems}
              />
            ))}
          </div>
        </div>

        <div style={styles.rightSide}>
          <div style={styles.addButton} onClick={() => setShowAddModal(true)}>
            <div style={styles.addButtonTitle}>+ Add new struggle</div>
            <div style={styles.addButtonSub}>Log a problem you're stuck on</div>
          </div>

          <div style={styles.chartCard} onClick={() => setShowBarModal(true)}>
            <div style={styles.chartHeader}>
              <span style={styles.chartTitle}>Problems over time</span>
              <span style={styles.expandText}>expand</span>
            </div>
            <MiniBarChart problems={[...strugglingproblems, ...mastered]} />
          </div>

          <div style={styles.chartCard} onClick={() => setShowDonutModal(true)}>
            <div style={styles.chartHeader}>
              <span style={styles.chartTitle}>Struggling vs mastered</span>
              <span style={styles.expandText}>expand</span>
            </div>
            <MiniDonutChart problems={[...strugglingproblems, ...mastered]} />
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddProblemModal
          onClose={() => setShowAddModal(false)}
          onSave={() => { setShowAddModal(false); fetchProblems(); }}
        />
      )}
      {showBarModal && (
        <BarChartModal problems={[...strugglingproblems, ...mastered]} onClose={() => setShowBarModal(false)} />
      )}
      {showDonutModal && (
        <DonutChartModal problems={[...strugglingproblems, ...mastered]} onClose={() => setShowDonutModal(false)} />
      )}
    </div>
  );
}

export default Dashboard;

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #0f0c29, #302b63, #24243e)",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "24px",
  },
  topBar: {
    background: "white",
    borderRadius: "16px",
    padding: "14px 20px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  },
  logoRow: { display: "flex", alignItems: "center", gap: "8px" },
  logoIcon: {
    background: "#6C5CE7",
    borderRadius: "10px",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },
  logoText: { fontSize: "18px", fontWeight: "700", color: "#1a1a2e" },
  username: { fontSize: "15px", fontWeight: "600", color: "#1a1a2e" },
  date: { fontSize: "12px", color: "#888" },
  mainLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 280px",
    gap: "20px",
    alignItems: "start",
  },
  leftSide: { display: "flex", flexDirection: "column", gap: "16px" },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "16px 20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  sectionTitle: { fontSize: "14px", fontWeight: "600", color: "#1a1a2e", marginBottom: "10px" },
  dueRow: { display: "flex", gap: "8px", flexWrap: "wrap" },
  duePill: {
    padding: "5px 14px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "12px",
    color: "#555",
  },
  emptyText: { fontSize: "13px", color: "#aaa" },
  tabContainer: { display: "flex", justifyContent: "center" },
  tabs: {
    display: "flex",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "4px",
    gap: "4px",
  },
  tab: {
    padding: "9px 32px",
    border: "none",
    background: "transparent",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "rgba(255,255,255,0.6)",
  },
  tabActive: {
    background: "white",
    color: "#302b63",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  cardsList: { display: "flex", flexDirection: "column", gap: "12px" },
  emptyState: {
    background: "rgba(255,255,255,0.07)",
    borderRadius: "14px",
    padding: "30px",
    textAlign: "center",
    color: "rgba(255,255,255,0.4)",
    fontSize: "14px",
  },
  rightSide: { display: "flex", flexDirection: "column", gap: "14px" },
  addButton: {
    background: "white",
    borderRadius: "16px",
    padding: "16px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  addButtonTitle: { fontSize: "14px", fontWeight: "600", color: "#302b63" },
  addButtonSub: { fontSize: "11px", color: "#aaa", marginTop: "4px" },
  chartCard: {
    background: "white",
    borderRadius: "16px",
    padding: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  chartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  chartTitle: { fontSize: "13px", fontWeight: "600", color: "#1a1a2e" },
  expandText: { fontSize: "10px", color: "#aaa" },
};