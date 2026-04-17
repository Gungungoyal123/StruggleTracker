import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

function OtpPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const location = useLocation();
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const email = location.state?.email;

  const handleotp = async (e) => {
    e.preventDefault();
    const datato = {
      email: email,
      otp: otp.join("")
    };
    try {
      const response = await fetch(`${BASE_URL}/user/reset/verify`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(datato),
      });
      const data = await response.json();
      if (data.success) {
        navigate("/newpassword", { state: { email: email } });
      } else {
        showToast(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
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
        <div style={styles.iconCircle}>📩</div>
        <h2 style={styles.title}>Enter OTP</h2>
        <p style={styles.sub}>We sent a 6-digit code to your email. Please enter it below.</p>

        <div style={styles.otpRow}>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={styles.otpBox}
            />
          ))}
        </div>

        <button style={styles.button} onClick={handleotp}>
          Verify OTP
        </button>

        <p style={styles.link}>Didn't receive the code? <span style={styles.resend}>Resend</span></p>
        <p style={styles.link} onClick={() => navigate("/")}>← Back to Login</p>
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

export default OtpPage;

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
  sub: { fontSize: "13px", color: "#888", marginBottom: "24px", lineHeight: "1.6" },
  otpRow: { display: "flex", gap: "10px", justifyContent: "center", marginBottom: "24px" },
  otpBox: { width: "46px", height: "52px", borderRadius: "10px", border: "1px solid #e5e7eb", textAlign: "center", fontSize: "20px", fontWeight: "700", color: "#302b63", outline: "none", boxSizing: "border-box" },
  button: { width: "100%", padding: "12px", background: "linear-gradient(135deg, #6C5CE7, #302b63)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "15px", fontWeight: "600" },
  link: { marginTop: "14px", fontSize: "13px", color: "#888", cursor: "pointer" },
  resend: { color: "#6C5CE7", fontWeight: "600", cursor: "pointer" },
  bottomStrip: { display: "flex", gap: "24px", color: "rgba(255,255,255,0.4)", fontSize: "12px", flexWrap: "wrap", justifyContent: "center" },
};