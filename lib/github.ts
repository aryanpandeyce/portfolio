import githubData from "@/data/github.json";
import overridesData from "@/data/projects.override.json";

export interface GitHubRepo {
  id: number;
  name: string;
  slug: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  topics: string[];
  featured: boolean;
  readme: string;
  featuredTag?: string;
  architecture?: string;
  customDescription?: string;
  liveDemo?: string;
}

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  total_forks: number;
  contributions: number;
}

export function getGitHubUser(): GitHubUser {
  return githubData.user;
}

export function getAllProjects(): GitHubRepo[] {
  const overrides = overridesData.overrides as Record<string, Partial<GitHubRepo>>;
  const hiddenSlugs = new Set<string>((overridesData.hiddenSlugs as string[]) || []);

  const merged = (githubData.repositories as GitHubRepo[])
    .filter((repo) => !hiddenSlugs.has(repo.slug))
    .map((repo) => {
      const override = overrides[repo.slug] || {};
      return {
        ...repo,
        ...override,
        description: override.customDescription || repo.description,
        homepage: override.liveDemo || repo.homepage,
      } as GitHubRepo;
    });

  // Sort by pinned order if specified, then by stargazers_count
  const pinnedSlugs: string[] = (overridesData.pinnedSlugs as string[]) || [];
  const pinnedMap = new Map<string, number>(pinnedSlugs.map((slug, idx) => [slug, idx]));

  return merged.sort((a, b) => {
    const aPin = pinnedMap.has(a.slug) ? pinnedMap.get(a.slug)! : 999;
    const bPin = pinnedMap.has(b.slug) ? pinnedMap.get(b.slug)! : 999;
    if (aPin !== bPin) return aPin - bPin;
    return b.stargazers_count - a.stargazers_count;
  });
}

export function getFeaturedProjects(): GitHubRepo[] {
  const all = getAllProjects();
  const pinnedSlugs = new Set<string>((overridesData.pinnedSlugs as string[]) || []);
  const featured = all.filter((repo) => repo.featured || pinnedSlugs.has(repo.slug));
  return featured.slice(0, 6);
}

export function getProjectBySlug(slug: string): GitHubRepo | undefined {
  const all = getAllProjects();
  return all.find((r) => r.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}
