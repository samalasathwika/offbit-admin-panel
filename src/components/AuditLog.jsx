// src/components/AuditLog.jsx
// Displays a real-time audit trail of admin actions taken in this session.
// In a production system, this would be persisted to a backend audit table.

import React from "react";
import { formatAuditTime } from "../utils/helpers";

export default function AuditLog({ entries }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.dot} />
        <span style={styles.title}>Activity log</span>
        <span style={styles.live}>LIVE</span>
      </div>

      {entries.length === 0 ? (
        <div style={styles.empty}>
          No actions yet. Approve or reject a request to see the log.
        </div>
      ) : (
        <div style={styles.list}>
          {entries.map((entry) => (
            <div key={entry.id} style={styles.entry}>
              <div
                style={{
                  ...styles.entryDot,
                  background: entry.action === "approved" ? "#10B981" : "#EF4444",
                }}
              />
              <div style={styles.entryBody}>
                <span style={styles.entryAction}>
                  {entry.action === "approved" ? "✓ Approved" : "✕ Rejected"}
                </span>
                <span style={styles.entryName}>{entry.name}</span>
                <div style={styles.entryType}>{entry.typeLabel}</div>
                <div style={styles.entryTime}>{formatAuditTime(entry.timestamp)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: "#0F172A",
    borderRadius: "12px",
    padding: "20px",
    height: "100%",
    minHeight: "300px",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "20px",
    paddingBottom: "14px",
    borderBottom: "1px solid #1E293B",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#10B981",
    display: "inline-block",
    animation: "pulse 2s infinite",
  },
  title: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#F1F5F9",
    letterSpacing: "0.04em",
    flex: 1,
  },
  live: {
    fontSize: "10px",
    fontWeight: 700,
    color: "#10B981",
    background: "#022C22",
    padding: "2px 8px",
    borderRadius: "4px",
    letterSpacing: "0.08em",
  },
  empty: {
    fontSize: "12px",
    color: "#475569",
    lineHeight: 1.6,
    padding: "12px 0",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  entry: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },
  entryDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    flexShrink: 0,
    marginTop: "4px",
  },
  entryBody: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    minWidth: 0,
  },
  entryAction: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#E2E8F0",
  },
  entryName: {
    fontSize: "12px",
    color: "#94A3B8",
    marginLeft: "4px",
  },
  entryType: {
    fontSize: "11px",
    color: "#475569",
    marginTop: "1px",
  },
  entryTime: {
    fontSize: "11px",
    color: "#334155",
    marginTop: "2px",
  },
};
