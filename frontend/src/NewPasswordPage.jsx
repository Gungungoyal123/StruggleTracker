import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewPasswordPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
        <div style={styles.iconCircle}>🔐</div>
        <h2 style={styles.title}>Set New Password</h2>
        <p style={styles.sub}>Your new password must be different from the previous one.</p>

        <div style={styles.inputWrap}>
          <input placeholder="New Password" type={show ? "text" : "password"} style={styles.input} />
          <span style={styles.eye} onClick={() => setShow(p => !p)}>{show ? "🙈" : "👁️"}</span>
        </div>

        <div style={styles.inputWrap}>
          <input placeholder="Confirm New Password" type={showConfirm ? "text" : "password"} style={styles.input} />
          <span style={styles.eye} onClick={() => setShowConfirm(p => !p)}>{showConfirm ? "🙈" : "👁️"}</span>
        </div>

        <button style={styles.button} onClick={() => navigate("/")}>
          Reset Password
        </button>

        <p style={styles.link} onClick={() => navigate("/")}>← Back to Login</p>
      </div>

      <div style={styles.bottomStrip}>
        <span>🔒 Secure & Private</span>
        <span>📈 Track Daily Progress</span>
        <span>🏆 Celebrate Wins</span>
      </div>
    </div>
  );
}

export default NewPasswordPage;

const styles = {
  container: { minHeight: "100vh", background: "linear-gradient(160deg, #0f0c29, #302b63, #24243e)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: "20px", gap: "24px" },
  topBar: { textAlign: "center" },
  logoRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "6px" },
  logoIcon: { background: "#6C5CE7", borderRadius: "10px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" },
  logoText: { fontSize: "24px", fontWeight: "700", color: "white", letterSpacing: "-0.5px" },
  tagline: { color: "rgba(255,255,255,0.5)", fontSize: "13px", margin: 0 },
  centerBox: { background: "white", borderRadius: "20px", padding: "36px 32px", width: "100%", maxWidth: "380px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", textAlign: "center" },
  iconCircle: { fontSize: "40px", marginBottom: "12px" },
  title: { fontSize: "20px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px" },
  sub: { fontSize: "13px", color: "#888", marginBottom: "20px", lineHeight: "1.6" },
  inputWrap: { position: "relative", marginBottom: "12px" },
  input: { width: "100%", padding: "11px 40px 11px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box", color: "#1a1a2e" },
  eye: { position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: "16px" },
  button: { width: "100%", padding: "12px", background: "linear-gradient(135deg, #6C5CE7, #302b63)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "15px", fontWeight: "600", marginTop: "4px" },
  link: { marginTop: "14px", fontSize: "13px", color: "#888", cursor: "pointer" },
  bottomStrip: { display: "flex", gap: "24px", color: "rgba(255,255,255,0.4)", fontSize: "12px", flexWrap: "wrap", justifyContent: "center" },
};