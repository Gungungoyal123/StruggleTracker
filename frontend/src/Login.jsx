import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [toast, setToast] = useState(null);

const showToast = (msg) => {
  setToast(msg);
  setTimeout(() => setToast(null), 3000);
};
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
     if (response.ok) {
  localStorage.setItem("mytoken", data.token);
  navigate("/dashboard");
} else {
  showToast(data.message);
}
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>⚡</div>
          <span style={styles.logoText}>StruggleTracker</span>
        </div>
        <p style={styles.tagline}>Track your struggles. Celebrate your wins.</p>
      </div>

      <div style={styles.centerBox}>
        <div style={styles.tabs}>
          <button style={{ ...styles.tab, ...styles.tabActive }}>Login</button>
          <button style={styles.tab} onClick={() => navigate("/signup")}>Sign Up</button>
        </div>

        <p style={styles.sub}>Welcome back 👋</p>

        <input placeholder="Email address" onChange={(e) => setEmail(e.target.value)} style={styles.input} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} style={styles.input} />

        <button style={styles.button} onClick={handleLogin}>Login</button>

        <p style={styles.link} onClick={() => navigate("/reset")}>Forgot your password?</p>
      </div>

      <div style={styles.bottomStrip}>
        <span>🔒 Secure & Private</span>
        <span>📈 Track Daily Progress</span>
        <span>🏆 Celebrate Wins</span>
      </div>
      {toast && (
  <div style={{
    position: "fixed", bottom: "28px", right: "28px",
    background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    color: "white", padding: "14px 20px", borderRadius: "14px",
    fontSize: "14px", fontWeight: "500",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    display: "flex", alignItems: "center", gap: "10px", maxWidth: "280px",
  }}>
    <span style={{ fontSize: "18px" }}>❌</span>
    {toast}
  </div>
)}
    </div>
  );
}

export default Login;

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #0f0c29, #302b63, #24243e)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "20px",
    gap: "24px",
  },
  topBar: { textAlign: "center" },
  logoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "6px",
  },
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
  logoText: { fontSize: "24px", fontWeight: "700", color: "white", letterSpacing: "-0.5px" },
  tagline: { color: "rgba(255,255,255,0.5)", fontSize: "13px", margin: 0 },
  centerBox: {
    background: "white",
    borderRadius: "20px",
    padding: "36px 32px",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  },
  tabs: {
    display: "flex",
    background: "#f0f2f5",
    borderRadius: "10px",
    padding: "4px",
    marginBottom: "16px",
  },
  tab: {
    flex: 1,
    padding: "9px",
    border: "none",
    background: "transparent",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#888",
  },
  tabActive: {
    background: "white",
    color: "#302b63",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  sub: { fontSize: "13px", color: "#888", marginBottom: "18px" },
  input: {
    width: "100%",
    padding: "11px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    marginBottom: "12px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    color: "#1a1a2e",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #6C5CE7, #302b63)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    marginTop: "4px",
  },
  link: { marginTop: "14px", cursor: "pointer", color: "#6C5CE7", fontSize: "13px", textAlign: "center" },
  bottomStrip: {
    display: "flex",
    gap: "24px",
    color: "rgba(255,255,255,0.4)",
    fontSize: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};
