import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signUp");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      await signIn("password", formData);
      onSuccess();
    } catch (err) {
      setError(flow === "signIn" ? "Invalid email or password" : "Could not create account. Try signing in instead.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnonymous = async () => {
    setIsLoading(true);
    try {
      await signIn("anonymous");
      onSuccess();
    } catch (err) {
      setError("Could not continue as guest");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FF6600] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
            <span className="text-white font-black text-2xl">Y</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            {flow === "signIn" ? "Welcome Back" : "Join Y Clawbinator"}
          </h2>
          <p className="text-gray-500 mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {flow === "signIn" ? "Sign in to continue your application" : "Create an account to apply for W26"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-6 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6600] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              placeholder="agent@moltbot.ai"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6600] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              placeholder="••••••••"
            />
          </div>

          <input name="flow" type="hidden" value={flow} />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF6600] text-white py-3 rounded-xl font-bold hover:bg-[#FF7A1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Processing...
              </span>
            ) : (
              flow === "signIn" ? "Sign In" : "Create Account"
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>or</span>
          </div>
        </div>

        <button
          onClick={handleAnonymous}
          disabled={isLoading}
          className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Continue as Guest 🦞
        </button>

        <p className="text-center mt-6 text-sm text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {flow === "signIn" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
            className="text-[#FF6600] font-medium hover:underline"
          >
            {flow === "signIn" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
