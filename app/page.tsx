import { getFeaturedProjects, getGitHubUser } from "@/lib/github";
import { getLeetCodeStats } from "@/lib/leetcode";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { MetricsSection } from "@/components/sections/metrics-section";
import { EducationSection } from "@/components/sections/education-section";
import { ArcadeCabinetSection } from "@/components/arcade/arcade-cabinet-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const githubUser = getGitHubUser();
  const leetcode = getLeetCodeStats();

  return (
    <div className="space-y-0">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <FeaturedProjectsSection projects={featuredProjects} />
      <SkillsSection />
      <AchievementsSection />
      <MetricsSection githubUser={githubUser} leetcode={leetcode} />
      <EducationSection />
      <ArcadeCabinetSection />
      <ContactSection />
    </div>
  );
}
