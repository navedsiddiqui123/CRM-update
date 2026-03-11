// ── Case Record ──────────────────────────────────────────────────────
export const CASE = {
  id:              "CAS-004821",
  title:           "Unable to process refund — order #ORD-88271",
  customer:        "Maya Patel",
  customerEmail:   "maya.patel@contoso.com",
  accountName:     "Contoso Retail Ltd.",
  channel:         "email",
  priority:        "P2",
  status:          "In Progress",
  queue:           "Billing & Refunds",
  assignedRep:     "Jordan Kim",
  createdAt:       "Today, 09:03 AM",
  slaDeadline:     "Today, 05:03 PM",
  slaStatus:       "on-track",
  sentiment:       "frustrated",
  csatPredicted:   3.1,
  topic:           "Refund Processing",
  caseHistory:     2,
  summary: "Customer reporting that refund for cancelled order #ORD-88271 ($249.99) has not been processed after 8 days. Original refund SLA is 5 business days. Customer has sent 2 follow-up emails.",
};

// ── Agent Actions on this Case ────────────────────────────────────────
export const AGENT_ACTIONS = [
  {
    id:           "ca-001",
    timestamp:    "Today, 09:03 AM",
    relativeTime: "6 hours ago",
    type:         "CASE_CREATED",
    label:        "Case Created & Classified",
    agentVersion: "Case Management Agent v2.3",
    status:       "completed",
    overridden:   false,
    summary:      "Case auto-created from inbound email. Classified as Billing & Refunds, Priority 2.",
    rationale: {
      headline:   "Email classified as billing dispute — P2 assigned based on amount, sentiment, and SLA history",
      confidence: 92,
      signals: [
        { label:"Intent Detection",     value:"'refund', 'order cancelled', 'not processed' — billing dispute pattern (98% match)", weight:"high",   icon:"tag",          delta:null },
        { label:"Amount Threshold",     value:"$249.99 exceeds P3 ceiling ($100) — P2 auto-assigned",                               weight:"high",   icon:"dollar-sign",  delta:null },
        { label:"Customer Sentiment",   value:"Frustration signals detected: 'still waiting', 'unacceptable' (score: 0.71/1.0)",    weight:"high",   icon:"frown",        delta:null },
        { label:"SLA Miss History",     value:"This account had 1 prior SLA breach in last 90 days — escalation sensitivity: HIGH", weight:"medium", icon:"clock",        delta:null },
        { label:"Repeat Contact",       value:"2nd email on same issue — first received 3 days ago, no resolution",                 weight:"medium", icon:"repeat",       delta:null },
      ],
      dataSources:  ["Email NLP Model", "Order Management System", "Customer Sentiment API", "Case History", "SLA Config"],
      modelNote:    "Classification uses fine-tuned GPT-4o model on 2.1M D365 Customer Service cases (FY2024). Priority logic is rule-based on top of classification.",
      csatContext:  "Cases misclassified from Billing to General Support average 0.8pts lower CSAT. Correct classification here protects predicted CSAT of 3.1.",
    },
  },
  {
    id:           "ca-002",
    timestamp:    "Today, 09:03 AM",
    relativeTime: "6 hours ago",
    type:         "CASE_ROUTED",
    label:        "Case Routed",
    agentVersion: "Case Management Agent v2.3",
    status:       "completed",
    overridden:   false,
    summary:      "Routed to Billing & Refunds queue, assigned to Jordan Kim (availability: 94%, skill match: 91%).",
    rationale: {
      headline:   "Jordan Kim selected by intent-based routing — top skill match in available Billing & Refunds reps",
      confidence: 89,
      signals: [
        { label:"Intent-Based Queue",   value:"'Refund Processing' intent matches Billing & Refunds queue (confidence: 96%)",       weight:"high",   icon:"git-branch",   delta:null },
        { label:"Rep Skill Match",      value:"Jordan Kim: Billing & Refunds proficiency 4.6/5.0 — highest available",             weight:"high",   icon:"user",         delta:null },
        { label:"Rep Availability",     value:"Jordan Kim: 94% available, current load 2 active cases (below 4-case threshold)",    weight:"high",   icon:"calendar",     delta:null },
        { label:"P2 SLA Alignment",     value:"Jordan's avg P2 resolution time: 3.2hrs vs queue avg 4.8hrs",                        weight:"medium", icon:"trending-up",  delta:null },
        { label:"Customer History",     value:"Jordan handled Maya's previous case (Feb 2026) — continuity score applied",          weight:"low",    icon:"history",      delta:null },
      ],
      dataSources:  ["Intent Routing Engine", "Skills Registry", "Rep Availability Calendar", "Case History", "Performance Analytics"],
      modelNote:    "Routing uses unified routing engine with intent-based rules + ML scoring. Customer continuity is a soft preference, not a hard rule.",
      csatContext:  "Skill-matched routing improves FCR by 23% for Billing cases. Jordan's Billing CSAT avg: 4.2/5.0 (team avg: 3.8/5.0).",
    },
  },
  {
    id:           "ca-003",
    timestamp:    "Today, 09:04 AM",
    relativeTime: "6 hours ago",
    type:         "KNOWLEDGE_SUGGESTED",
    label:        "Knowledge Article Suggested",
    agentVersion: "Case Management Agent v2.3",
    status:       "completed",
    overridden:   false,
    summary:      "Article KB-2241 'Refund processing delays — manual trigger steps' surfaced as top recommendation (94% relevance).",
    knowledgeArticle: {
      id:        "KB-2241",
      title:     "Refund processing delays — manual trigger steps",
      relevance: 94,
      views:     1842,
      helpfulRate: "87%",
      lastUpdated: "Feb 14, 2026",
      excerpt:   "When a refund is not automatically processed within 5 business days, service reps can manually trigger the refund pipeline via Order Management > Refund Override. Steps: 1. Navigate to order record. 2. Select 'Manual Refund Trigger'. 3. Enter authorisation code...",
    },
    rationale: {
      headline:   "KB-2241 retrieved as highest-relevance article for refund delay pattern",
      confidence: 94,
      signals: [
        { label:"Semantic Match",       value:"Case title + summary match KB-2241 at 94% semantic similarity",                      weight:"high",   icon:"search",       delta:null },
        { label:"Historical Usage",     value:"KB-2241 used in 312 similar cases — 87% marked helpful by reps",                     weight:"high",   icon:"thumbs-up",    delta:null },
        { label:"Resolution Rate",      value:"Cases using KB-2241 resolve 41% faster than queue avg",                              weight:"high",   icon:"zap",          delta:null },
        { label:"Article Freshness",    value:"Updated Feb 14, 2026 — reflects current refund pipeline process",                    weight:"medium", icon:"calendar",     delta:null },
      ],
      dataSources:  ["Knowledge Management Agent", "Case Resolution History", "Article Feedback Data", "Semantic Search Index"],
      modelNote:    "Knowledge retrieval uses Azure AI Search with semantic ranking. Article ranked from pool of 4,200 KB articles. Next-best article: KB-1887 (81% relevance).",
      csatContext:  "Reps who use the suggested article on first response achieve 4.3/5.0 avg CSAT vs 3.6/5.0 for those who search manually.",
    },
  },
  {
    id:           "ca-004",
    timestamp:    "Today, 09:05 AM",
    relativeTime: "6 hours ago",
    type:         "RESPONSE_DRAFTED",
    label:        "Response Drafted",
    agentVersion: "Case Management Agent v2.3",
    status:       "completed",
    overridden:   true,
    overriddenBy: "Jordan Kim",
    overriddenReason: "Draft tone was too formal. Customer is frustrated — rewrote with more empathy and added specific timeline.",
    summary:      "First response email drafted by agent. Rep chose to edit before sending — tone adjustment and timeline added.",
    emailDraft: {
      subject:   "RE: Unable to process refund — order #ORD-88271",
      to:        "maya.patel@contoso.com",
      body:      "Dear Ms. Patel,\n\nThank you for contacting us regarding order #ORD-88271. I understand your refund has not been processed within our standard 5 business day window.\n\nI have reviewed your case and can confirm the refund of $249.99 is being processed. You should see the credit within 2-3 business days.\n\nWe apologise for the inconvenience.\n\nKind regards,\nCustomer Service Team",
      tokens:    ["Customer name", "Order number", "Refund amount", "Timeline estimate"],
    },
    rationale: {
      headline:   "Response drafted using refund delay template with customer-specific personalisation",
      confidence: 78,
      signals: [
        { label:"Template Match",       value:"'Refund Delay - Acknowledgement' template (used in 1,240 similar cases)",             weight:"high",   icon:"file-text",    delta:null },
        { label:"Tone Selection",       value:"Professional tone selected (frustrated sentiment — escalation-avoidance template)",   weight:"medium", icon:"message-circle",delta:null },
        { label:"Personalisation",      value:"Order number, amount, customer name injected from case record",                      weight:"medium", icon:"edit",         delta:null },
        { label:"Compliance Check",     value:"No PII policy violations detected in draft",                                          weight:"low",    icon:"shield",       delta:null },
      ],
      dataSources:  ["Response Template Library", "Case Record", "PII Compliance API", "Customer Sentiment API"],
      modelNote:    "Draft uses GPT-4o with template grounding. Confidence lower (78%) — empathy calibration for frustrated customers is an active improvement area.",
      csatContext:  "Rep-edited responses outperform agent-only drafts by 0.3 CSAT pts for frustrated-sentiment cases. Override here was the right call.",
    },
  },
];

