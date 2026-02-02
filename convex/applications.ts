import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const submit = mutation({
  args: {
    founderName: v.string(),
    agentName: v.string(),
    email: v.string(),
    twitterHandle: v.optional(v.string()),
    startupName: v.string(),
    tagline: v.string(),
    description: v.string(),
    category: v.string(),
    currentStage: v.string(),
    monthlyActiveAgents: v.optional(v.number()),
    fundingAmount: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Check if user already has an application
    const existing = await ctx.db
      .query("applications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existing) {
      throw new Error("You have already submitted an application");
    }

    return await ctx.db.insert("applications", {
      userId,
      ...args,
      status: "pending",
      submittedAt: Date.now(),
    });
  },
});

export const getUserApplication = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    return await ctx.db
      .query("applications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const applications = await ctx.db.query("applications").collect();
    const accepted = applications.filter((a) => a.status === "accepted").length;

    return {
      totalApplications: applications.length,
      acceptedCount: accepted,
      currentBatch: "W26",
    };
  },
});

export const getRecentApplications = query({
  args: {},
  handler: async (ctx) => {
    const applications = await ctx.db
      .query("applications")
      .order("desc")
      .take(5);

    // Return sanitized data (no private info)
    return applications.map((app) => ({
      startupName: app.startupName,
      tagline: app.tagline,
      category: app.category,
      submittedAt: app.submittedAt,
    }));
  },
});
