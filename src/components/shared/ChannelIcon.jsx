import { Mail, MessageSquare, Phone, MessageCircle } from "lucide-react";

const CHANNEL_CONFIG = {
  email: { Icon: Mail,          label: "Email", color: "text-ms-blue",   bg: "bg-ms-lblue"    },
  chat:  { Icon: MessageSquare, label: "Chat",  color: "text-ms-teal",   bg: "bg-teal-50"     },
  voice: { Icon: Phone,         label: "Voice", color: "text-ms-purple", bg: "bg-purple-50"   },
  sms:   { Icon: MessageCircle, label: "SMS",   color: "text-gray-600",  bg: "bg-gray-100"    },
};

export default function ChannelIcon({ channel, showLabel = true }) {
  const cfg = CHANNEL_CONFIG[channel] || CHANNEL_CONFIG.email;
  const { Icon, label, color, bg } = cfg;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-current/20 ${bg} ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      {showLabel && <span>{label}</span>}
    </span>
  );
}
