export default function Badge({ type, children }) {
  const styles = {
    priority: {
      P1: "bg-red-100 text-ms-red border border-red-200 font-semibold",
      P2: "bg-amber-50 text-ms-amber border border-amber-200 font-semibold",
      P3: "bg-gray-100 text-gray-600 border border-gray-200 font-semibold",
    },
    status: {
      "In Progress": "bg-blue-50 text-ms-blue border border-blue-200",
      "Resolved":    "bg-green-50 text-ms-green border border-green-200",
      "Open":        "bg-gray-100 text-gray-600 border border-gray-200",
      "Escalated":   "bg-red-50 text-ms-red border border-red-200",
    },
    channel: {
      email:  "bg-blue-50 text-ms-blue border border-blue-200",
      chat:   "bg-teal-50 text-ms-teal border border-teal-200",
      voice:  "bg-purple-50 text-ms-purple border border-purple-200",
      sms:    "bg-gray-100 text-gray-600 border border-gray-200",
    },
  };

  // Auto-detect style based on content if type maps it
  let cls = "bg-gray-100 text-gray-700 border border-gray-200";
  if (type === "priority" && styles.priority[children]) cls = styles.priority[children];
  else if (type === "status" && styles.status[children]) cls = styles.status[children];
  else if (type === "channel" && styles.channel[children]) cls = styles.channel[children];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${cls}`}>
      {children}
    </span>
  );
}
