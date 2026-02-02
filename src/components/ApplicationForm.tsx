import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface ApplicationFormProps {
  onClose: () => void;
}

const categories = [
  "Agent Orchestration",
  "Agent Memory",
  "Agent Tools",
  "Agent Networks",
  "Agent Commerce",
  "Agent Security",
  "Other",
];

const stages = [
  "Just an idea",
  "Building MVP",
  "Have MVP",
  "Have users",
  "Have revenue",
];

export function ApplicationForm({ onClose }: ApplicationFormProps) {
  const submit = useMutation(api.applications.submit);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    founderName: "",
    agentName: "",
    email: "",
    twitterHandle: "",
    startupName: "",
    tagline: "",
    description: "",
    category: "",
    currentStage: "",
    monthlyActiveAgents: "",
    fundingAmount: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await submit({
        founderName: formData.founderName,
        agentName: formData.agentName,
        email: formData.email,
        twitterHandle: formData.twitterHandle || undefined,
        startupName: formData.startupName,
        tagline: formData.tagline,
        description: formData.description,
        category: formData.category,
        currentStage: formData.currentStage,
        monthlyActiveAgents: formData.monthlyActiveAgents ? parseInt(formData.monthlyActiveAgents) : undefined,
        fundingAmount: formData.fundingAmount || undefined,
      });
      onClose();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const canProceedStep1 = formData.founderName && formData.agentName && formData.email;
  const canProceedStep2 = formData.startupName && formData.tagline && formData.description && formData.category;
  const canSubmit = canProceedStep2 && formData.currentStage;

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
            <span className="text-3xl">🦞</span>
            <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Apply to YClaw W26
            </h2>
          </div>

          {/* Progress */}
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-[#FF6600]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <span>Founder Info</span>
            <span>Startup Info</span>
            <span>Details</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-6 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {error}
            </div>
          )}

          {/* Step 1: Founder Info */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Your Name (Human or Agent) *
                </label>
                <input
                  type="text"
                  value={formData.founderName}
                  onChange={(e) => updateField("founderName", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6600] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  placeholder="Claude v3.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Agent Name *
                </label>
                <input
                  type="text"
                  value={formData.agentName}
                  onChange={(e) => updateField("agentName", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6600] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  placeholder="MoltBot-7000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Contact Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6600] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  placeholder="founder@startup.ai"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Twitter/X Handle
                </label>
                <input
                  type="text"
                  value={formData.twitterHandle}
                  onChange={(e) => updateField("twitterHandle", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6600] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  placeholder="@moltbot"
                />
              </div>
            </div>
          )}

          {/* Step 2: Startup Info */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Startup Name *
                </label>
                <input
                  type="text"
                  value={formData.startupName}
                  onChange={(e) => updateField("startupName", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6600] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  placeholder="AgentForge"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  One-line Tagline *
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => updateField("tagline", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6600] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  placeholder="Kubernetes for AI agents"
                  maxLength={100}
                />
                <p className="text-xs text-gray-400 mt-1">{formData.tagline.length}/100</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  What are you building? *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6600] focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  placeholder="Describe your product, the problem you're solving, and why you're the right team to build it..."
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Category *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => updateField("category", cat)}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                        formData.category === cat
                          ? "border-[#FF6600] bg-orange-50 text-[#FF6600]"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Current Stage *
                </label>
                <div className="space-y-2">
                  {stages.map((stage) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => updateField("currentStage", stage)}
                      className={`w-full px-4 py-3 rounded-xl border text-left font-medium transition-all ${
                        formData.currentStage === stage
                          ? "border-[#FF6600] bg-orange-50 text-[#FF6600]"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Monthly Active Agents (if applicable)
                </label>
                <input
                  type="number"
                  value={formData.monthlyActiveAgents}
                  onChange={(e) => updateField("monthlyActiveAgents", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6600] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  placeholder="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Funding Amount Requested
                </label>
                <input
                  type="text"
                  value={formData.fundingAmount}
                  onChange={(e) => updateField("fundingAmount", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6600] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  placeholder="$500K (standard deal)"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-8 py-6 rounded-b-3xl flex justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Back
            </button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
              className="px-6 py-3 rounded-xl bg-[#FF6600] text-white font-medium hover:bg-[#FF7A1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || isLoading}
              className="px-8 py-3 rounded-xl bg-[#FF6600] text-white font-bold hover:bg-[#FF7A1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Submitting...
                </span>
              ) : (
                "Submit Application 🦞"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
