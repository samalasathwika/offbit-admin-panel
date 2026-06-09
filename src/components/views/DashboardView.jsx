// src/components/views/DashboardView.jsx
import React from "react";
import { TYPE_META } from "../../data/requests";

const WEEKLY = [
  { day: "Mon", submitted: 3, resolved: 2 },
  { day: "Tue", submitted: 5, resolved: 4 },
  { day: "Wed", submitted: 2, resolved: 5 },
  { day: "Thu", submitted: 6, resolved: 3 },
  { day: "Fri", submitted: 4, resolved: 6 },
  { day: "Sat", submitted: 1, resolved: 2 },
  { day: "Sun", submitted: 2, resolved: 1 },
];

const MAX_VAL = 8;

export default function DashboardView({ requests }) {
  const pending  = requests.filter(r => r.status === "pending").length;
  const approved = requests.filter(r => r.status === "approved").length;
  const rejected = requests.filter(r => r.status === "rejected").length;
  const total    = requests.length;
  const resolveRate = total ? Math.round(((approved + rejected) / total) * 100) : 0;

  const byType = Object.entries(TYPE_META).map(([key, meta]) => ({
    key, ...meta,
    count: requests.filter(r => r.type === key).length,
  }));

  return (
    <div>
      <div style={s.header}>
        <div>
          <h1 style={s.heading}>Dashboard</h1>
          <p style={s.sub}>Overview of team request activity</p>
        </div>
        <div style={s.headerRight}>
          <span style={s.adminBadge}>Admin</span>
          <div style={s.adminAvatar}>SS</div>
        </div>
      </div>

      {/* Stat cards */}
      <div style={s.statGrid}>
        {[
          { label: "Total requests", value: total,       accent: "#111827" },
          { label: "Pending review", value: pending,     accent: "#B45309" },
          { label: "Approved",       value: approved,    accent: "#065F46" },
          { label: "Rejected",       value: rejected,    accent: "#991B1B" },
          { label: "Resolution rate",value: resolveRate + "%", accent: "#1A56DB" },
        ].map(c => (
          <div key={c.label} style={{ ...s.statCard, borderTop: `3px solid ${c.accent}` }}>
            <div style={s.statLabel}>{c.label}</div>
            <div style={{ ...s.statValue, color: c.accent }}>{c.value}</div>
          </div>
        ))}
      </div>

      <div style={s.twoCol}>
        {/* Bar chart */}
        <div style={s.card}>
          <div style={s.cardTitle}>Weekly activity</div>
          <div style={s.legend}>
            <span style={s.legendDot("#1A56DB")} /> Submitted &nbsp;
            <span style={s.legendDot("#10B981")} /> Resolved
          </div>
          <div style={s.chart}>
            {WEEKLY.map(w => (
              <div key={w.day} style={s.barGroup}>
                <div style={s.bars}>
                  <div style={{ ...s.bar, height: `${(w.submitted / MAX_VAL) * 100}%`, background: "#1A56DB" }} title={`Submitted: ${w.submitted}`} />
                  <div style={{ ...s.bar, height: `${(w.resolved  / MAX_VAL) * 100}%`, background: "#10B981" }} title={`Resolved: ${w.resolved}`} />
                </div>
                <div style={s.barLabel}>{w.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* By type */}
        <div style={s.card}>
          <div style={s.cardTitle}>Requests by type</div>
          <div style={{ marginTop: "16px" }}>
            {byType.map(t => (
              <div key={t.key} style={s.typeRow}>
                <span style={{ ...s.typeBadge, background: t.bg, color: t.color }}>
                  {t.icon} {t.label}
                </span>
                <div style={s.typeBar}>
                  <div style={{
                    height: "100%", borderRadius: "4px",
                    width: `${total ? (t.count / total) * 100 : 0}%`,
                    background: t.color, minWidth: t.count ? "4px" : "0",
                    transition: "width 0.4s ease",
                  }} />
                </div>
                <span style={s.typeCount}>{t.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div style={{ ...s.card, marginTop: "16px" }}>
        <div style={s.cardTitle}>Recent requests</div>
        <table style={s.table}>
          <thead>
            <tr>
              {["Name", "Type", "Team", "Status", "Submitted"].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requests.slice(0, 5).map(r => (
              <tr key={r.id} style={s.tr}>
                <td style={s.td}><strong>{r.name}</strong></td>
                <td style={s.td}>
                  <span style={{ ...s.typeBadge, background: TYPE_META[r.type].bg, color: TYPE_META[r.type].color, fontSize: "11px" }}>
                    {TYPE_META[r.type].label}
                  </span>
                </td>
                <td style={s.td}>{r.team}</td>
                <td style={s.td}>
                  <span style={{
                    ...s.statusDot,
                    background: r.status === "approved" ? "#D1FAE5" : r.status === "rejected" ? "#FEE2E2" : "#FEF3C7",
                    color: r.status === "approved" ? "#065F46" : r.status === "rejected" ? "#991B1B" : "#B45309",
                  }}>
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </span>
                </td>
                <td style={{ ...s.td, color: "#9CA3AF" }}>
                  {new Date(r.submittedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const s = {
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" },
  heading: { fontSize: "22px", fontWeight: 700, color: "#111827", margin: 0 },
  sub: { fontSize: "13px", color: "#9CA3AF", margin: "4px 0 0 0" },
  headerRight: { display: "flex", alignItems: "center", gap: "10px" },
  adminBadge: { fontSize: "11px", fontWeight: 600, color: "#1A56DB", background: "#EBF2FF", padding: "3px 10px", borderRadius: "20px" },
  adminAvatar: { width: "36px", height: "36px", borderRadius: "50%", background: "#1A56DB", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700 },
  statGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", marginBottom: "16px" },
  statCard: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "14px 16px" },
  statLabel: { fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "#9CA3AF", marginBottom: "4px" },
  statValue: { fontSize: "24px", fontWeight: 700 },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "20px" },
  cardTitle: { fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "4px" },
  legend: { fontSize: "12px", color: "#9CA3AF", marginBottom: "16px", display: "flex", alignItems: "center", gap: "4px" },
  legendDot: (c) => ({ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: c, marginRight: "4px" }),
  chart: { display: "flex", alignItems: "flex-end", gap: "8px", height: "120px" },
  barGroup: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%" },
  bars: { flex: 1, display: "flex", alignItems: "flex-end", gap: "2px", width: "100%" },
  bar: { flex: 1, borderRadius: "3px 3px 0 0", transition: "height 0.3s ease" },
  barLabel: { fontSize: "11px", color: "#9CA3AF" },
  typeRow: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" },
  typeBadge: { fontSize: "12px", fontWeight: 500, padding: "3px 10px", borderRadius: "20px", whiteSpace: "nowrap" },
  typeBar: { flex: 1, height: "6px", background: "#F3F4F6", borderRadius: "4px", overflow: "hidden" },
  typeCount: { fontSize: "13px", fontWeight: 600, color: "#374151", minWidth: "16px", textAlign: "right" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "12px" },
  th: { textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", padding: "8px 10px", borderBottom: "1px solid #F3F4F6" },
  tr: { borderBottom: "1px solid #F9FAFB" },
  td: { padding: "10px 10px", fontSize: "13px", color: "#374151" },
  statusDot: { fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "20px" },
};
