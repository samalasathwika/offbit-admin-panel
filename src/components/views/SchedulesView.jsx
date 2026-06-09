// src/components/views/SchedulesView.jsx
import React, { useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const EVENTS = [
  { id: 1, title: "Engineering standup",   team: "Engineering", time: "9:00 AM",  duration: "30 min", type: "recurring", day: 1, color: "#1A56DB", bg: "#EBF2FF" },
  { id: 2, title: "Design review",          team: "Design",       time: "11:00 AM", duration: "1 hr",   type: "meeting",   day: 2, color: "#6D28D9", bg: "#EDE9FE" },
  { id: 3, title: "Product roadmap sync",   team: "Product",      time: "2:00 PM",  duration: "1 hr",   type: "meeting",   day: 3, color: "#065F46", bg: "#D1FAE5" },
  { id: 4, title: "QA handoff",             team: "QA",           time: "4:00 PM",  duration: "30 min", type: "recurring", day: 4, color: "#B45309", bg: "#FEF3C7" },
  { id: 5, title: "DevOps deployment",      team: "DevOps",       time: "6:00 PM",  duration: "2 hrs",  type: "scheduled", day: 5, color: "#991B1B", bg: "#FEE2E2" },
  { id: 6, title: "All-hands meeting",      team: "All teams",    time: "10:00 AM", duration: "1.5 hrs",type: "meeting",   day: 1, color: "#111827", bg: "#F3F4F6" },
  { id: 7, title: "Sprint planning",        team: "Engineering",  time: "3:00 PM",  duration: "2 hrs",  type: "recurring", day: 3, color: "#1A56DB", bg: "#EBF2FF" },
];

const LEAVE = [
  { name: "Rohan Verma",  team: "Design",       from: "Jun 10", to: "Jun 24", type: "Medical leave" },
  { name: "Divya Nair",   team: "Engineering",  from: "Jul 1",  to: "Sep 30", type: "Parental leave" },
];

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function SchedulesView() {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const cells = getCalendarDays(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  return (
    <div>
      <div style={s.header}>
        <div>
          <h1 style={s.heading}>Schedules</h1>
          <p style={s.sub}>Team meetings, events, and leave calendar</p>
        </div>
        <div style={s.headerRight}>
          <span style={s.adminBadge}>Admin</span>
          <div style={s.adminAvatar}>SS</div>
        </div>
      </div>

      <div style={s.layout}>
        {/* Calendar */}
        <div style={s.calCard}>
          <div style={s.calNav}>
            <button style={s.navBtn} onClick={prevMonth}>‹</button>
            <span style={s.monthLabel}>{MONTHS[viewMonth]} {viewYear}</span>
            <button style={s.navBtn} onClick={nextMonth}>›</button>
          </div>
          <div style={s.dayHeaders}>
            {DAYS.map(d => <div key={d} style={s.dayHeader}>{d}</div>)}
          </div>
          <div style={s.grid}>
            {cells.map((day, i) => {
              const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
              const hasEvent = day && EVENTS.some(e => e.day === (day % 7));
              return (
                <div key={i} style={{
                  ...s.cell,
                  ...(isToday ? s.cellToday : {}),
                  ...(day ? {} : s.cellEmpty),
                }}>
                  {day && <span style={{ fontSize: "13px", fontWeight: isToday ? 700 : 400 }}>{day}</span>}
                  {hasEvent && <div style={s.eventDot} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Upcoming events */}
          <div style={s.card}>
            <div style={s.cardTitle}>Upcoming events</div>
            <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {EVENTS.map(e => (
                <div key={e.id} style={{ ...s.eventRow, borderLeft: `3px solid ${e.color}` }}>
                  <div style={s.eventTitle}>{e.title}</div>
                  <div style={s.eventMeta}>
                    <span style={{ ...s.eventBadge, background: e.bg, color: e.color }}>{e.team}</span>
                    <span style={s.eventTime}>{e.time} · {e.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leave tracker */}
          <div style={s.card}>
            <div style={s.cardTitle}>Active leave</div>
            <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {LEAVE.map((l, i) => (
                <div key={i} style={s.leaveRow}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{l.name}</div>
                    <div style={{ fontSize: "12px", color: "#9CA3AF" }}>{l.type}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "12px", fontWeight: 500, color: "#374151" }}>{l.from} – {l.to}</div>
                    <div style={{ fontSize: "11px", background: "#FEF3C7", color: "#B45309", padding: "1px 8px", borderRadius: "20px", marginTop: "2px", display: "inline-block" }}>{l.team}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" },
  heading: { fontSize: "22px", fontWeight: 700, color: "#111827", margin: 0 },
  sub: { fontSize: "13px", color: "#9CA3AF", margin: "4px 0 0 0" },
  headerRight: { display: "flex", alignItems: "center", gap: "10px" },
  adminBadge: { fontSize: "11px", fontWeight: 600, color: "#1A56DB", background: "#EBF2FF", padding: "3px 10px", borderRadius: "20px" },
  adminAvatar: { width: "36px", height: "36px", borderRadius: "50%", background: "#1A56DB", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700 },
  layout: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", alignItems: "start" },
  calCard: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "20px" },
  calNav: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  navBtn: { background: "none", border: "1px solid #E5E7EB", borderRadius: "6px", width: "30px", height: "30px", cursor: "pointer", fontSize: "16px", color: "#374151", display: "flex", alignItems: "center", justifyContent: "center" },
  monthLabel: { fontSize: "14px", fontWeight: 600, color: "#111827" },
  dayHeaders: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "4px" },
  dayHeader: { textAlign: "center", fontSize: "11px", fontWeight: 600, color: "#9CA3AF", padding: "4px 0", textTransform: "uppercase" },
  grid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" },
  cell: { aspectRatio: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "6px", cursor: "pointer", color: "#374151", position: "relative", gap: "2px" },
  cellToday: { background: "#1A56DB", color: "#fff", fontWeight: 700 },
  cellEmpty: { cursor: "default" },
  eventDot: { width: "4px", height: "4px", borderRadius: "50%", background: "#10B981" },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "18px" },
  cardTitle: { fontSize: "14px", fontWeight: 600, color: "#111827" },
  eventRow: { padding: "8px 10px", background: "#F9FAFB", borderRadius: "6px" },
  eventTitle: { fontSize: "13px", fontWeight: 500, color: "#111827", marginBottom: "4px" },
  eventMeta: { display: "flex", alignItems: "center", gap: "8px" },
  eventBadge: { fontSize: "11px", fontWeight: 500, padding: "1px 8px", borderRadius: "20px" },
  eventTime: { fontSize: "11px", color: "#9CA3AF" },
  leaveRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #F3F4F6" },
};