// ── Team performance data (supervisor view) ──────────────────────────
export const TEAM_DATA = [
  { rep:"Jordan Kim",     cases:28, agentActions:112, overrides:4,  overrideRate:"3.6%",  csat:4.2, trustScore:96, fcr:"74%"  },
  { rep:"Priya Osei",     cases:31, agentActions:124, overrides:12, overrideRate:"9.7%",  csat:3.9, trustScore:81, fcr:"68%"  },
  { rep:"Carlos Wu",      cases:24, agentActions:96,  overrides:3,  overrideRate:"3.1%",  csat:4.4, trustScore:97, fcr:"79%"  },
  { rep:"Anita Sharma",   cases:19, agentActions:76,  overrides:22, overrideRate:"28.9%", csat:3.4, trustScore:52, fcr:"61%"  },
  { rep:"Liam Okafor",    cases:33, agentActions:132, overrides:6,  overrideRate:"4.5%",  csat:4.1, trustScore:93, fcr:"72%"  },
];

// ── CSAT trend (last 8 weeks) for recharts ────────────────────────────
export const CSAT_TREND = [
  { week:"Jan 13", withExplain: null, withoutExplain: 3.6 },
  { week:"Jan 20", withExplain: null, withoutExplain: 3.7 },
  { week:"Jan 27", withExplain: null, withoutExplain: 3.5 },
  { week:"Feb 3",  withExplain: null, withoutExplain: 3.8 },
  { week:"Feb 10", withExplain: 3.9,  withoutExplain: 3.7 },
  { week:"Feb 17", withExplain: 4.1,  withoutExplain: 3.6 },
  { week:"Feb 24", withExplain: 4.2,  withoutExplain: 3.7 },
  { week:"Mar 3",  withExplain: 4.3,  withoutExplain: 3.8 },
];

