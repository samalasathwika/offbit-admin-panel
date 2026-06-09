// src/components/StatsBar.jsx
// Displays a summary row of request counts by status.
// Counts are derived from the master requests array (single source of truth).

import React from "react";

export default function StatsBar({ requests }) {
  const total = requests.length;
  const pending = requests.filter((r) => r.status === "pending").length;
  const approved = requests.filter((r) => r.status === "approved").length;
  const rejected = requests.filter((r) => r.status === "rejected").length;

  const stats = [
    { label: "Total", value: total, color: "#374151", accent: "#E5E7EB" },
    { label: "Pending", value: pending, color: "#B45309", accent: "#FEF3C7" },
    { label: "Approved", value: approved, color: "#065F46", accent: "#D1FAE5" },
    { label: "Rejected", value: rejected, color: "#991B1B", accent: "#FEE2E2" },
  ];

  return (
    <div style={styles.grid}>
      {stats.map((s) => (
        <div key={s.label} style={{ ...styles.card, borderTop: `3px solid ${s.color}` }}>
          <span style={styles.label}>{s.label}</span>
          <span style={{ ...styles.value, color: s.color }}>{s.value}</span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
    marginBottom: "24px",
  },
  card: {
    background: "#fff",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
    padding: "16px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  label: {
    fontSize: "12px",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#9CA3AF",
  },
  value: {
    fontSize: "28px",
    fontWeight: 700,
    lineHeight: 1.1,
    fontVariantNumeric: "tabular-nums",
  },
};
