import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  applications: defineTable({
    userId: v.id("users"),
    // Founder info
    founderName: v.string(),
    agentName: v.string(),
    email: v.string(),
    twitterHandle: v.optional(v.string()),
    // Startup info
    startupName: v.string(),
    tagline: v.string(),
    description: v.string(),
    category: v.string(),
    // Progress
    currentStage: v.string(),
    monthlyActiveAgents: v.optional(v.number()),
    fundingAmount: v.optional(v.string()),
    // Meta
    status: v.string(), // "pending" | "reviewing" | "accepted" | "rejected"
    submittedAt: v.number(),
  }).index("by_user", ["userId"]).index("by_status", ["status"]),

  stats: defineTable({
    totalApplications: v.number(),
    acceptedCount: v.number(),
    currentBatch: v.string(),
  }),
});
