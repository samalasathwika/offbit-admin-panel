// src/data/requests.js
// Mock dataset representing pending team requests in the Offbit platform.
// In production, this would be fetched from a REST API: GET /api/v1/requests

export const REQUEST_TYPES = {
  JOIN: "join",
  LEAVE: "leave",
  ROLE: "role",
  ACCESS: "access",
};

export const STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const TYPE_META = {
  join:   { label: "Join request",     icon: "👤", color: "#1A56DB", bg: "#EBF2FF" },
  leave:  { label: "Leave request",    icon: "📅", color: "#B45309", bg: "#FEF3C7" },
  role:   { label: "Role change",      icon: "🛡",  color: "#6D28D9", bg: "#EDE9FE" },
  access: { label: "Access request",   icon: "🔑", color: "#065F46", bg: "#D1FAE5" },
};

export const AVATAR_COLORS = [
  { bg: "#DBEAFE", text: "#1E40AF" },
  { bg: "#D1FAE5", text: "#065F46" },
  { bg: "#EDE9FE", text: "#5B21B6" },
  { bg: "#FEE2E2", text: "#991B1B" },
  { bg: "#FEF3C7", text: "#92400E" },
];

export const initialRequests = [
  {
    id: "req-001",
    name: "Arjun Mehta",
    email: "arjun.mehta@gmail.com",
    type: "join",
    description: "Requesting to join the Backend Engineering squad",
    team: "Engineering",
    status: "pending",
    submittedAt: "2025-06-06T09:14:00Z",
    priority: "high",
  },
  {
    id: "req-002",
    name: "Priya Singh",
    email: "priya.singh@gmail.com",
    type: "role",
    description: "Promotion request: Developer → Senior Developer",
    team: "Product",
    status: "pending",
    submittedAt: "2025-06-06T10:02:00Z",
    priority: "medium",
  },
  {
    id: "req-003",
    name: "Rohan Verma",
    email: "rohan.verma@gmail.com",
    type: "leave",
    description: "Medical leave request — 2 weeks starting June 10",
    team: "Design",
    status: "pending",
    submittedAt: "2025-06-06T11:30:00Z",
    priority: "high",
  },
  {
    id: "req-004",
    name: "Kavya Reddy",
    email: "kavya.reddy@gmail.com",
    type: "access",
    description: "Requesting read access to production database for QA audit",
    team: "QA",
    status: "approved",
    submittedAt: "2025-06-05T14:22:00Z",
    priority: "low",
  },
  {
    id: "req-005",
    name: "Nikhil Sharma",
    email: "nikhil.sharma@gmail.com",
    type: "join",
    description: "Applying to join the Frontend squad as a React developer",
    team: "Engineering",
    status: "approved",
    submittedAt: "2025-06-05T16:45:00Z",
    priority: "medium",
  },
  {
    id: "req-006",
    name: "Sneha Patel",
    email: "sneha.patel@gmail.com",
    type: "access",
    description: "Staging server SSH access for deployment automation",
    team: "DevOps",
    status: "rejected",
    submittedAt: "2025-06-04T09:00:00Z",
    priority: "medium",
  },
  {
    id: "req-007",
    name: "Aditya Kumar",
    email: "aditya.kumar@gmail.com",
    type: "role",
    description: "Change from Viewer to Editor role in Admin Dashboard",
    team: "Operations",
    status: "rejected",
    submittedAt: "2025-06-04T13:17:00Z",
    priority: "low",
  },
  {
    id: "req-008",
    name: "Divya Nair",
    email: "divya.nair@gmail.com",
    type: "leave",
    description: "Parental leave — 3 months from July 1",
    team: "Engineering",
    status: "pending",
    submittedAt: "2025-06-06T08:55:00Z",
    priority: "high",
  },
];
