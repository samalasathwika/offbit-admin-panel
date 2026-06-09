// src/components/views/MembersView.jsx
import React, { useState } from "react";

const MEMBERS = [
  { id: 1, name: "Samala Sathwika", email: "sathwika@offbit.io", role: "Admin", team: "Engineering", status: "active", joined: "2024-01-10", avatar: "SS" },
  { id: 2, name: "Arjun Mehta",     email: "arjun@offbit.io",    role: "Developer", team: "Engineering", status: "active", joined: "2024-02-14", avatar: "AM" },
  { id: 3, name: "Priya Singh",     email: "priya@offbit.io",    role: "Senior Developer", team: "Product", status: "active", joined: "2023-11-01", avatar: "PS" },
  { id: 4, name: "Rohan Verma",     email: "rohan@offbit.io",    role: "Designer", team: "Design", status: "on-leave", joined: "2024-03-05", avatar: "RV" },
  { id: 5, name: "Kavya Reddy",     email: "kavya@offbit.io",    role: "QA Engineer", team: "QA", status: "active", joined: "2024-04-20", avatar: "KR" },
  { id: 6, name: "Nikhil Sharma",   email: "nikhil@offbit.io",   role: "Frontend Developer", team: "Engineering", status: "active", joined: "2024-05-15", avatar: "NS" },
  { id: 7, name: "Sneha Patel",     email: "sneha@offbit.io",    role: "DevOps Engineer", team: "DevOps", status: "active", joined: "2023-09-22", avatar: "SP" },
  { id: 8, name: "Aditya Kumar",    email: "aditya@offbit.io",   role: "Operations Lead", team: "Operations", status: "inactive", joined: "2023-07-11", avatar: "AK" },
  { id: 9, name: "Divya Nair",      email: "divya@offbit.io",    role: "Backend Developer", team: "Engineering", status: "on-leave", joined: "2024-01-28", avatar: "DN" },
];

const AVATAR_COLORS = {
  SS: { bg: "#DBEAFE", text: "#1E40AF" }, AM: { bg: "#D1FAE5", text: "#065F46" },
  PS: { bg: "#EDE9FE", text: "#5B21B6" }, RV: { bg: "#FEE2E2", text: "#991B1B" },
  KR: { bg: "#FEF3C7", text: "#92400E" }, NS: { bg: "#DBEAFE", text: "#1E40AF" },
  SP: { bg: "#D1FAE5", text: "#065F46" }, AK: { bg: "#F3F4F6", text: "#374151" },
  DN: { bg: "#EDE9FE", text: "#5B21B6" },
};

const STATUS_STYLE = {
  active:   { bg: "#D1FAE5", color: "#065F46", label: "Active" },
  inactive: { bg: "#F3F4F6", color: "#6B7280", label: "Inactive" },
  "on-leave": { bg: "#FEF3C7", color: "#B45309", label: "On leave" },
};

const ROLES = ["All roles", "Admin", "Developer", "Senior Developer", "Designer", "QA Engineer", "Frontend Developer", "DevOps Engineer", "Operations Lead", "Backend Developer"];

export default function MembersView() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All roles");

  const visible = MEMBERS.filter(m => {
    const q = search.toLowerCase();
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.team.toLowerCase().includes(q) || m.email.toLowerCase().includes(q);
    const matchRole = roleFilter === "All roles" || m.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div>
      <div style={s.header}>
        <div>
          <h1 style={s.heading}>Members</h1>
          <p style={s.sub}>{MEMBERS.length} team members across {[...new Set(MEMBERS.map(m => m.team))].length} teams</p>
        </div>
        <div style={s.headerRight}>
          <span style={s.adminBadge}>Admin</span>
          <div style={s.adminAvatar}>SS</div>
        </div>
      </div>

      {/* Summary pills */}
      <div style={s.pillRow}>
        {Object.entries(STATUS_STYLE).map(([key, val]) => (
          <div key={key} style={{ ...s.pill, background: val.bg, color: val.color }}>
            {MEMBERS.filter(m => m.status === key).length} {val.label}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={s.filterBar}>
        <input
          type="text"
          placeholder="Search by name, team, or email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={s.searchInput}
        />
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={s.select}>
          {ROLES.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>

      {/* Members grid */}
      <div style={s.grid}>
        {visible.map(m => {
          const av = AVATAR_COLORS[m.avatar] || { bg: "#F3F4F6", text: "#374151" };
          const st = STATUS_STYLE[m.status];
          return (
            <div key={m.id} style={s.card}>
              <div style={s.cardTop}>
                <div style={{ ...s.avatar, background: av.bg, color: av.text }}>{m.avatar}</div>
                <span style={{ ...s.statusBadge, background: st.bg, color: st.color }}>{st.label}</span>
              </div>
              <div style={s.name}>{m.name}</div>
              <div style={s.role}>{m.role}</div>
              <div style={s.email}>{m.email}</div>
              <div style={s.divider} />
              <div style={s.meta}>
                <span style={s.teamBadge}>{m.team}</span>
                <span style={s.joinDate}>Joined {new Date(m.joined).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
              </div>
            </div>
          );
        })}
        {visible.length === 0 && (
          <div style={s.empty}>No members match your search.</div>
        )}
      </div>
    </div>
  );
}

const s = {
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" },
  heading: { fontSize: "22px", fontWeight: 700, color: "#111827", margin: 0 },
  sub: { fontSize: "13px", color: "#9CA3AF", margin: "4px 0 0 0" },
  headerRight: { display: "flex", alignItems: "center", gap: "10px" },
  adminBadge: { fontSize: "11px", fontWeight: 600, color: "#1A56DB", background: "#EBF2FF", padding: "3px 10px", borderRadius: "20px" },
  adminAvatar: { width: "36px", height: "36px", borderRadius: "50%", background: "#1A56DB", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700 },
  pillRow: { display: "flex", gap: "8px", marginBottom: "16px" },
  pill: { fontSize: "12px", fontWeight: 600, padding: "4px 14px", borderRadius: "20px" },
  filterBar: { display: "flex", gap: "10px", marginBottom: "20px" },
  searchInput: { flex: 1, padding: "7px 14px", border: "1px solid #E5E7EB", borderRadius: "7px", fontSize: "13px", color: "#374151", outline: "none", background: "#fff" },
  select: { padding: "7px 14px", border: "1px solid #E5E7EB", borderRadius: "7px", fontSize: "13px", color: "#374151", background: "#fff", cursor: "pointer", outline: "none" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "18px" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" },
  avatar: { width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "13px" },
  statusBadge: { fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px" },
  name: { fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "2px" },
  role: { fontSize: "12px", color: "#6B7280", marginBottom: "2px" },
  email: { fontSize: "12px", color: "#9CA3AF", marginBottom: "12px" },
  divider: { height: "1px", background: "#F3F4F6", marginBottom: "10px" },
  meta: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  teamBadge: { fontSize: "11px", fontWeight: 500, background: "#F3F4F6", color: "#374151", padding: "2px 8px", borderRadius: "20px" },
  joinDate: { fontSize: "11px", color: "#9CA3AF" },
  empty: { gridColumn: "1/-1", textAlign: "center", padding: "40px", color: "#9CA3AF", fontSize: "14px" },
};
