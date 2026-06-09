// src/components/RequestCard.jsx
// Renders a single request item with metadata, type badge, status badge,
// and approve/reject action buttons (shown only for pending requests).

import React from "react";
import { TYPE_META, AVATAR_COLORS } from "../data/requests";
import { getInitials, getAvatarColor, formatRelativeTime } from "../utils/helpers";

const STATUS_STYLES = {
  pending:  { bg: "#FEF3C7", color: "#B45309", label: "Pending" },
  approved: { bg: "#D1FAE5", color: "#065F46", label: "Approved" },
  rejected: { bg: "#FEE2E2", color: "#991B1B", label: "Rejected" },
};

const PRIORITY_STYLES = {
  high:   { bg: "#FEE2E2", color: "#991B1B" },
  medium: { bg: "#FEF3C7", color: "#92400E" },
  low:    { bg: "#F3F4F6", color: "#6B7280" },
};

export default function RequestCard({ request, onApprove, onReject }) {
  const { id, name, email, type, description, team, status, submittedAt, priority } = request;
  const typeMeta = TYPE_META[type];
  const statusStyle = STATUS_STYLES[status];
  const priorityStyle = PRIORITY_STYLES[priority];
  const avatarColor = getAvatarColor(name, AVATAR_COLORS);

  return (
    <div style={styles.card}>
      {/* Left accent bar by status */}
      <div style={{ ...styles.accent, background: statusStyle.color }} />

      <div style={styles.body}>
        {/* Avatar + identity */}
        <div style={styles.identity}>
          <div style={{ ...styles.avatar, background: avatarColor.bg, color: avatarColor.text }}>
            {getInitials(name)}
          </div>
          <div>
            <div style={styles.name}>{name}</div>
            <div style={styles.email}>{email}</div>
          </div>
        </div>

        {/* Description */}
        <p style={styles.description}>{description}</p>

        {/* Meta row */}
        <div style={styles.metaRow}>
          <span style={{ ...styles.badge, background: typeMeta.bg, color: typeMeta.color }}>
            {typeMeta.icon} {typeMeta.label}
          </span>
          <span style={styles.team}>{team}</span>
          <span style={{ ...styles.badge, background: priorityStyle.bg, color: priorityStyle.color, fontSize: "11px" }}>
            {priority} priority
          </span>
          <span style={styles.time}>{formatRelativeTime(submittedAt)}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <span style={{ ...styles.statusBadge, background: statusStyle.bg, color: statusStyle.color }}>
          {statusStyle.label}
        </span>

        {status === "pending" && (
          <div style={styles.buttons}>
            <button
              style={{ ...styles.btn, ...styles.btnApprove }}
              onClick={() => onApprove(id)}
              aria-label={`Approve request from ${name}`}
            >
              ✓ Approve
            </button>
            <button
              style={{ ...styles.btn, ...styles.btnReject }}
              onClick={() => onReject(id)}
              aria-label={`Reject request from ${name}`}
            >
              ✕ Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    alignItems: "stretch",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "10px",
    transition: "box-shadow 0.15s",
  },
  accent: {
    width: "4px",
    flexShrink: 0,
  },
  body: {
    flex: 1,
    padding: "16px 18px",
    minWidth: 0,
  },
  identity: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "13px",
    flexShrink: 0,
  },
  name: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#111827",
  },
  email: {
    fontSize: "12px",
    color: "#9CA3AF",
    marginTop: "1px",
  },
  description: {
    fontSize: "13px",
    color: "#374151",
    margin: "0 0 10px 0",
    lineHeight: 1.5,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  badge: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 500,
  },
  team: {
    fontSize: "12px",
    color: "#6B7280",
    background: "#F3F4F6",
    padding: "3px 10px",
    borderRadius: "20px",
  },
  time: {
    fontSize: "12px",
    color: "#9CA3AF",
    marginLeft: "auto",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: "10px",
    padding: "16px 18px",
    flexShrink: 0,
    borderLeft: "1px solid #F3F4F6",
  },
  statusBadge: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  btn: {
    padding: "6px 16px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    letterSpacing: "0.02em",
    transition: "opacity 0.15s",
  },
  btnApprove: {
    background: "#D1FAE5",
    color: "#065F46",
  },
  btnReject: {
    background: "#FEE2E2",
    color: "#991B1B",
  },
};
