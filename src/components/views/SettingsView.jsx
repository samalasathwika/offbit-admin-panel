// src/components/views/SettingsView.jsx
import React, { useState } from "react";

export default function SettingsView() {
  const [notifications, setNotifications] = useState({
    emailOnApprove: true,
    emailOnReject: true,
    dailyDigest: false,
    slackAlerts: true,
  });
  const [profile, setProfile] = useState({
    name: "Samala Sathwika",
    email: "sathwika@offbit.io",
    role: "Admin",
    timezone: "Asia/Kolkata",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggle = (key) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div>
      <div style={s.header}>
        <div>
          <h1 style={s.heading}>Settings</h1>
          <p style={s.sub}>Manage your account and notification preferences</p>
        </div>
        <div style={s.headerRight}>
          <span style={s.adminBadge}>Admin</span>
          <div style={s.adminAvatar}>SS</div>
        </div>
      </div>

      {/* Profile */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Profile</div>
        <div style={s.sectionDesc}>Your account information visible to team members.</div>
        <div style={s.card}>
          <div style={s.profileTop}>
            <div style={s.avatar}>SS</div>
            <div>
              <div style={s.avatarName}>{profile.name}</div>
              <div style={s.avatarRole}>{profile.role} · {profile.email}</div>
            </div>
          </div>
          <div style={s.fields}>
            {[
              { label: "Full name",  key: "name",     type: "text" },
              { label: "Email",      key: "email",    type: "email" },
              { label: "Role",       key: "role",     type: "text", disabled: true },
              { label: "Timezone",   key: "timezone", type: "text" },
            ].map(f => (
              <div key={f.key} style={s.field}>
                <label style={s.label}>{f.label}</label>
                <input
                  type={f.type}
                  value={profile[f.key]}
                  disabled={f.disabled}
                  onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                  style={{ ...s.input, ...(f.disabled ? s.inputDisabled : {}) }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Notifications</div>
        <div style={s.sectionDesc}>Choose how you receive updates on workflow requests.</div>
        <div style={s.card}>
          {[
            { key: "emailOnApprove", label: "Email on approval",   desc: "Get notified when a request you submitted is approved" },
            { key: "emailOnReject",  label: "Email on rejection",   desc: "Get notified when a request is rejected" },
            { key: "dailyDigest",    label: "Daily digest",         desc: "Receive a daily summary of all pending requests" },
            { key: "slackAlerts",    label: "Slack alerts",         desc: "Send alerts to your connected Slack workspace" },
          ].map((item, i, arr) => (
            <div key={item.key} style={{ ...s.toggleRow, borderBottom: i < arr.length - 1 ? "1px solid #F3F4F6" : "none" }}>
              <div>
                <div style={s.toggleLabel}>{item.label}</div>
                <div style={s.toggleDesc}>{item.desc}</div>
              </div>
              <div
                style={{ ...s.toggle, background: notifications[item.key] ? "#1A56DB" : "#E5E7EB" }}
                onClick={() => toggle(item.key)}
              >
                <div style={{ ...s.toggleKnob, transform: notifications[item.key] ? "translateX(18px)" : "translateX(2px)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Access & security</div>
        <div style={s.sectionDesc}>Manage permissions and account access.</div>
        <div style={s.card}>
          {[
            { label: "Change password",       desc: "Update your login credentials",             btn: "Change",  danger: false },
            { label: "Two-factor authentication", desc: "Add an extra layer of security",        btn: "Enable",  danger: false },
            { label: "Revoke all sessions",   desc: "Log out of all devices immediately",        btn: "Revoke",  danger: true },
          ].map((item, i, arr) => (
            <div key={item.label} style={{ ...s.actionRow, borderBottom: i < arr.length - 1 ? "1px solid #F3F4F6" : "none" }}>
              <div>
                <div style={s.toggleLabel}>{item.label}</div>
                <div style={s.toggleDesc}>{item.desc}</div>
              </div>
              <button style={{ ...s.actionBtn, ...(item.danger ? s.actionBtnDanger : {}) }}>
                {item.btn}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save */}
      <div style={s.saveRow}>
        {saved && <span style={s.savedMsg}>✓ Changes saved</span>}
        <button style={s.saveBtn} onClick={handleSave}>Save changes</button>
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
  section: { marginBottom: "28px" },
  sectionTitle: { fontSize: "15px", fontWeight: 600, color: "#111827", marginBottom: "4px" },
  sectionDesc: { fontSize: "13px", color: "#9CA3AF", marginBottom: "12px" },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "20px" },
  profileTop: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #F3F4F6" },
  avatar: { width: "48px", height: "48px", borderRadius: "50%", background: "#DBEAFE", color: "#1E40AF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px" },
  avatarName: { fontSize: "15px", fontWeight: 600, color: "#111827" },
  avatarRole: { fontSize: "12px", color: "#9CA3AF", marginTop: "2px" },
  fields: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
  field: { display: "flex", flexDirection: "column", gap: "5px" },
  label: { fontSize: "12px", fontWeight: 500, color: "#374151" },
  input: { padding: "7px 12px", border: "1px solid #E5E7EB", borderRadius: "7px", fontSize: "13px", color: "#374151", outline: "none", background: "#fff" },
  inputDisabled: { background: "#F9FAFB", color: "#9CA3AF", cursor: "not-allowed" },
  toggleRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0" },
  toggleLabel: { fontSize: "13px", fontWeight: 500, color: "#111827", marginBottom: "2px" },
  toggleDesc: { fontSize: "12px", color: "#9CA3AF" },
  toggle: { width: "42px", height: "24px", borderRadius: "12px", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 },
  toggleKnob: { position: "absolute", top: "3px", width: "18px", height: "18px", borderRadius: "50%", background: "#fff", transition: "transform 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" },
  actionRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0" },
  actionBtn: { padding: "6px 16px", border: "1px solid #E5E7EB", borderRadius: "7px", background: "#fff", fontSize: "12px", fontWeight: 500, color: "#374151", cursor: "pointer" },
  actionBtnDanger: { border: "1px solid #FCA5A5", color: "#991B1B", background: "#FEF2F2" },
  saveRow: { display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "12px", paddingTop: "8px" },
  savedMsg: { fontSize: "13px", color: "#065F46", fontWeight: 500 },
  saveBtn: { padding: "8px 24px", background: "#111827", color: "#fff", border: "none", borderRadius: "7px", fontSize: "13px", fontWeight: 600, cursor: "pointer" },
};
