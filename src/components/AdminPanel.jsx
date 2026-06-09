// src/components/AdminPanel.jsx
// Root panel component. Owns the master requests state and audit log.
// Passes down derived data to StatsBar, RequestCard list, and AuditLog.

import React, { useState, useCallback } from "react";
import { initialRequests, TYPE_META } from "../data/requests";
import StatsBar from "./StatsBar";
import RequestCard from "./RequestCard";
import AuditLog from "./AuditLog";

const FILTERS = [
  { key: "all",      label: "All" },
  { key: "pending",  label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

export default function AdminPanel() {
  const [requests, setRequests] = useState(initialRequests);
  const [auditLog, setAuditLog] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Immutable status update — returns a new array, never mutates state directly.
  const updateStatus = useCallback((id, action) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );

    const request = requests.find((r) => r.id === id);
    if (request) {
      setAuditLog((prev) => [
        {
          id: `${id}-${Date.now()}`,
          name: request.name,
          action,
          typeLabel: TYPE_META[request.type].label,
          timestamp: new Date(),
        },
        ...prev,
      ]);
    }
  }, [requests]);

  const handleApprove = useCallback((id) => updateStatus(id, "approved"), [updateStatus]);
  const handleReject  = useCallback((id) => updateStatus(id, "rejected"),  [updateStatus]);

  // Derived filtered + searched list — computed at render time, no separate state.
  const visible = requests.filter((r) => {
    const matchesFilter = activeFilter === "all" || r.status === activeFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.team.toLowerCase().includes(q) ||
      TYPE_META[r.type].label.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={styles.page}>
      {/* ── Sidebar ── */}
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <span style={styles.brandMark}>O</span>
          <span style={styles.brandName}>Offbit</span>
        </div>
        <nav style={styles.nav}>
          {["Dashboard", "Requests", "Members", "Schedules", "Settings"].map((item, i) => (
            <div
              key={item}
              style={{
                ...styles.navItem,
                ...(item === "Requests" ? styles.navItemActive : {}),
              }}
            >
              {item}
            </div>
          ))}
        </nav>
        <div style={styles.auditWrapper}>
          <AuditLog entries={auditLog} />
        </div>
      </aside>

      {/* ── Main content ── */}
      <main style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>Workflow requests</h1>
            <p style={styles.subheading}>Review and act on pending team requests</p>
          </div>
          <div style={styles.headerRight}>
            <span style={styles.adminBadge}>Admin</span>
            <div style={styles.adminAvatar}>SS</div>
          </div>
        </div>

        {/* Stats */}
        <StatsBar requests={requests} />

        {/* Filter bar */}
        <div style={styles.filterBar}>
          <div style={styles.filters}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                style={{
                  ...styles.filterBtn,
                  ...(activeFilter === f.key ? styles.filterBtnActive : {}),
                }}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
                <span style={{
                  ...styles.filterCount,
                  ...(activeFilter === f.key ? styles.filterCountActive : {}),
                }}>
                  {f.key === "all"
                    ? requests.length
                    : requests.filter((r) => r.status === f.key).length}
                </span>
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search by name, team, or type…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Request list */}
        <div style={styles.list}>
          {visible.length === 0 ? (
            <div style={styles.empty}>
              <div style={styles.emptyIcon}>📭</div>
              <div style={styles.emptyText}>No requests match your filter</div>
              <div style={styles.emptyHint}>Try adjusting the filter or search query</div>
            </div>
          ) : (
            visible.map((req) => (
              <RequestCard
                key={req.id}
                request={req}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#F9FAFB",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  sidebar: {
    width: "220px",
    background: "#0F172A",
    display: "flex",
    flexDirection: "column",
    padding: "24px 16px",
    gap: "32px",
    flexShrink: 0,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  brandMark: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "#1A56DB",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: "16px",
  },
  brandName: {
    color: "#F1F5F9",
    fontWeight: 700,
    fontSize: "16px",
    letterSpacing: "0.02em",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  navItem: {
    padding: "8px 12px",
    borderRadius: "7px",
    fontSize: "13px",
    color: "#64748B",
    cursor: "pointer",
    fontWeight: 500,
  },
  navItemActive: {
    background: "#1E293B",
    color: "#F1F5F9",
  },
  auditWrapper: {
    flex: 1,
    overflow: "hidden",
  },
  main: {
    flex: 1,
    padding: "32px 36px",
    maxWidth: "900px",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "28px",
  },
  heading: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#111827",
    margin: 0,
  },
  subheading: {
    fontSize: "13px",
    color: "#9CA3AF",
    margin: "4px 0 0 0",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  adminBadge: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#1A56DB",
    background: "#EBF2FF",
    padding: "3px 10px",
    borderRadius: "20px",
    letterSpacing: "0.04em",
  },
  adminAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#1A56DB",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 700,
  },
  filterBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    gap: "16px",
    flexWrap: "wrap",
  },
  filters: {
    display: "flex",
    gap: "6px",
  },
  filterBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "7px",
    border: "1px solid #E5E7EB",
    background: "#fff",
    fontSize: "13px",
    fontWeight: 500,
    color: "#6B7280",
    cursor: "pointer",
  },
  filterBtnActive: {
    background: "#111827",
    color: "#fff",
    border: "1px solid #111827",
  },
  filterCount: {
    fontSize: "11px",
    background: "#F3F4F6",
    color: "#6B7280",
    padding: "1px 7px",
    borderRadius: "20px",
    fontWeight: 600,
  },
  filterCountActive: {
    background: "#374151",
    color: "#E5E7EB",
  },
  searchInput: {
    padding: "7px 14px",
    border: "1px solid #E5E7EB",
    borderRadius: "7px",
    fontSize: "13px",
    color: "#374151",
    width: "260px",
    outline: "none",
    background: "#fff",
  },
  list: {
    display: "flex",
    flexDirection: "column",
  },
  empty: {
    textAlign: "center",
    padding: "48px 24px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
  },
  emptyIcon: {
    fontSize: "32px",
    marginBottom: "12px",
  },
  emptyText: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "4px",
  },
  emptyHint: {
    fontSize: "13px",
    color: "#9CA3AF",
  },
};