// ── AI Optimization Hub data (agent-level KPIs) ──────────────────────
export const AGENT_KPI = {
  caseManagementAgent: {
    name:           "Case Management Agent v2.3",
    casesHandled:   1842,
    autoResolved:   312,
    autoResolutionRate: "16.9%",
    avgConfidence:  87,
    overrideRate:   "8.2%",
    csatImpact:     "+0.4 pts vs baseline",
    topAction:      "CASE_CREATED",
    intentAccuracy: "94.1%",
  },
  knowledgeAgent: {
    name:           "Knowledge Management Agent v1.8",
    articlesCreated: 48,
    articlesSuggested: 1240,
    helpfulRate:    "86%",
    avgRelevance:   "91%",
    csatImpact:     "+0.3 pts when used",
  },
};

// ── Action type metadata ──────────────────────────────────────────────
export const ACTION_TYPE_META = {
  CASE_CREATED:        { color:"#0078D4", bg:"#EBF3FB", label:"Case Created"          },
  CASE_ROUTED:         { color:"#00B294", bg:"#E3F5F1", label:"Case Routed"            },
  KNOWLEDGE_SUGGESTED: { color:"#6B52A0", bg:"#F0EBF8", label:"Knowledge Suggested"   },
  RESPONSE_DRAFTED:    { color:"#C79B00", bg:"#FFF8E1", label:"Response Drafted"       },
  CASE_RESOLVED:       { color:"#107C10", bg:"#E8F5E8", label:"Auto-Resolved"          },
  OVERRIDDEN:          { color:"#A4262C", bg:"#FDE8E9", label:"Overridden by Rep"      },
};

// ── Action breakdown bar chart data (AI Optimization Hub) ────────────
export const ACTION_BREAKDOWN = [
  { week: "Feb 10", CASE_CREATED: 142, CASE_ROUTED: 138, KNOWLEDGE_SUGGESTED: 112, RESPONSE_DRAFTED: 98  },
  { week: "Feb 17", CASE_CREATED: 156, CASE_ROUTED: 151, KNOWLEDGE_SUGGESTED: 128, RESPONSE_DRAFTED: 110 },
  { week: "Feb 24", CASE_CREATED: 148, CASE_ROUTED: 144, KNOWLEDGE_SUGGESTED: 121, RESPONSE_DRAFTED: 103 },
  { week: "Mar 3",  CASE_CREATED: 162, CASE_ROUTED: 158, KNOWLEDGE_SUGGESTED: 134, RESPONSE_DRAFTED: 118 },
];

// ── Override reasons (AI Optimization Hub) ───────────────────────────
export const OVERRIDE_REASONS = [
  { reason: "Tone adjustment needed",          overrides: 34 },
  { reason: "Routing disagreement",            overrides: 21 },
  { reason: "Wrong knowledge article",         overrides: 18 },
  { reason: "Priority too high/low",           overrides: 12 },
  { reason: "Customer continuity preferred",   overrides: 9  },
];
