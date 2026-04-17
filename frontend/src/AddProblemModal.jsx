import { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

const STUCK_OPTIONS = [
  "TLE",
  "MLE",
  "Integer Overflow",
  "Logic Error",
  "Corner Case Fail",
  "Off-By-One",
];

function AddProblemModal({ onClose, onSave }) {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [tags, settags] = useState([]);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [notes, setNotes] = useState("");

  const handleLinkChange = async (e) => {
    const value = e.target.value;
    setLink(value);
    try {
      const token = localStorage.getItem("mytoken");
      const response = await fetch(`${BASE_URL}/user/addproblem/extracturl`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url: value }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.title) setTitle(data.title);
        if (data.difficulty) setLevel(data.difficulty);
        if (data.tags) settags(data.tags);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleReason = (reason) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter((r) => r !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("mytoken");
      const response = await fetch(`${BASE_URL}/user/addproblem/addproblem`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          link,
          logs: selectedReasons,
          description: notes,
          level,
          title,
          tags,
        }),
      });
      if (response.ok) {
        onSave();
      } else {
        console.log("failed to add problem");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

        <div style={styles.header}>
          <div>
            <div style={styles.heading}>Log New Struggle</div>
            <div style={styles.subheading}>Paste the URL, tell us why, and get back to coding.</div>
          </div>
          <span style={styles.closeBtn} onClick={onClose}>✕</span>
        </div>

        <input
          style={styles.urlInput}
          placeholder="Paste LeetCode/Codeforces URL here..."
          value={link}
          onChange={handleLinkChange}
        />
        <div style={styles.urlHint}>(e.g., https://leetcode.com/problems/two-sum/)</div>

        <div style={styles.sectionTitle}>Problem Details</div>
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Title</label>
            <input
              style={styles.input}
              placeholder="e.g. Two Sum"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Difficulty</label>
            <select style={{ ...styles.input, color: level === "Easy" ? "#00b09b" : level === "Hard" ? "#ff4b2b" : "#f0a500" }} onChange={(e) => setLevel(e.target.value)}>
              <option value="">Select</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <div style={styles.sectionTitle}>Why are you stuck? <span style={styles.hint}>(click one or more)</span></div>
        <div style={styles.optionsGrid}>
          {STUCK_OPTIONS.map((reason) => (
            <div
              key={reason}
              style={{
                ...styles.optionBtn,
                ...(selectedReasons.includes(reason) ? styles.optionBtnActive : {}),
              }}
              onClick={() => toggleReason(reason)}
            >
              {selectedReasons.includes(reason) && <span style={styles.tick}>✓ </span>}
              {reason}
            </div>
          ))}
        </div>

        <div style={styles.sectionTitle}>Notes <span style={styles.hint}>(optional)</span></div>
        <textarea
          style={styles.textarea}
          placeholder="Write what you tried, what to check next time..."
          onChange={(e) => setNotes(e.target.value)}
        />

        <div style={styles.footer}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={styles.saveBtn} onClick={handleSave}>Save Struggle</button>
        </div>

      </div>
    </div>
  );
}

export default AddProblemModal;

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  modal: {
    background: "white",
    borderRadius: "20px",
    padding: "28px",
    width: "75%",
    maxWidth: "580px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "18px",
  },
  heading: { fontSize: "20px", fontWeight: "700", color: "#1a1a2e" },
  subheading: { fontSize: "13px", color: "#888", marginTop: "4px" },
  closeBtn: { cursor: "pointer", fontSize: "18px", color: "#888" },
  urlInput: {
    width: "100%",
    padding: "11px 14px",
    border: "2px solid #6C5CE7",
    borderRadius: "10px",
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box",
    color: "#1a1a2e",
    marginBottom: "6px",
  },
  urlHint: { fontSize: "11px", color: "#aaa", marginBottom: "18px" },
  sectionTitle: { fontSize: "14px", fontWeight: "600", color: "#1a1a2e", marginBottom: "10px" },
  hint: { fontSize: "12px", fontWeight: "400", color: "#aaa" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "18px" },
  field: {},
  label: { fontSize: "12px", color: "#888", display: "block", marginBottom: "5px" },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box",
    color: "#1a1a2e",
    background: "#f9f9f9",
  },
  optionsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "18px" },
  optionBtn: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    background: "#f9f9f9",
    fontSize: "13px",
    fontWeight: "500",
    color: "#555",
    cursor: "pointer",
    textAlign: "center",
  },
  optionBtnActive: { background: "#f0edff", border: "1px solid #6C5CE7", color: "#6C5CE7" },
  tick: { fontWeight: "700" },
  textarea: {
    width: "100%",
    padding: "11px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box",
    color: "#1a1a2e",
    height: "80px",
    resize: "none",
    marginBottom: "20px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  footer: { display: "flex", justifyContent: "flex-end", gap: "10px" },
  cancelBtn: {
    padding: "10px 22px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "white",
    fontSize: "13px",
    color: "#888",
    cursor: "pointer",
  },
  saveBtn: {
    padding: "10px 22px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #6C5CE7, #302b63)",
    color: "white",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },
};