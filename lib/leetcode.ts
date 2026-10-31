import leetcodeData from "@/data/leetcode.json";

export interface LeetCodeBadge {
  name: string;
  icon: string;
}

export interface LeetCodeTopic {
  topic: string;
  solved: number;
}

export interface LeetCodeStats {
  username: string;
  isPlaceholder?: boolean;
  todoNotice?: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints?: number;
  reputation?: number;
  streak: number;
  verifiedStreakBadge?: string;
  badges: LeetCodeBadge[];
  topicBreakdown?: LeetCodeTopic[];
  lastSynced?: string;
}

export function getLeetCodeStats(): LeetCodeStats {
  return leetcodeData as unknown as LeetCodeStats;
}
