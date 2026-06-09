// src/utils/helpers.js

/**
 * Returns initials from a full name string.
 * e.g. "Arjun Mehta" -> "AM"
 */
export function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

/**
 * Returns a deterministic avatar color object based on a string seed.
 * Keeps avatars consistent across re-renders.
 */
export function getAvatarColor(seed, colors) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

/**
 * Formats an ISO timestamp into a human-readable relative string.
 * e.g. "2025-06-06T09:14:00Z" -> "2 hours ago"
 */
export function formatRelativeTime(isoString) {
  const now = new Date();
  const date = new Date(isoString);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "yesterday";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

/**
 * Returns a formatted timestamp for the audit log.
 * e.g. "Jun 6, 11:42 AM"
 */
export function formatAuditTime(date = new Date()) {
  return date.toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
