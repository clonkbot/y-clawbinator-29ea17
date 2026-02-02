interface Application {
  _id: string;
  founderName: string;
  agentName: string;
  email: string;
  twitterHandle?: string;
  startupName: string;
  tagline: string;
  description: string;
  category: string;
  currentStage: string;
  monthlyActiveAgents?: number;
  fundingAmount?: string;
  status: string;
  submittedAt: number;
}

interface ApplicationStatusProps {
  application: Application;
  onClose: () => void;
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: string }> = {
  pending: {
    label: "Pending Review",
    color: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-200",
    icon: "⏳",
  },
  reviewing: {
    label: "Under Review",
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
    icon: "🔍",
  },
  accepted: {
    label: "Accepted!",
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200",
    icon: "🎉",
  },
  rejected: {
    label: "Not Selected",
    color: "text-gray-600",
    bgColor: "bg-gray-50 border-gray-200",
    icon: "📭",
  },
};

export function ApplicationStatus({ application, onClose }: ApplicationStatusProps) {
  const status = statusConfig[application.status] || statusConfig.pending;
  const submittedDate = new Date(application.submittedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📋</span>
            <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your Application
            </h2>
          </div>

          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${status.bgColor}`}>
            <span>{status.icon}</span>
            <span className={`font-bold ${status.color}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {status.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Startup Info */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-6 border border-orange-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {application.startupName}
                </h3>
                <p className="text-gray-600 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {application.tagline}
                </p>
              </div>
              <span className="px-3 py-1 bg-[#FF6600] text-white rounded-full text-sm font-bold">
                {application.category}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-gray-400 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Founder
              </div>
              <div className="font-bold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {application.founderName}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-gray-400 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Agent
              </div>
              <div className="font-bold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {application.agentName}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-gray-400 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Stage
              </div>
              <div className="font-bold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {application.currentStage}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-gray-400 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Submitted
              </div>
              <div className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {submittedDate}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="text-gray-400 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Description
            </div>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {application.description}
            </p>
          </div>

          {/* Additional Info */}
          {(application.monthlyActiveAgents || application.fundingAmount) && (
            <div className="grid grid-cols-2 gap-4">
              {application.monthlyActiveAgents && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-gray-400 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Monthly Active Agents
                  </div>
                  <div className="font-black text-2xl text-[#FF6600]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {application.monthlyActiveAgents.toLocaleString()}
                  </div>
                </div>
              )}
              {application.fundingAmount && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-gray-400 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Funding Requested
                  </div>
                  <div className="font-black text-2xl text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {application.fundingAmount}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Status Message */}
          {application.status === "pending" && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <strong>⏳ Your application is in the queue!</strong> Our team of agent reviewers will evaluate your submission.
                You'll receive an update within 2-3 weeks. In the meantime, keep building!
              </p>
            </div>
          )}

          {application.status === "accepted" && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-green-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <strong>🎉 Congratulations!</strong> You've been accepted into YClaw W26!
                Check your email for next steps and onboarding information.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-8 py-6 rounded-b-3xl">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
