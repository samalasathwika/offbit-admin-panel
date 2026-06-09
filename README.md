# Offbit — Admin Workflow Panel

> Full Stack Internship Screening Task · Built by **Samala Sathwika**

A production-ready React application for reviewing, approving, and rejecting team requests — built as a screening submission for the Offbit Full Stack Developer Internship.

---

## Live Demo

> Clone and run locally (see below) or view the interactive prototype in the submission document.

---

## Features

| Feature | Details |
|---|---|
| Request types | Join, Leave, Role change, Access request |
| Actions | Approve / Reject per request (pending only) |
| Real-time stats | Live counts for Total / Pending / Approved / Rejected |
| Filtering | Filter by status: All, Pending, Approved, Rejected |
| Search | Filter by name, team, description, or request type |
| Audit log | Live sidebar log of all actions taken in the session |
| Priority badges | High / Medium / Low per request |
| Responsive cards | Avatar initials, type badge, team, relative timestamp |

---

## Architecture

```
src/
├── components/
│   ├── AdminPanel.jsx    # Root component — owns state + orchestration
│   ├── StatsBar.jsx      # Derived stats display (no separate state)
│   ├── RequestCard.jsx   # Individual request item with actions
│   └── AuditLog.jsx      # Session audit trail sidebar
├── data/
│   └── requests.js       # Mock data + type/status constants
├── utils/
│   └── helpers.js        # Initials, avatar color, time formatting
├── App.jsx
└── index.js
```

### Key design decisions

**1. Single flat state array**
All requests live in one `useState` array in `AdminPanel`. No prop drilling needed for 4 components — keeps state predictable and easy to lift to Redux/Zustand in production.

**2. Derived views at render time**
Filtering and search are computed from the master array on each render rather than stored as separate state. Avoids sync bugs where filtered lists diverge from the source of truth.

**3. Immutable updates**
`approve` and `reject` use `array.map()` to return new arrays — never mutate state directly. This pattern scales to any state manager.

**4. Audit log as append-only**
New entries are prepended (`[newEntry, ...prev]`) so the most recent action appears first. In production this would write to a backend audit table.

**5. Deterministic avatar colors**
Avatar background/text colors are derived from a hash of the user's name — consistent across re-renders without storing color in state.

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/samalasathwika/offbit-admin-panel
cd offbit-admin-panel

# Install dependencies
npm install

# Run locally
npm start
# → http://localhost:3000
```

**Requirements:** Node.js 16+, npm 8+

---

## What I'd add with more time

- **Backend API** — `GET /api/v1/requests` and `PATCH /api/v1/requests/:id` (Node/Express or FastAPI)
- **Authentication** — JWT-based admin guard; role-based rendering
- **Bulk actions** — checkbox selection for bulk approve/reject
- **Persistent audit log** — write to a backend table, query by admin/date
- **Pagination** — for high-volume request queues
- **Email notifications** — trigger on approval/rejection via SendGrid or Resend
- **Optimistic UI** — update state immediately, rollback on API failure

---

## AI-First Development Workflow

This project was built using an AI-first workflow:

- **Claude** — architecture planning, data model design, component structure decisions
- **ChatGPT** — generating realistic mock data (names, descriptions, timestamps)
- **Cursor** — code completion and refactoring; every suggestion reviewed before accepting

AI tools accelerated development significantly while I retained full ownership of every architectural decision.

---

## Author

**Samala Sathwika**
B.Tech CSE · SR University · CGPA 9.018
samalasathwikaa@gmail.com · [GitHub](https://github.com/samalasathwika) · [LinkedIn](#)
