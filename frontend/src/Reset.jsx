import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Reset() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (msg, color) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/user/reset", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
     if (data.success) {
  navigate("/otppage", { state: { email: email } });  // just navigate, no toast
} else {
  showToast(data.message, "error");  // only show red on failure
}
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.centerBox}>
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>⚡</div>
          <span style={styles.logoText}>StruggleTracker</span>
        </div>

        <h2 style={styles.title}>Forgot Password?</h2>
        <p style={styles.sub}>No worries, we'll send you a reset link.</p>

        <input placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} style={styles.input} />

        <button style={styles.button} onClick={handleReset}>Send Reset Link</button>

        <p style={styles.link} onClick={() => navigate("/")}>← Back to Login</p>
      </div>

      {toast && (
        <div style={{
          position: "fixed", bottom: "28px", right: "28px",
          background: toast.color === "success" ? "linear-gradient(135deg, #00b09b, #96c93d)" : "linear-gradient(135deg, #ff416c, #ff4b2b)",
          color: "white",
          padding: "14px 20px",
          borderRadius: "14px",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          maxWidth: "280px",
        }}>
          <span style={{ fontSize: "18px" }}>{toast.color === "success" ? "✅" : "❌"}</span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

export default Reset;

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
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
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
  logoText: { fontSize: "24px", fontWeight: "700", color: "#1a1a2e", letterSpacing: "-0.5px" },
  centerBox: {
    background: "white",
    borderRadius: "20px",
    padding: "36px 32px",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  },
  title: { fontSize: "20px", fontWeight: "700", color: "#1a1a2e", marginBottom: "6px" },
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
};
