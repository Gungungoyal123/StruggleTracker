import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/user/signup`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/");
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
          <button style={styles.tab} onClick={() => navigate("/")}>Login</button>
          <button style={{ ...styles.tab, ...styles.tabActive }}>Sign Up</button>
        </div>

        <p style={styles.sub}>Start your journey today 🚀</p>

        <input placeholder="Full Name" onChange={(e) => setName(e.target.value)} style={styles.input} />
        <input placeholder="Email address" onChange={(e) => setEmail(e.target.value)} style={styles.input} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} style={styles.input} />
        <input placeholder="Confirm Password" type="password" style={styles.input} />

        <button style={styles.button} onClick={handleSignup}>Create Account</button>
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

export default Signup;

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