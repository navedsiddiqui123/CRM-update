import { useState } from "react";
import { Eye, ThumbsUp, Calendar, CheckCircle } from "lucide-react";

export default function KnowledgePreview({ article }) {
  const [used, setUsed] = useState(false);

  return (
    <div className="border border-ms-teal/30 rounded-lg bg-teal-50/40 p-4 mb-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="font-semibold text-gray-800 text-sm leading-snug">{article.title}</p>
          <span className="text-xs text-ms-muted font-mono mt-0.5 inline-block">{article.id}</span>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-ms-green border border-green-200 shrink-0">
          {article.relevance}% relevant
        </span>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 text-xs text-ms-muted mb-3">
        <span className="flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" />
          {article.views.toLocaleString()} views
        </span>
        <span className="flex items-center gap-1">
          <ThumbsUp className="w-3.5 h-3.5" />
          {article.helpfulRate} helpful
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          Updated {article.lastUpdated}
        </span>
      </div>

      {/* Excerpt */}
      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-3">
        {article.excerpt}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {used ? (
          <span className="inline-flex items-center gap-1.5 text-ms-teal text-xs font-semibold">
            <CheckCircle className="w-4 h-4" />
            Added to response
          </span>
        ) : (
          <button
            onClick={() => setUsed(true)}
            className="px-3 py-1.5 bg-ms-teal text-white text-xs font-semibold rounded-lg hover:bg-ms-teal/90 transition-colors"
          >
            Use this article
          </button>
        )}
        <button className="text-xs text-ms-blue hover:underline font-medium">
          View full article
        </button>
      </div>

      {/* Next best */}
      <p className="text-xs text-ms-muted mt-2 pt-2 border-t border-ms-border">
        Next best: KB-1887 — 81% relevance
      </p>
    </div>
  );
}
